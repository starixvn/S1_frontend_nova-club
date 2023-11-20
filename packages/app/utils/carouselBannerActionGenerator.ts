import { LoginType } from 'app/features/auth/AuthLayout'
import { Linking } from 'react-native'

export enum CarouselBannerActionType {
  INTERNAL_REDIRECT = 'internalRedirect',
  EXTERNAL_REDIRECT = 'externalRedirect',
  MODAL = 'modal',
}

export enum PopupBannerActionType {
  INTERNAL_REDIRECT = 'int',
  EXTERNAL_REDIRECT = 'ext',
  MODAL = 'modal',
}

export const PopupMapping = [
  {
    url: '/rewards/daily',
    bannerAction: {
      desktopType: PopupBannerActionType.MODAL,
      type: PopupBannerActionType.INTERNAL_REDIRECT,
      payload: {
        uri: '/rewards/daily',
        desktopUri: 'DailyCheckInModal',
      },
    },
  },
  {
    url: '/auth/login?t=agent',
    bannerAction: {
      desktopType: PopupBannerActionType.MODAL,
      type: PopupBannerActionType.INTERNAL_REDIRECT,
      payload: {
        uri: '/auth/login',
        desktopUri: 'AgentLoginModal',
        params: {
          t: LoginType.Agent,
        },
      },
    },
  },
]

interface InternalRedirectPayload {
  uri: string
  desktopUri?: string
  payload: BannerCarouselActionPayload
}

interface ActionRedirect {
  type:
    | CarouselBannerActionType.INTERNAL_REDIRECT
    | PopupBannerActionType.INTERNAL_REDIRECT
  desktopType: CarouselBannerActionType | PopupBannerActionType
  payload: BannerCarouselActionPayload
}

type CarouselBannerActionRedirectParams = {
  push: any
  locale: string
  openModal: any
}

interface ActionExternalRedirect {
  type:
    | CarouselBannerActionType.EXTERNAL_REDIRECT
    | PopupBannerActionType.EXTERNAL_REDIRECT
  desktopType: CarouselBannerActionType | PopupBannerActionType
  payload: BannerCarouselActionPayload
}

interface ActionModal {
  type: CarouselBannerActionType.MODAL | PopupBannerActionType.MODAL
  desktopType: CarouselBannerActionType | PopupBannerActionType
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
  actionType: CarouselBannerActionType | PopupBannerActionType
): (p?: CarouselBannerActionRedirectParams) => void {
  //   console.log(action)
  switch (actionType) {
    case PopupBannerActionType.INTERNAL_REDIRECT:
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

    case PopupBannerActionType.EXTERNAL_REDIRECT:
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
