const InboxRoutes = [
  {
    key: 'Announcement',
    title: 'message.announcement',
    icon: 'announcement',
    route: '/agent/inbox/announcement',
  },
  {
    key: 'Message',
    title: 'message.personalMessage',
    icon: 'mail',
    route: '/agent/inbox/message',
  },
] as const

export type InboxRoutesParamList = Record<
  (typeof InboxRoutes)[number]['key'],
  undefined | object
>

export default InboxRoutes
