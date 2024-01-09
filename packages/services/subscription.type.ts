export interface SubscribeArgs {
  fcmToken: string
  currency: string
  memberId: string
  brand: string
}

export interface UnsubscribeArgs {
  memberId: string
  brand: string
}

export interface SubscribeToTopicArgs {
  fcmToken: string
  brand: string
  topic: string
}

interface Detail {
  id: number
  name: string
  brandId: string
  currencyId: string
  fcmToken: string
  createdAt: string
  updatedAt: string
}

export interface SubscribeResult {
  success: boolean
  message: string
  data: Detail
}
