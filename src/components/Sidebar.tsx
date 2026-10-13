import { ArrowUpRight, Bot, ChevronDown, CircleHelp, Command, Folder, LayoutDashboard, PanelLeftClose, PanelLeftOpen, Plus, Settings2, Sparkles, Zap } from 'lucide-react'
import type { Page } from '../types'
import type { WorkspaceStore } from '../state/useWorkspace'
import { IconButton } from './ui'
const navigation = [
  { name: 'Dashboard' as Page, icon: LayoutDashboard }, { name: 'Projects' as Page, icon: Folder },
  { name: 'Agents' as Page, icon: Bot }, { name: 'Skills' as Page, icon: Sparkles }, { name: 'Settings' as Page, icon: Settings2 },
]
export function Sidebar({ store, page, onPage, collapsed, onCollapse, onNewProject, onHelp }: {
  store: WorkspaceStore; page: Page; onPage: (page: Page) => void; collapsed: boolean; onCollapse: () => void; onNewProject: () => void; onHelp: () => void
}) {
  return <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} aria-label="Main navigation">
    <div className="brand"><span className="brand-mark"><Command size={21} strokeWidth={2} /></span>{!collapsed && <><span>relay<span className="brand-period">.</span></span><span className="version">BETA</span></>}</div>
    <button className="workspace-switch" onClick={() => onPage('Projects')} title="Browse workspaces"><span className="workspace-avatar">S</span>{!collapsed && <><span className="flex-1 text-left">Studio workspace<small>Personal workspace</small></span><ChevronDown size={14} /></>}</button>
    {!collapsed && <div className="section-label">WORKSPACE</div>}
    <nav>{navigation.map(({ name, icon: Icon }) => <button key={name} className={`nav-item ${page === name ? 'active' : ''}`} onClick={() => onPage(name)} aria-label={name} aria-current={page === name ? 'page' : undefined} title={collapsed ? name : undefined}><Icon size={18} />{!collapsed && <><span>{name}</span>{name === 'Agents' && <span className="nav-count">{store.state.agents.length}</span>}</>}</button>)}</nav>
    {!collapsed && <><div className="section-label project-label"><span>YOUR PROJECTS</span><IconButton label="Create project" onClick={onNewProject}><Plus size={14} /></IconButton></div><div className="sidebar-projects">{store.state.projects.map(p => <button key={p.id} className={`project-link ${store.project.id === p.id ? 'selected' : ''}`} onClick={() => { store.dispatch({ type: 'select-project', id: p.id }); onPage('Dashboard') }}><span className={`project-dot ${p.color}`} /><span>{p.name}</span>{store.project.id === p.id && <span className="tiny-dot" />}</button>)}</div><button className="new-project" onClick={onNewProject}><Plus size={14} /> New project</button></>}
    <div className="sidebar-bottom">{!collapsed && <div className="local-card"><span><Zap size={15} />Your space, in sync.</span><p>One place for your agents<br />and everything they build.</p><button onClick={onHelp}>Explore the workspace <ArrowUpRight size={13} /></button></div>}<div className="sidebar-utilities"><button onClick={onHelp} aria-label="Help and shortcuts"><CircleHelp size={17} />{!collapsed && 'Help & shortcuts'}</button><IconButton label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={onCollapse}>{collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}</IconButton></div><button className="profile" onClick={() => onPage('Settings')} aria-label="Open profile settings"><span className="profile-avatar">JD</span>{!collapsed && <><span className="flex-1 text-left">Jamie Davis<small>Personal account</small></span><Settings2 size={15} /></>}</button></div>
  </aside>
}
