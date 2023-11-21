import { LIVECHAT_URL, REFERRAL_DOMAIN } from '@env'
import { LaunchGame } from 'app/features/game/GameLauncher'
import { Linking } from 'react-native'
import { Game } from 'services/gameApi.type'

export enum ActionType {
  GAME = 'game',
  INTERNAL_REDIRECT = 'internalRedirect',
  LIVECHAT = 'livechat',
  DOWNLOAD_APP = 'downloadApp',
  EXTERNAL_REDIRECT = 'externalRedirect',
}

export interface InternalRedirectPayload {
  uri: string
  params?: Record<string, string>
}

export interface ActionLaunchGame {
  type: ActionType.GAME
  payload: { game: Game; desktopMode?: boolean }
}

export interface ActionRedirect {
  type: ActionType.INTERNAL_REDIRECT
  payload: InternalRedirectPayload
}

export type ActionRedirectParams = {
  push: any
  locale: string
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

export function getAction(action: Action): (p?: ActionRedirectParams) => void {
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
        const { game, desktopMode } = action.payload
        LaunchGame({
          ...game,
          desktopMode,
        })
      }
    }

    case ActionType.INTERNAL_REDIRECT: {
      const payload = action.payload
      if (!payload || !payload.uri) return () => {}

      const { uri, params = {} } = payload

      return (p?: ActionRedirectParams) => {
        try {
          if (p) {
            const { push, locale } = p

            let replacedParams = { ...params }
            if (replacedParams.locale) {
              replacedParams.locale = locale
            }
            console.log('pushing', uri, replacedParams)
            push({ pathname: `${uri}`, query: replacedParams })
          }
        } catch (e) {
          console.log('Internal Redirection error', e)
        }
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
