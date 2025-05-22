export interface User {
  id: string
  name: string
  avatar?: string
  role: "admin" | "doctor"
}

export interface Attachment {
  id: string
  name: string
  url?: string
  type: string
}

export interface Message {
  id: string
  content: string
  createdAt: string
  sender: User
  attachments?: Attachment[]
}

export interface Ticket {
  id: string
  title: string
  description: string
  status: "open" | "in_progress" | "resolved"
  priority: "low" | "medium" | "high"
  category: "error" | "question" | "feature"
  createdAt: string
  updatedAt: string
  creator: User
  assignee?: User
  messages: Message[]
}
