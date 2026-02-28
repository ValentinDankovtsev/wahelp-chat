export type UserStatus = 'online' | 'offline'

export interface User {
  id: number
  name: string
  username: string
  avatar: string
  status: UserStatus
}

export type MessageType = 'incoming' | 'outgoing'

export interface Message {
  id: string
  text: string
  type: MessageType
  timestamp: string
  isRead: boolean
}

// Интерфейс чата
export interface Chat {
  id: number
  user: User
  messages: Message[]
  unreadCount: number
}
