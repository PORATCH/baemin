import { useEffect, useState } from 'react'
import { Activity, ArrowRight, Bell, Bot, CheckCheck, ChevronRight, Circle, Command, Folder, GitBranch, PanelBottom, PanelRight, Search, Terminal } from 'lucide-react'
import { Sidebar } from './components/Sidebar'
import { Workspace } from './components/Workspace'
import { AgentPanel } from './components/AgentPanel'
import { BottomPanel } from './components/BottomPanel'
import { ManagementView } from './components/ManagementView'
import { Dialog } from './components/Dialog'
import { IconButton } from './components/ui'
import { useWorkspace } from './state/useWorkspace'
import type { Page, WorkspaceTab } from './types'
import './App.css'

export default function App() {
  const store = useWorkspace()
  const [page, setPage] = useState<Page>('Dashboard')
  const [tab, setTab] = useState<WorkspaceTab>('Chat')
  const [collapsed, setCollapsed] = useState(false)
  const [rightOpen, setRightOpen] = useState(true)
  const [bottomOpen, setBottomOpen] = useState(true)
  const [dialog, setDialog] = useState<'project' | 'search' | 'help' | 'activity' | null>(null)
  const [projectName, setProjectName] = useState('')
  const [search, setSearch] = useState('')
  const [projectError, setProjectError] = useState('')
  useEffect(() => {
    function keydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setDialog(prev => prev === 'search' ? null : 'search') }
      if ((e.metaKey || e.ctrlKey) && e.key === '`') { e.preventDefault(); setBottomOpen(prev => !prev) }
    }
    window.addEventListener('keydown', keydown); return () => window.removeEventListener('keydown', keydown)
  }, [])
  function newProject() { setProjectName(''); setProjectError(''); setDialog('project') }
  function selectProject(id: string) { store.dispatch({ type: 'select-project', id }); setPage('Dashboard'); setDialog(null) }
  const results = [
    ...(['Dashboard', 'Projects', 'Agents', 'Skills', 'Settings'] as Page[]).map(name => ({ key: name, name, type: 'Page', action: () => setPage(name) })),
    ...store.state.projects.map(project => ({ key: project.id, name: project.name, type: 'Project', action: () => selectProject(project.id) })),
    ...store.state.agents.map(agent => ({ key: agent.id, name: agent.name, type: 'Agent', action: () => { store.dispatch({ type: 'select-agent', id: agent.id }); setPage('Dashboard'); setRightOpen(true) } })),
  ].filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
  return <div className={`app-shell ${store.state.preferences.compact ? 'compact' : ''}`}>
    <Sidebar store={store} page={page} onPage={setPage} collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} onNewProject={newProject} onHelp={() => setDialog('help')} />
    <div className="main-shell"><header className="topbar"><div className="breadcrumb"><span>Workspace</span><ChevronRight size={13} /><strong>{page === 'Dashboard' ? store.project.name : page}</strong><span className="breadcrumb-separator" />{page === 'Dashboard' && <select aria-label="Select project" value={store.project.id} onChange={e => selectProject(e.target.value)}>{store.state.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>}</div><button className="search-trigger" onClick={() => { setSearch(''); setDialog('search') }}><Search size={14} /><span>Quick search…</span><kbd>⌘ K</kbd></button><div className="topbar-actions"><span className="mock-badge"><Circle size={6} fill="currentColor" />Mock mode</span><IconButton label="Open activity" onClick={() => setDialog('activity')}><Bell size={16} /></IconButton><span className="toolbar-divider" /><IconButton label="Toggle terminal panel" aria-pressed={bottomOpen} onClick={() => setBottomOpen(!bottomOpen)}><PanelBottom size={17} /></IconButton><IconButton label="Toggle agent panel" aria-pressed={rightOpen} onClick={() => setRightOpen(!rightOpen)}><PanelRight size={17} /></IconButton></div></header>
      <div className="main-body"><main className="center-panel">{page === 'Dashboard' ? <Workspace store={store} tab={tab} onTab={setTab} /> : <ManagementView page={page} store={store} onProject={selectProject} onNewProject={newProject} />}{bottomOpen && <BottomPanel store={store} onClose={() => setBottomOpen(false)} />}</main>{rightOpen && <AgentPanel store={store} onClose={() => setRightOpen(false)} onManage={() => setPage('Agents')} />}</div>
      <footer className="statusbar"><span><span className="status-dot" />Workspace ready</span><span className="statusbar-branch"><GitBranch size={11} />{store.project.branch}</span><span className="statusbar-agent"><Bot size={12} />{store.state.agents.length} agents</span><div className="flex-1" /><span className="statusbar-runtime"><CheckCheck size={12} />Local simulation</span><button onClick={() => setBottomOpen(!bottomOpen)} aria-label="Toggle terminal from status bar"><Terminal size={12} />Terminal</button><button onClick={() => setDialog('help')} aria-label="Open keyboard shortcuts"><Command size={11} /></button></footer>
    </div>
    {dialog === 'project' && <Dialog title="A new place to build" onClose={() => setDialog(null)}><form className="dialog-form" onSubmit={e => { e.preventDefault(); const name = projectName.trim(); if (!name) return; if (store.state.projects.some(p => p.name.toLowerCase() === name.toLowerCase())) { setProjectError('A project with this name already exists.'); return } store.createProject(name); setPage('Dashboard'); setTab('Chat'); setDialog(null) }}><p>Create a mock project. Your new workspace will be available for this session.</p><label htmlFor="project-name">Project name</label><input id="project-name" placeholder="e.g. Lighthouse" value={projectName} maxLength={40} autoFocus required onChange={e => { setProjectName(e.target.value); setProjectError('') }} />{projectError && <span className="form-error" role="alert">{projectError}</span>}<div className="dialog-actions"><button type="button" className="secondary-button" onClick={() => setDialog(null)}>Cancel</button><button className="primary-button" type="submit" disabled={!projectName.trim()}>Create project <ArrowRight size={14} /></button></div></form></Dialog>}
    {dialog === 'search' && <Dialog title="Go somewhere" onClose={() => setDialog(null)}><label className="command-search"><Search size={17} /><input aria-label="Quick search" placeholder="Search pages, projects, and agents…" value={search} autoFocus onChange={e => setSearch(e.target.value)} /></label><div className="search-results">{results.map(result => <button key={result.key} onClick={() => { result.action(); setDialog(null) }}><span>{result.type === 'Agent' ? <Bot size={15} /> : result.type === 'Project' ? <Folder size={15} /> : <Command size={15} />}{result.name}</span><small>{result.type}<ChevronRight size={12} /></small></button>)}{!results.length && <p className="search-empty">No results for “{search}”</p>}</div></Dialog>}
    {dialog === 'help' && <Dialog title="Welcome to Relay" onClose={() => setDialog(null)}><div className="help-content"><span className="help-brand"><Command size={24} /></span><p>A focused workspace for exploring how agents and people can build together.</p><div className="shortcut-row"><span>Quick search</span><kbd>Ctrl / ⌘ + K</kbd></div><div className="shortcut-row"><span>Toggle terminal</span><kbd>Ctrl / ⌘ + `</kbd></div><div className="shortcut-row"><span>Send a message</span><kbd>Enter</kbd></div><div className="shortcut-row"><span>New line in chat</span><kbd>Shift + Enter</kbd></div><div className="info-banner"><Activity size={16} /><span>All agents, responses, files, and terminal output are simulated. No AI API or PC control is connected.</span></div></div></Dialog>}
    {dialog === 'activity' && <Dialog title="Workspace activity" onClose={() => setDialog(null)}><div className="activity-feed">{[...store.state.logs].reverse().map(log => <div key={log.id}><span className={`status-dot ${log.level}`} /><p>{log.text}<time>{log.time}</time></p></div>)}</div></Dialog>}
  </div>
}
