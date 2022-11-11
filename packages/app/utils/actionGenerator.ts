import { LIVECHAT_URL, REFERRAL_DOMAIN } from '@env'
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
  DOWNLOAD_APP = 'downloadApp',
  EXTERNAL_REDIRECT = 'externalRedirect',
}

export interface ActionLaunchGame {
  type: ActionType.GAME
  payload: Game
}

export interface ActionRedirect {
  type: ActionType.REDIRECT
  payload: Game
}

export interface ActionExternalRedirect {
  type: ActionType.EXTERNAL_REDIRECT
  payload: {
    uri: string
  }
}

export interface ActionLivechat {
  type: ActionType.LIVECHAT
}

export interface ActionDownloadApp {
  type: ActionType.DOWNLOAD_APP
}

export type Action =
  | ActionLaunchGame
  | ActionRedirect
  | ActionLivechat
  | ActionExternalRedirect
  | ActionDownloadApp

export function getAction(action: Action): () => void {
  switch (action.type) {
    case ActionType.LIVECHAT: {
      return () => {
        Linking.openURL(LIVECHAT_URL)
      }
    }
    case ActionType.DOWNLOAD_APP: {
      return () => {
        Linking.openURL(REFERRAL_DOMAIN)
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
    case ActionType.EXTERNAL_REDIRECT: {
      if (!action.payload || !action.payload.uri) return () => {}
      const { uri } = action.payload
      return () => {
        Linking.openURL(uri)
      }
    }
    default:
      return () => {}
  }
}
