import type { Agent, Project } from '../types'

export const initialAgents: Agent[] = [
  { id: 'nova', name: 'Nova', role: 'Lead orchestrator', initials: 'N', color: 'mint', status: 'working', progress: 68, task: 'Coordinating the workspace' },
  { id: 'pixel', name: 'Pixel', role: 'UI engineer', initials: 'P', color: 'purple', status: 'working', progress: 42, task: 'Building interface components' },
  { id: 'sage', name: 'Sage', role: 'Code reviewer', initials: 'S', color: 'blue', status: 'idle', progress: 0, task: 'Ready for the next review' },
]
const files = [
  { path: 'src/App.tsx', language: 'TypeScript', content: "import { Workspace } from './components/Workspace'\n\nexport default function App() {\n  return (\n    <main className=\"workspace\">\n      <Workspace project=\"orbit\" />\n    </main>\n  )\n}\n" },
  { path: 'src/components/Workspace.tsx', language: 'TypeScript', content: "interface WorkspaceProps {\n  project: string\n}\n\nexport function Workspace({ project }: WorkspaceProps) {\n  return <section aria-label={project}>\n    <h1>Welcome to your workspace</h1>\n  </section>\n}\n" },
  { path: 'src/styles/tokens.css', language: 'CSS', content: ':root {\n  --surface: #141618;\n  --border: #2a2d30;\n  --accent: #a9e7c3;\n  --radius: 8px;\n}\n' },
  { path: 'package.json', language: 'JSON', content: '{\n  "name": "orbit-web",\n  "private": true,\n  "scripts": {\n    "dev": "vite",\n    "build": "tsc -b && vite build"\n  }\n}\n' },
  { path: 'README.md', language: 'Markdown', content: '# Orbit Web\n\nAn interface built with care.\n\n## Development\n\nnpm install\nnpm run dev\n\n## Notes\n\nThese files are mock context for the UI prototype.\n' },
]
export const initialProjects: Project[] = [
  { id: 'orbit', name: 'Orbit Web', description: 'A thoughtful dashboard for everyday work.', color: 'mint', branch: 'feat/dashboard', files, tasks: [
    { id: 't1', title: 'Explore the project structure', detail: 'Map components and identify reusable patterns', agentId: 'nova', done: true },
    { id: 't2', title: 'Define the design foundations', detail: 'Color tokens, typography, and spacing system', agentId: 'pixel', done: true },
    { id: 't3', title: 'Build the dashboard components', detail: 'Activity overview, navigation, and agent cards', agentId: 'pixel', done: false },
    { id: 't4', title: 'Review accessibility and interactions', detail: 'Keyboard navigation and component states', agentId: 'sage', done: false },
  ], messages: [
    { id: 'm1', role: 'user', content: 'Let’s build the new dashboard. Keep it clean, focused, and easy to navigate.', time: '10:42' },
    { id: 'm2', role: 'agent', agentId: 'nova', content: 'On it. I’ve explored the project and put together a plan. Pixel will handle the interface, and Sage will review the implementation.', time: '10:42', kind: 'plan' },
    { id: 'm3', role: 'agent', agentId: 'pixel', content: 'The design foundations are ready. I’m putting the dashboard components together now, starting with the activity overview and navigation.', time: '10:43', kind: 'result' },
  ] },
  { id: 'atlas', name: 'Atlas API', description: 'Service architecture and API exploration.', color: 'blue', branch: 'main', files: [{ path: 'README.md', language: 'Markdown', content: '# Atlas API\n\nMock service workspace.\nNo live API is connected.\n' }, { path: 'src/routes.ts', language: 'TypeScript', content: "export const routes = [\n  { method: 'GET', path: '/health' },\n  { method: 'GET', path: '/projects' },\n]\n" }], tasks: [{ id: 'a1', title: 'Outline the API routes', detail: 'Document the service contract', agentId: 'nova', done: false }], messages: [{ id: 'a-m1', role: 'agent', agentId: 'nova', content: 'Welcome to Atlas API. What would you like to explore? I can help plan routes, review a design, or break work into tasks.', time: '10:40' }] },
  { id: 'sandbox', name: 'Sandbox', description: 'A space for experiments and new ideas.', color: 'amber', branch: 'main', files: [{ path: 'notes.md', language: 'Markdown', content: '# Experiments\n\nA fresh space for your next idea.\n' }], tasks: [], messages: [{ id: 's-m1', role: 'agent', agentId: 'nova', content: 'A fresh workspace. Tell me what you have in mind and we’ll make a plan.', time: '10:39' }] },
]
export const initialSkills = [
  { id: 'planning', name: 'Task planning', description: 'Turn an idea into clear, actionable steps.', icon: 'plan', enabled: true, tag: 'Workflow' },
  { id: 'interface', name: 'Interface design', description: 'Create consistent, accessible UI patterns.', icon: 'design', enabled: true, tag: 'Design' },
  { id: 'review', name: 'Code review', description: 'Inspect changes and surface improvements.', icon: 'code', enabled: true, tag: 'Engineering' },
  { id: 'research', name: 'Project research', description: 'Explore context before starting a task.', icon: 'research', enabled: false, tag: 'Discovery' },
]
