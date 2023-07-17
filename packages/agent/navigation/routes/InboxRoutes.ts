const InboxRoutes = [
  {
    key: 'AddShareholder',
    title: 'message.announcement',
    icon: 'announcement',
    route: '/agent/inbox/announcement',
  },
  {
    key: 'AddAgent',
    title: 'message.personalMessage',
    icon: 'mail',
    route: '/agent/inbox/mail',
  },
] as const

export type InboxRoutesParamList = Record<
  (typeof InboxRoutes)[number]['key'],
  undefined | object
>

export default InboxRoutes
