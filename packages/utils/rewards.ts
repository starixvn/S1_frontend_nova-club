import { CONTENT_URI, DEV_DOMAIN, MEDIA_DOMAIN } from '@env'
import { LoginResult } from 'services/authApi.type'

export enum RewardPostMessageType {
  gameSecretKey = 'game-secretKey',
  sessionExpired = 'session-expired',
  endGame = 'end-game',
}

export type RewardSessionExpiredPayload = {
  type: RewardPostMessageType.sessionExpired
}

export type RewardGameKeyPayload = {
  type: RewardPostMessageType.gameSecretKey
  payload: {
    secretKey: string
    userAuthInfo?: LoginResult
    locale: string
  }
}

export type RewardEndGamePayload = {
  type: RewardPostMessageType.endGame
}

export type RewardPostMessagePayload =
  | RewardGameKeyPayload
  | RewardSessionExpiredPayload
  | RewardEndGamePayload

const LOCAL_HOST_ORIGIN = 'http://localhost:3000'
export const iFrameRewardOrigin =
  process.env.NODE_ENV === 'development' ? LOCAL_HOST_ORIGIN : DEV_DOMAIN

export const getRewardLauncherURL = () => {
  const path = '/rewards/games/launcher'
  // let domain = DEV_DOMAIN

  // if (__DEV__) {
  //   domain = LOCAL_HOST_ORIGIN
  // }

  // return `${domain}${path}`

  return path
}

export enum RewardGameKeyMap {
  ANGPAO_HUNT = 'G3BWFQ',
  SPIN_N_WIN = 'ISKC8G',
  GOLDEN_CAT = 'H51DDF',
  FORTUNE_CAT = '8ZWYC7',
  MYSTERY_DROP = '5U7WMZ',
  SCRATCH_CARD = 'SCR2CH',
}

const STATIC_IMAGE_URL = `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/title`

export const getRewardTitleImage = (gameKey, lang = 'en') => {
  // Use all EN until they have each image for each language
  const rewardTitleImageMap = {
    [RewardGameKeyMap.ANGPAO_HUNT]: `${STATIC_IMAGE_URL}/angpao-hunt-${lang}.png`,
    [RewardGameKeyMap.FORTUNE_CAT]: `${STATIC_IMAGE_URL}/fortune-cat-${lang}.png`,
    [RewardGameKeyMap.GOLDEN_CAT]: `${STATIC_IMAGE_URL}/golden-cat-${lang}.png`,
    [RewardGameKeyMap.SPIN_N_WIN]: `${STATIC_IMAGE_URL}/spin-win-${lang}.png`,
    [RewardGameKeyMap.MYSTERY_DROP]: `${STATIC_IMAGE_URL}/mystery-event-${lang}.png`,
    [RewardGameKeyMap.SCRATCH_CARD]: `${STATIC_IMAGE_URL}/scratch-card-${lang}.png`,
  } satisfies Record<RewardGameKeyMap, string>

  return rewardTitleImageMap[gameKey]
}
