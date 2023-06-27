import { GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'app/utils/constant'
import { Game } from 'services/gameApi.type'

export const SUB_ROUTES = {
  'keno-lottery': {
    label: 'Keno / Xổ số',
    icon: 'lotto',
    route: 'keno-lottery',
    filter: (games: Game[]) => {
      return games.filter((g) => g.gtc === GAME_TYPE_CODE.LOTTERY)
    },
  },
  fishing: {
    label: 'Bắn Cá',
    icon: 'fishing',
    route: 'fishing',
    filter: (games: Game[]) => {
      return games.filter((g) => g.gtc === GAME_TYPE_CODE.FISHING)
    },
  },
  card: {
    label: 'Card Game',
    icon: 'card-game',
    route: 'card',
    filter: (games: Game[]) => {
      return games.filter((g) => g.gdc_cat === GDC_GAME_CATEGORY.CARDGAME)
    },
  },
  local: {
    label: 'Game Bài',
    icon: 'games',
    route: 'local',
    filter: (games: Game[]) => {
      return games.filter((g) => g.gtc === GAME_TYPE_CODE.GAMES)
    },
  },
}

export const DesktopGamesFilter = [
  SUB_ROUTES.local,
  SUB_ROUTES.card,
  SUB_ROUTES.fishing,
  SUB_ROUTES['keno-lottery'],
  {
    label: 'Slots',
    icon: 'sl',
    route: '/slots',
  },
]

export const MobileGamesFilter = [
  {
    label: 'All',
    icon: 'all',
    route: '/games',
  },
  SUB_ROUTES.card,
  SUB_ROUTES.local,
  SUB_ROUTES.fishing,
  SUB_ROUTES['keno-lottery'],
]
