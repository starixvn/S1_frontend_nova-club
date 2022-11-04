import { LIVECHAT_URL } from '@env'
import { GAMES } from 'app/config/games/games.type'
import i18n from 'app/provider/localization/i18n'
import { store } from 'app/provider/redux/store'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { Linking } from 'react-native'
import { Game, GameConfig } from 'services/contentApi.type'

export enum ActionType {
  GAME = 'game',
  REDIRECT = 'redirect',
  LIVECHAT = 'livechat',
}

export interface ActionLaunchGame {
  type: ActionType.GAME
  payload: Game
}

export interface ActionRedirect {
  type: ActionType.REDIRECT
  payload: Game
}

export interface ActionLivechat {
  type: ActionType.LIVECHAT
}

export type Action = ActionLaunchGame | ActionRedirect | ActionLivechat

export function getAction(action: Action): () => void {
  switch (action.type) {
    case ActionType.LIVECHAT: {
      return () => {
        Linking.openURL(LIVECHAT_URL)
      }
    }
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
