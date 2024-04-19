import { Platform } from 'react-native'
import { Route } from '../components/navigation/type'

export const BOTTOM_ROUTE: Route[] = [
  {
    label: 'game.category.sportsbook',
    path: '/sportsbook',
    icon: 'sportbook',
  },
  {
    label: 'game.category.games',
    path: '/games',
    icon: 'games1',
  },
  {
    label: 'common.home',
    path: '/',
    icon: 'home',
  },
  {
    label: 'game.category.slots',
    path: '/slots',
    icon: 'sl',
  },
  {
    label: 'game.category.liveCasino',
    path: '/livecasino',
    icon: 'casino',
  },
]

export const Profile_Wallet_Route: Route[] = [
  {
    label: 'common.transfer',
    path: '/transfer/receive',
    icon: 'transfer',
  },
  {
    label: 'common.deposit',
    path: '/deposit',
    icon: 'deposit',
  },
  {
    label: 'common.withdraw',
    path: '/withdrawal',
    icon: 'withdraw',
  },
  {
    label: 'common.bankAccount',
    path: '/account/bank',
    icon: 'card',
  },
  {
    label: 'common.history',
    path: '/history/transaction',
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
    path: '/account/manage-credentials/change-password',
    icon: 'mng-cred',
  },
  {
    label: 'menu.msgAnnouncement',
    path: '/account/mail/message',
    icon: 'announcement',
  },
  {
    label: 'menu.commissionTable',
    path: '/account/commission',
    icon: 'ct',
  },
  {
    label: 'menu.rewardsHub',
    path: '/rewards/redeem/list',
    icon: 'coin-circle',
  },
  {
    label: 'menu.friendReferral',
    path: '/account/referral',
    icon: 'friend-ref',
  },
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
    label: 'footer.contactUs',
    path: '/account/customer-support',
    icon: 'cs',
  },
  {
    label: 'biometric.title',
    path: '/account/biometric',
    icon: Platform.OS === 'ios' ? 'face-id' : 'fingerprint',
  },
  {
    label: 'common.logout',
    path: '/auth/login',
    icon: 'logout',
  },
]

export const EURO_BOTTOM_ROUTE: Required<
  Pick<Route, 'icon' | 'path' | 'label'>
>[] = [
  {
    label: 'event.euro.prediction',
    path: '/euro-cup/prediction',
    icon: 'prediction',
  },
  {
    label: 'event.euro.rules',
    path: '/euro-cup/rules',
    icon: 'rules',
  },
  {
    label: 'event.euro.tnc',
    path: '/euro-cup/tnc',
    icon: 'tnc',
  },
  {
    label: 'common.history',
    path: '/euro-cup/history',
    icon: 'history',
  },
]
