import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { GAME_TYPE_CODE } from 'utils/constant'
import { Game } from 'services/gameApi.type'

export const SabaGamePayload: Game = {
  gc: '1',
  name: {
    en: 'SABA Sports',
    vi: 'SABA Sports',
  },
  gtc: GAME_TYPE_CODE.SPORTS,
  img: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/saba-gamelaunch.png`,
  gpc: 'SABA',
  tags: [],
}
