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
