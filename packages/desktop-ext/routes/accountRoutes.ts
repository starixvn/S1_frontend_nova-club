import { DesktopRoute } from './NavigationType'

const _Routes: Readonly<DesktopRoute[]> = [
  {
    key: 'Profile',
    title: 'common.profile',
    icon: 'profile',
    route: '/account',
  },
  {
    key: 'BankAccount',
    title: 'common.bankAccount',
    icon: 'card',
    route: '/account/bank',
  },
  {
    key: 'ManageCredentials',
    title: 'manageCredentials.title',
    icon: 'mng-cred',
    route: '/account/manage-credentials',
  },
  {
    key: 'Message',
    title: 'menu.msgAnnouncement',
    icon: 'announcement',
    route: '/account/message',
  },
  {
    key: 'FriendReferral',
    title: 'menu.friendReferral',
    icon: 'friend-ref',
    route: '/transfer/qr-transfer',
  },
  {
    key: 'CommissionTable',
    title: 'menu.commissionTable',
    icon: 'ct',
    route: '/account/commission',
  },
  {
    key: 'CustomerSupport',
    title: 'contact.customerSupport',
    icon: 'cs',
    route: '/account/customer-support',
  },
] as const

export type AccountRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const AccountRoutes = _Routes

export default AccountRoutes
