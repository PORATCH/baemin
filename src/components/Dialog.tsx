import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { IconButton } from './ui'
export function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { const dialog = ref.current!; dialog.showModal(); return () => dialog.close() }, [])
  return <dialog ref={ref} className="app-dialog" aria-label={title} onCancel={e => { e.preventDefault(); onClose() }} onClick={e => { if (e.target === ref.current) { const rect = ref.current.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) onClose() } }}><header><h2>{title}</h2><IconButton label="Close dialog" onClick={onClose}><X size={17} /></IconButton></header>{children}</dialog>
}
