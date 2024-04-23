import { GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'utils/constant'
import { Game } from 'services/gameApi.type'

const Route = {
  'keno-lottery': 'keno-lottery',
  fishing: 'fishing',
  card: 'card',
  local: 'local',
  cockfighting: 'cockfighting',
} as const

export const Route_GameCategory: Record<keyof typeof Route, GAME_TYPE_CODE> = {
  'keno-lottery': GAME_TYPE_CODE.LOTTERY,
  fishing: GAME_TYPE_CODE.FISHING,
  card: GAME_TYPE_CODE.GAMES,
  local: GAME_TYPE_CODE.GAMES,
  cockfighting: GAME_TYPE_CODE.COCKFIGHTING,
}

export const SUB_ROUTES = {
  'keno-lottery': {
    key: 'lotto',
    label: 'game.category.lottery',
    icon: 'lotto',
    route: Route['keno-lottery'],
    filter: (games: Game[]) => {
      return games.filter(
        (g) =>
          // any game thats a "Card Game" will not be listed under game type
          g.gdc_cat !== GDC_GAME_CATEGORY.CARDGAME &&
          g.gtc === GAME_TYPE_CODE.LOTTERY
      )
    },
  },
  fishing: {
    key: 'fishing',
    label: 'game.category.fishing',
    icon: 'fishing',
    route: Route['fishing'],
    filter: (games: Game[]) => {
      return games.filter(
        (g) =>
          // any game thats a "Card Game" will not be listed under game type
          g.gdc_cat !== GDC_GAME_CATEGORY.CARDGAME &&
          g.gtc === GAME_TYPE_CODE.FISHING
      )
    },
  },
  card: {
    key: 'card',
    label: 'game.category.cardGame',
    icon: 'card-game',
    route: Route['card'],
    filter: (games: Game[]) => {
      return games.filter((g) => g.gdc_cat === GDC_GAME_CATEGORY.CARDGAME)
    },
  },
  local: {
    key: 'games',
    label: 'game.category.localGame',
    icon: 'games',
    route: Route['local'],
    filter: (games: Game[]) => {
      return games.filter(
        (g) =>
          // any game thats a "Card Game" will not be listed under game type
          g.gdc_cat !== GDC_GAME_CATEGORY.CARDGAME &&
          g.gtc === GAME_TYPE_CODE.GAMES
      )
    },
  },
  cockfighting: {
    key: 'cockfighting',
    label: 'game.category.cockfighting',
    icon: 'cockfighting',
    route: Route['cockfighting'],
    filter: (games: Game[]) => {
      return games.filter(
        (g) =>
          // any game thats a "Card Game" will not be listed under game type
          g.gdc_cat !== GDC_GAME_CATEGORY.CARDGAME &&
          g.gtc === GAME_TYPE_CODE.COCKFIGHTING
      )
    },
  },
}

export const DefaultFilter = [
  SUB_ROUTES.local,
  SUB_ROUTES.card,
  SUB_ROUTES.fishing,
  SUB_ROUTES['keno-lottery'],
]

export const DesktopGamesFilter = [
  ...DefaultFilter,
  {
    key: 'slot',
    label: 'game.category.slots',
    icon: 'sl',
    route: '/slots',
  },
  SUB_ROUTES.cockfighting,
]

export const MobileGamesFilter = [
  {
    label: 'common.all',
    icon: 'all',
    route: '/games',
  },
  SUB_ROUTES.cockfighting,
  ...DefaultFilter,
]
