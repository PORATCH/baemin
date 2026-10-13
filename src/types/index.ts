export type Page = 'Dashboard' | 'Projects' | 'Agents' | 'Skills' | 'Settings'
export type WorkspaceTab = 'Chat' | 'Tasks' | 'Files'
export type AgentStatus = 'working' | 'idle' | 'paused'
export interface Agent { id: string; name: string; role: string; initials: string; color: string; status: AgentStatus; progress: number; task: string }
export interface Task { id: string; title: string; detail: string; agentId: string; done: boolean }
export interface ProjectFile { path: string; language: string; content: string }
export interface Message { id: string; role: 'user' | 'agent'; content: string; time: string; agentId?: string; kind?: 'plan' | 'result' }
export interface Project { id: string; name: string; description: string; color: string; branch: string; tasks: Task[]; files: ProjectFile[]; messages: Message[] }
export interface LogEntry { id: string; time: string; level: 'info' | 'success' | 'warning'; text: string }
export interface Preferences { compact: boolean; timestamps: boolean }
