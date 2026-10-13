import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { Agent } from '../types'

export function IconButton({ label, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) {
  return <button type="button" className="icon-button" aria-label={label} title={label} {...props}>{children}</button>
}
export function AgentAvatar({ agent, small = false }: { agent: Agent; small?: boolean }) {
  return <span className={`agent-avatar ${agent.color} ${small ? 'small' : ''}`}>{agent.initials}<span className={`presence ${agent.status}`} /></span>
}
export function StatusBadge({ status }: { status: Agent['status'] }) {
  return <span className={`status-badge ${status}`}><span className="status-dot" />{status === 'working' ? 'Working' : status === 'paused' ? 'Paused' : 'Idle'}</span>
}
export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return <button type="button" role="switch" aria-label={label} aria-checked={checked} className={`toggle ${checked ? 'on' : ''}`} onClick={onChange}><span /></button>
}
