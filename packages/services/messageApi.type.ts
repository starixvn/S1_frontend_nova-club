export interface MessageResult {
  row_count_total: number
  rows: Message[]
}

export interface Message {
  date: string
  message: string
  messageId: number
  player: string
  session: string
  subject: string
  unreadCnt: number
}

export interface DeleteMessageQueryArgs {
  isDeleteAll: boolean
  ids: number[]
  username?: string
}

export interface MessageDetailsArgs {
  message_id: number
}

export interface MessageDetailsResult {
  message: string
  subject: string
}
