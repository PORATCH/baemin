import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Circle, ScrollText, Terminal, Trash2, X } from 'lucide-react'
import type { WorkspaceStore } from '../state/useWorkspace'
import { IconButton } from './ui'
export function BottomPanel({ store, onClose }: { store: WorkspaceStore; onClose: () => void }) {
  const [tab, setTab] = useState<'Terminal' | 'Logs'>('Terminal')
  const [lines, setLines] = useState(['Relay local terminal · simulation mode', 'Type help to see available commands. No shell commands are executed.'])
  const [command, setCommand] = useState('')
  const viewport = useRef<HTMLDivElement>(null)
  useEffect(() => { viewport.current?.scrollTo({ top: viewport.current.scrollHeight }) }, [lines, store.state.logs, tab])
  function execute(e: React.FormEvent) {
    e.preventDefault()
    const input = command.trim(); if (!input) return
    setCommand('')
    if (input === 'clear') { setLines([]); return }
    let result: string
    if (input === 'help') result = 'Available: help · clear · status · ls · echo <text> · npm run dev (simulation)'
    else if (input === 'status') result = store.state.agents.map(a => `${a.name}: ${a.status}`).join('  |  ')
    else if (input === 'ls') result = store.project.files.map(f => f.path).join('  ')
    else if (input.startsWith('echo ')) result = input.slice(5)
    else if (input === 'npm run dev') result = 'SIMULATION: Development server would start here. This terminal does not execute commands.'
    else result = `Command not supported in simulation: ${input}. Type help for available commands.`
    setLines(prev => [...prev.slice(-199), `$ ${input}`, result]); store.log(`Simulated terminal command: ${input}`)
  }
  return <section className="bottom-panel" aria-label="Terminal panel"><header className="bottom-tabs"><div role="tablist" aria-label="Runtime panels">{(['Terminal', 'Logs'] as const).map(t => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={tab === t ? 'active' : ''}>{t === 'Terminal' ? <Terminal size={14} /> : <ScrollText size={14} />}{t}{t === 'Logs' && <span className="count-pill">{store.state.logs.length}</span>}</button>)}</div><span className="terminal-mode"><Circle size={6} fill="currentColor" /> Local simulation</span><IconButton label="Clear terminal output" onClick={() => setLines([])} disabled={tab !== 'Terminal'}><Trash2 size={13} /></IconButton><IconButton label="Close terminal panel" onClick={onClose}><X size={15} /></IconButton></header>
    <div className="terminal-body" ref={viewport} role="tabpanel" aria-label={tab}>{tab === 'Terminal' ? <><div className="terminal-session"><span className="status-dot" />{store.project.name.toLowerCase().replaceAll(' ', '-')}<span> / workspace</span></div>{lines.map((line, i) => <div key={i} className={`terminal-line ${line.startsWith('$') ? 'command-line' : ''}`}>{line}</div>)}<form onSubmit={execute} className="terminal-input"><ChevronRight size={13} /><input aria-label="Terminal command" placeholder="Enter a simulated command…" value={command} onChange={e => setCommand(e.target.value)} autoComplete="off" spellCheck={false} /></form></> : <div className="log-lines" aria-live="polite">{store.state.logs.map(entry => <div className="log-line" key={entry.id}><time>{entry.time}</time><span className={`log-level ${entry.level}`}>{entry.level}</span><span>{entry.text}</span></div>)}</div>}</div>
  </section>
}
