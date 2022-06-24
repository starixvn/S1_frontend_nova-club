export interface MessageResult {
  count: number
  messages: Message[]
}

export interface Message {
  date: string
  message: string
  messageId: number
  player: string
  session: string
  subject: string
}

export interface MessageQueryArgs {
  username: string
}

export interface DeleteMessageQueryArgs {
  isDeleteAll: boolean
  ids: number[]
  username: string
}
