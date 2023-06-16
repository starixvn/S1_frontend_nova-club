import { Route } from '../components/navigation/type'

export const BOTTOM_ROUTE: Route[] = [
  {
    label: 'Sportsbook',
    path: '/sportsbook',
    icon: 'sportbook',
  },
  {
    label: 'Games',
    path: '/games',
    icon: 'games1',
  },
  {
    label: 'Home',
    path: '/',
    icon: 'home',
  },
  {
    label: 'Slots',
    path: '/slots',
    icon: 'sl',
  },
  {
    label: 'Live Casino',
    path: '/livecasino',
    icon: 'casino',
  },
]

export const Profile_Wallet_Route: Route[] = [
  {
    label: 'Transfer',
    path: '/transfer',
    icon: 'transfer',
  },
  {
    label: 'Deposit',
    path: '/deposit',
    icon: 'deposit',
  },
  {
    label: 'Withdraw',
    path: '/withdrawal',
    icon: 'withdraw',
  },
  {
    label: 'Bank Account',
    path: '/bank',
    icon: 'card',
  },
  {
    label: 'History',
    path: '/history',
    icon: 'history',
  },
]

export const Profile_Quick_Navigation_Path: Route[] = [
  {
    label: 'profile',
    path: '/account/profile-details',
    icon: 'profile',
  },
  {
    label: 'manage credentials',
    path: '/account/profile/manage-credentials',
    icon: 'mng-cred',
  },
  {
    label: 'message/\nannouncement',
    path: '/account/profile/message',
    icon: 'announcement',
  },
  {
    label: 'commission table',
    path: '/account/profile/commission',
    icon: 'ct',
  },
  {
    label: 'my rewards hub',
    path: '/account/profile/my-rewards-hub',
    icon: 'gift',
  },
  // {
  //   label: 'friend referral',
  //   path: '/',
  //   icon: 'friend-ref',
  // },
  // {
  //   label: 'promotion',
  //   path: '/',
  //   icon: 'm_promo',
  // },
  {
    label: 'leaderboard',
    path: '/account/profile/leaderboard',
    icon: 'crown',
  },
  // {
  //   label: 'affiliates',
  //   path: '/',
  //   icon: 'aff',
  // },
  {
    label: 'customer support',
    path: '/account/profile/customer-support',
    icon: 'cs',
  },
  {
    label: 'logout',
    path: '/auth/login',
    icon: 'logout',
  },
]
