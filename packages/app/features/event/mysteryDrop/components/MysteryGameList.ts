import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Game } from 'services/gameApi.type'

export const MYSTERY_DROP_GAME_LIST: Game[] = [
  {
    gc: '1',
    gpc: 'SABA',
    gtc: 'sports',
    gdc_cat: '',
    name: {
      en: 'SABA Sports',
      vi: 'SABA Sports',
    },
    img: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-1.png`,
  },
  {
    gc: '43',
    gpc: 'SABA',
    gtc: 'e_sports',
    gdc_cat: '',
    name: {
      en: 'SABA E-Sports',
      vi: 'SABA E-Sports',
    },
    img: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-2.png`,
  },
  {
    gc: '180',
    gpc: 'SABA',
    gtc: 'virtual_sports',
    gdc_cat: '',
    name: {
      en: 'SABA Virtual Sports',
      vi: 'SABA Virtual Sports',
    },
    img: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-3.png`,
  },
  {
    gpc: 'O789',
    gc: '2',
    gtc: 'live_dealer',
    name: {
      en: 'Se Die',
      vi: 'Se Die',
    },
    gdc_cat: '',
    img: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-4.png`,
    cat: '2',
  },
  {
    cat: '2',
    gc: 'Vgaming:3805',
    gpc: 'SABA',
    gtc: 'games',
    img: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-5.png`,
    name: {
      en: 'Turbo Big Small ',
      vi: 'Turbo Big Small ',
    },
  },
  {
    gc: 'keno',
    gpc: 'SABA',
    gtc: 'lottery',
    gdc_cat: '',
    name: {
      en: 'Saba Keno',
      vi: 'Saba Keno',
    },
    img: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-6.png`,
  },
  {
    gc: 'lottery',
    gpc: 'SABA',
    gtc: 'lottery',
    gdc_cat: '',
    name: {
      en: 'Saba Lottery',
      vi: 'Saba Lottery',
    },
    img: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-7.png`,
  },
  {
    gc: '161',
    gpc: 'SABA',
    gtc: 'lottery',
    gdc_cat: '',
    name: {
      en: 'Saba Number Game',
      vi: 'Saba Number Game',
    },
    img: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/saba-8.png`,
  },
]
