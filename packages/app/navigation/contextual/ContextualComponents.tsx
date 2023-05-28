const ContextualComponents = {
  '/auth/login': () => import('app/features/auth/login'),
  '/auth/forget-password': () => import('app/features/auth/forgotPassword'),
  '/auth/register': () => import('app/features/auth/register'),
  '/auth/register/tnc': () =>
    import('../../../../apps/next/pages/auth/register/tnc'),
  '/deposit': () => import('app/features/deposit'),
  '/deposit/deposit-loader': () =>
    import('app/features/deposit/deposit-loader'),
  '/deposit/local-bank': () => import('app/features/deposit/local-bank'),
  '/deposit/online-bank': () => import('app/features/deposit/online-bank'),
  '/deposit/momo': () => import('app/features/deposit/momo'),
  '/deposit/qr-transfer': () => import('app/features/deposit/qr-transfer'),
  '/deposit/topup-card': () => import('app/features/deposit/topup-card'),
  '/profile/account-verification': () =>
    import('app/features/profile/account-verification'),
  '/deposit/crypto': () => import('app/features/deposit/crypto'),
  '/withdrawal': () => import('app/features/withdrawal'),
  '/profile/bank-account': () => import('app/features/profile/bank-account'),
  '/profile/bank-account/add-bank-account': () =>
    import('app/features/profile/bank-account/add-bank-account'),
  '/profile/history': () => import('app/features/profile/history'),
  '/profile/profile-details': () =>
    import('app/features/profile/profile-details'),
  '/profile': () => import('app/features/profile'),
  '/profile/manage-credentials': () =>
    import('app/features/profile/manage-credentials'),
  '/profile/commission-table': () =>
    import('app/features/profile/commission-table'),
  '/messages': () => import('app/features/messages'),
  '/customer-support': () => import('app/features/customerSupport'),
  '/transfer-scanner': () => import('app/features/transferScanner'),
  '/transfer': () => import('app/features/transferScanner/transfer'),
  '/pin/create-pin': () => import('app/features/pin/CreatePinScreen'),
  '/pin/change-pin': () => import('app/features/pin/change-pin'),
  '/pin/forgot-pin': () => import('app/features/pin/forgot-pin'),
  '/profile/overview': () => import('app/features/profile/overview'),
  '/event/sea-game': () => import('../../../../apps/next/pages/event/sea-game'),
  '/event/sea-game-event-tnc': () =>
    import('../../../../apps/next/pages/event/sea-game-event-tnc'),
  '/banner/agent-tnc': () =>
    import('../../../../apps/next/pages/banner/agent-tnc'),
  '/event/prediction': () =>
    import('app/features/events/prediction/Prediction'),
}

export type ContextualComponentType = keyof typeof ContextualComponents

export default ContextualComponents
