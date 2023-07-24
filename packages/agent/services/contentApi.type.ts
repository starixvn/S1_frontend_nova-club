export type ContentList<T> = {
  list: T[]
  total: number
}

export type AnnouncementItem = {
  newsId: string
  title: string
}

export type AnnouncementResult = {
  data: AnnouncementItem[]
  draw: number
  recordsFiltered: number
  recordsTotal: number
}

export type AnnouncementDetailArgs = {
  id: string
}

export type AnnouncementDetailResult = {
  data: AnnouncementDetailItem
  _keyVal: string
}

export type AnnouncementDetailItem = {
  content: string
  title: string
}

export type MessageItem = {
  subject: string
  messageId: string
}

export type MessageResult = {
  data: MessageItem[]
  draw: number
  recordsFiltered: number
  recordsTotal: number
}

export type MessageDetailArgs = {
  id: string
}

export type MessageDetailResult = {
  data: MessageDetailItem
  _keyVal: string
}

export type MessageDetailItem = {
  content: string
  title: string
}
