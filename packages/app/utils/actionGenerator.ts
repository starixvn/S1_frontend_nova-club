import { GAMES } from 'app/config/games/games.type'
import i18n from 'app/provider/localization/i18n'
import { store } from 'app/provider/redux/store'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { Game, GameConfig } from 'services/contentApi.type'

export enum ActionType {
  GAME = 'game',
  REDIRECT = 'redirect',
}

export interface ActionLaunchGame {
  type: ActionType.GAME
  payload: Game
}

export interface ActionRedirect {
  type: ActionType.REDIRECT
  payload: Game
}

export type Action = ActionLaunchGame | ActionRedirect

export function getAction(action: Action): () => void {
  switch (action.type) {
    case ActionType.GAME: {
      return () => {
        store.dispatch(
          GameLauncherActions.launchGame({
            gameCode: action.payload.gc,
            gameName: action.payload.name[i18n.locale],
            gameType: action.payload.gtc,
            providerCode: action.payload.gpc,
            image: action.payload.img,
          })
        )
      }
    }
    default:
      return () => {}
  }
}
