import { LIVECHAT_URL, REFERRAL_DOMAIN } from '@env'
import { ContextualComponentType } from 'app/navigation/web/ContextualNavigation'
import i18n from 'app/provider/localization/i18n'
import { store } from 'app/provider/redux/store'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { Linking, Platform } from 'react-native'
import { Game } from 'services/contentApi.type'

export enum ActionType {
  GAME = 'game',
  INTERNAL_REDIRECT = 'internalRedirect',
  LIVECHAT = 'livechat',
  DOWNLOAD_APP = 'downloadApp',
  EXTERNAL_REDIRECT = 'externalRedirect',
}

export interface InternalRedirectPayload {
  uri: string
  params: Record<string, string>
}

export interface ActionLaunchGame {
  type: ActionType.GAME
  payload: Game
}

export interface ActionRedirect {
  type: ActionType.INTERNAL_REDIRECT
  payload: InternalRedirectPayload
}

export type ActionRedirectParams = {
  push: any
  locale: string
  makeContextualHref: (to: ContextualComponentType, params?: any) => string
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
        store.dispatch(
          GameLauncherActions.launchGame({
            gameCode: action.payload.gc,
            gameName: action.payload.name[i18n.locale],
            gameType: action.payload.gtc,
            providerCode: action.payload.gpc,
            image: action.payload.img,
            params: action.payload.params,
          })
        )
      }
    }

    case ActionType.INTERNAL_REDIRECT: {
      const payload = action.payload
      if (!payload || !payload.uri) return () => {}

      const { uri, params = {} } = payload

      return (p?: ActionRedirectParams) => {
        try {
          if (p) {
            const { push, makeContextualHref, locale } = p

            let replacedParams = { ...params }
            if (replacedParams.locale) {
              replacedParams.locale = locale
            }

            if (Platform.OS === 'web' && makeContextualHref) {
              push(makeContextualHref(uri, replacedParams), {
                pathname: uri,
                query: replacedParams,
              })
            } else {
              push(uri, {
                pathname: uri,
                query: replacedParams,
              })
            }
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
