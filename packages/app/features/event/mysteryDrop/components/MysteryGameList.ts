import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FeaturedGame, Game } from 'services/gameApi.type'
import { GAME_TYPE_CODE } from 'utils/constant'

export const MYSTERY_DROP_GAME_LIST: Game[] = [
  {
    gc: '1',
    gpc: 'SABA',
    gtc: GAME_TYPE_CODE.SPORTS,
    name: {
      en: 'SABA Sports',
      vi: 'SABA Sports',
      th: 'SABA Sports',
    },
    img: {
      en: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-1.png`,
      vi: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-1.png`,
      th: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-1.png`,
    },
    tags: [],
  },
  {
    gc: '43',
    gpc: 'SABA',
    gtc: GAME_TYPE_CODE.E_SPORTS,
    name: {
      en: 'SABA E-Sports',
      vi: 'SABA E-Sports',
      th: 'SABA E-Sports',
    },
    img: {
      en: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-2.png`,
      vi: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-2.png`,
      th: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-2.png`,
    },
    tags: [],
  },
  {
    gc: '180',
    gpc: 'SABA',
    gtc: GAME_TYPE_CODE.VIRTUAL_SPORTS,
    name: {
      en: 'SABA Virtual Sports',
      vi: 'SABA Virtual Sports',
      th: 'SABA Virtual Sports',
    },
    img: {
      en: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-3.png`,
      vi: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-3.png`,
      th: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-3.png`,
    },
    tags: [],
  },
  {
    gpc: 'O789',
    gc: '2',
    gtc: GAME_TYPE_CODE.LIVE_DEALER,
    name: {
      en: 'Se Die',
      vi: 'Se Die',
      th: 'Se Die',
    },
    img: {
      en: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-4.png`,
      vi: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-4.png`,
      th: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-4.png`,
    },
    tags: [],
  },
  {
    gc: 'Vgaming:3805',
    gpc: 'SABA',
    gtc: GAME_TYPE_CODE.GAMES,
    img: {
      en: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-5.png`,
      vi: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-5.png`,
      th: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-5.png`,
    },
    name: {
      en: 'Turbo Big Small ',
      vi: 'Turbo Big Small ',
      th: 'Turbo Big Small ',
    },
    tags: [],
  },
  {
    gc: 'keno',
    gpc: 'SABA',
    gtc: GAME_TYPE_CODE.LOTTERY,
    name: {
      en: 'Saba Keno',
      vi: 'Saba Keno',
      th: 'Saba Keno',
    },
    img: {
      en: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-6.png`,
      vi: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-6.png`,
      th: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-6.png`,
    },
    tags: [],
  },
  {
    gc: 'lottery',
    gpc: 'SABA',
    gtc: GAME_TYPE_CODE.LOTTERY,
    name: {
      en: 'Saba Lottery',
      vi: 'Saba Lottery',
      th: 'Saba Lottery',
    },
    img: {
      en: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-7.png`,
      vi: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-7.png`,
      th: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-7.png`,
    },
    tags: [],
  },
  {
    gc: '161',
    gpc: 'SABA',
    gtc: GAME_TYPE_CODE.LOTTERY,
    name: {
      en: 'Saba Number Game',
      vi: 'Saba Number Game',
      th: 'Saba Number Game',
    },
    img: {
      en: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-8.png`,
      vi: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-8.png`,
      th: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-8.png`,
    },
    tags: [],
  },
]
