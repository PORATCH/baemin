import { useCallback, useEffect, useReducer, useRef } from 'react'
import { initialAgents, initialProjects, initialSkills } from '../data/mock'
import type { Agent, AgentStatus, LogEntry, Message, Preferences, Project } from '../types'

interface State {
  agents: Agent[]; projects: Project[]; projectId: string; agentId: string
  logs: LogEntry[]; skills: typeof initialSkills; preferences: Preferences
  pendingProjectIds: string[]
}
type Action =
  | { type: 'select-project'; id: string }
  | { type: 'select-agent'; id: string }
  | { type: 'agent-status'; id: string; status: AgentStatus }
  | { type: 'task-toggle'; projectId: string; id: string }
  | { type: 'message'; projectId: string; message: Message }
  | { type: 'pending'; projectId: string; pending: boolean }
  | { type: 'reset-chat'; projectId: string }
  | { type: 'add-project'; project: Project }
  | { type: 'log'; entry: LogEntry }
  | { type: 'skill'; id: string }
  | { type: 'preference'; key: keyof Preferences; value: boolean }

export function workspaceReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'select-project': return { ...state, projectId: action.id }
    case 'select-agent': return { ...state, agentId: action.id }
    case 'agent-status': return { ...state, agents: state.agents.map(a => a.id === action.id ? { ...a, status: action.status } : a) }
    case 'task-toggle': return { ...state, projects: state.projects.map(p => p.id === action.projectId ? { ...p, tasks: p.tasks.map(t => t.id === action.id ? { ...t, done: !t.done } : t) } : p) }
    case 'message': return { ...state, projects: state.projects.map(p => p.id === action.projectId ? { ...p, messages: [...p.messages, action.message] } : p) }
    case 'reset-chat': return { ...state, projects: state.projects.map(p => p.id === action.projectId ? { ...p, messages: [] } : p) }
    case 'pending': return { ...state, pendingProjectIds: action.pending ? [...state.pendingProjectIds, action.projectId] : state.pendingProjectIds.filter(id => id !== action.projectId) }
    case 'add-project': return { ...state, projects: [...state.projects, action.project], projectId: action.project.id }
    case 'log': return { ...state, logs: [...state.logs.slice(-199), action.entry] }
    case 'skill': return { ...state, skills: state.skills.map(s => s.id === action.id ? { ...s, enabled: !s.enabled } : s) }
    case 'preference': return { ...state, preferences: { ...state.preferences, [action.key]: action.value } }
  }
}
const time = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
const id = () => crypto.randomUUID()
function readPreferences(): Preferences {
  try { return { compact: false, timestamps: true, ...JSON.parse(localStorage.getItem('relay-preferences') || '{}') } }
  catch { return { compact: false, timestamps: true } }
}
export function useWorkspace() {
  const [state, dispatch] = useReducer(workspaceReducer, undefined, (): State => ({
    agents: initialAgents, projects: initialProjects, projectId: 'orbit', agentId: 'nova',
    logs: [{ id: 'ready', time: time(), level: 'success', text: 'Workspace initialized. Mock agents are ready.' }],
    skills: initialSkills, preferences: readPreferences(), pendingProjectIds: [],
  }))
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const inFlight = useRef(new Set<string>())
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  useEffect(() => { try { localStorage.setItem('relay-preferences', JSON.stringify(state.preferences)) } catch { /* Preferences still work without storage. */ } }, [state.preferences])
  const log = useCallback((text: string, level: LogEntry['level'] = 'info') => dispatch({ type: 'log', entry: { id: id(), time: time(), level, text } }), [])
  function sendMessage(content: string) {
    const projectId = state.projectId
    if (!content.trim() || inFlight.current.has(projectId)) return
    const agent = state.agents.find(a => a.id === state.agentId)!
    dispatch({ type: 'message', projectId, message: { id: id(), role: 'user', content: content.trim(), time: time() } })
    if (agent.status === 'paused') {
      dispatch({ type: 'message', projectId, message: { id: id(), role: 'agent', agentId: agent.id, content: `${agent.name} is paused. Resume this agent in the right panel to continue.`, time: time() } })
      log(`${agent.name} could not respond: agent paused.`, 'warning')
      return
    }
    inFlight.current.add(projectId)
    dispatch({ type: 'pending', projectId, pending: true })
    log(`${agent.name} received a message in ${state.projects.find(p => p.id === projectId)!.name}.`)
    timers.current.push(setTimeout(() => {
      const lower = content.toLowerCase()
      let response = `I’ve noted your request: “${content.trim().slice(0, 180)}”. I’d start by checking the current context, split the work into small tasks, and review each change. This is a simulated response; no files or services were changed.`
      if (/test|테스트/.test(lower)) response = 'Here’s a test plan: verify the main user flow, cover empty and error states, then check keyboard navigation. Start with project selection, sending a message, and changing an agent’s status. This is a mock plan; no tests were executed.'
      else if (/hello|안녕|hi\b/.test(lower)) response = `Hello! I’m ${agent.name}, your ${agent.role.toLowerCase()}. What would you like to work on? I can help explore an idea or plan the next steps in this mock workspace.`
      else if (/task|plan|계획|작업/.test(lower)) response = 'Let’s break it down: 1. Clarify the expected outcome. 2. Build the smallest useful version. 3. Review the result and iterate. You can track the existing checklist in the Tasks tab. This is a simulated plan.'
      dispatch({ type: 'message', projectId, message: { id: id(), role: 'agent', agentId: agent.id, content: response, time: time() } })
      dispatch({ type: 'pending', projectId, pending: false })
      inFlight.current.delete(projectId)
      log(`${agent.name} completed a simulated response.`, 'success')
    }, 1100))
  }
  function createProject(name: string) {
    const project: Project = { id: id(), name: name.trim(), description: 'A new workspace for your next idea.', color: 'purple', branch: 'main', tasks: [], files: [{ path: 'README.md', language: 'Markdown', content: `# ${name.trim()}\n\nYour new mock workspace.\n` }], messages: [] }
    dispatch({ type: 'add-project', project }); log(`Created mock project ${project.name}.`, 'success')
  }
  function setAgentStatus(agentId: string, status: AgentStatus) {
    dispatch({ type: 'agent-status', id: agentId, status }); log(`${state.agents.find(a => a.id === agentId)!.name} is now ${status}.`, status === 'paused' ? 'warning' : 'info')
  }
  return { state, dispatch, log, sendMessage, createProject, setAgentStatus,
    project: state.projects.find(p => p.id === state.projectId)!, agent: state.agents.find(a => a.id === state.agentId)! }
}
export type WorkspaceStore = ReturnType<typeof useWorkspace>
