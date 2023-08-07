import { LIVECHAT_URL, REFERRAL_DOMAIN } from '@env'
import { LaunchGame } from 'app/features/game/GameLauncher'
import i18n from 'app/provider/localization/i18n'
import { Linking } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { Game } from 'services/gameApi.type'

enum CarouselBannerActionType {
  INTERNAL_REDIRECT = 'internalRedirect',
  EXTERNAL_REDIRECT = 'externalRedirect',
  MODAL = 'modal',
}

interface InternalRedirectPayload {
  uri: string
  desktopUri?: string
  payload: BannerCarouselActionPayload
}

interface ActionRedirect {
  type: CarouselBannerActionType.INTERNAL_REDIRECT
  desktopType: CarouselBannerActionType
  payload: BannerCarouselActionPayload
}

type CarouselBannerActionRedirectParams = {
  push: any
  locale: string
  openModal: any
}

interface ActionExternalRedirect {
  type: CarouselBannerActionType.EXTERNAL_REDIRECT
  desktopType: CarouselBannerActionType
  payload: BannerCarouselActionPayload
}

interface ActionModal {
  type: CarouselBannerActionType.MODAL
  desktopType: CarouselBannerActionType
  payload: BannerCarouselActionPayload
}

interface BannerCarouselActionPayload {
  uri: string
  desktopUri: string
  params?: Record<string, string>
}

export type BannerAction = ActionRedirect | ActionExternalRedirect | ActionModal

export function getCarouselBannerActionGenerator(
  action: BannerAction,
  isDesktop: boolean,
  actionType: CarouselBannerActionType
): (p?: CarouselBannerActionRedirectParams) => void {
  //   console.log(action)
  switch (actionType) {
    case CarouselBannerActionType.INTERNAL_REDIRECT: {
      const payload = action.payload
      if (!payload || !payload.uri) return () => {}

      const { uri, desktopUri, params = {} } = payload

      return (p?: CarouselBannerActionRedirectParams) => {
        try {
          if (p) {
            const { push, locale } = p

            let replacedParams = { ...params }
            if (replacedParams.locale) {
              replacedParams.locale = locale
            }
            console.log('pushing', uri, replacedParams)
            push({
              pathname: isDesktop ? desktopUri : uri,
              query: replacedParams,
            })
          }
        } catch (e) {
          console.log('Internal Redirection error', e)
        }
      }
    }

    case CarouselBannerActionType.MODAL: {
      const payload = action.payload
      if (!payload || !payload.uri) return () => {}

      const { uri, desktopUri } = payload

      return (p?: CarouselBannerActionRedirectParams) => {
        try {
          if (p) {
            const { openModal } = p
            openModal(isDesktop ? desktopUri : uri)
          }
        } catch (e) {
          console.log('Open Modal Error error', e)
        }
      }
    }

    case CarouselBannerActionType.EXTERNAL_REDIRECT: {
      if (!action.payload || !action.payload.uri) return () => {}
      const { uri, desktopUri } = action.payload
      return () => {
        Linking.openURL(isDesktop ? desktopUri : uri)
      }
    }
    default:
      return () => {}
  }
}
