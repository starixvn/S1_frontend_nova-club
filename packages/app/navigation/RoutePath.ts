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
    path: '/account/bank',
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
    label: 'common.profile',
    path: '/account/profile-details',
    icon: 'profile',
  },
  {
    label: 'manageCredentials.title',
    path: '/account/manage-credentials',
    icon: 'mng-cred',
  },
  {
    label: 'menu.msgAnnouncement',
    path: '/account/message',
    icon: 'announcement',
  },
  {
    label: 'menu.commissionTable',
    path: '/account/commission',
    icon: 'ct',
  },
  // {
  //   label: 'menu.rewardsHub',
  //   path: '/account/profile/my-rewards-hub',
  //   icon: 'gift',
  // },
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
    label: 'menu.leaderboard',
    path: '/account/leaderboard/event',
    icon: 'crown',
  },
  // {
  //   label: 'affiliates',
  //   path: '/',
  //   icon: 'aff',
  // },
  {
    label: 'contact.customerSupport',
    path: '/account/customer-support',
    icon: 'cs',
  },
  {
    label: 'common.logout',
    path: '/auth/login',
    icon: 'logout',
  },
]
