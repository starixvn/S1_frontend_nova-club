import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { tolgee } from 'app/integrations/tolgee'
import { isBannedTrackingCode } from 'app/utils/referralUtil'
import dayjs, { Dayjs } from 'dayjs'
import { Currency, LANGUAGE_CODE } from 'utils/constant'
import {
  CURRENCY_TO_LANGUAGE,
  LANGUAGE_TO_CURRENCY,
} from 'utils/constant/currency'
import { AuthActions } from './authReducer'
import { LaunchGamePayload } from './gameLauncher.slice'

interface PopUpExpire {
  [key: string]: Dayjs | null
}

interface Referral {
  trackingCode: string
  username?: string
}

interface LastSyncShield {
  username: string
  token: string
}

interface Credential {
  username: string
  password: string
}

export interface Setting {
  locale: LANGUAGE_CODE
  currency: Currency
  referral?: Referral
  shieldSessionID?: string
  popUpExpiry: PopUpExpire
  recentGames: LaunchGamePayload[]
  recentGameResources: Record<string, string>
  log?: string
  transferScan: boolean
  platformUUID?: string

  lastSyncShield?: LastSyncShield
  luckyDrawBalance: number
  retentionDrawBalance: number
  suggestions: boolean
  appDownloadSuggestion?: Date
  floatingDrawer: boolean
  currentSessionCredential?: Credential
  biometricCredentials?: Credential
  rememberMeCredentials?: Credential
  agentRememberMeCredentials?: Credential
  tutorialLocation: object | undefined
  triggerPopupTutorial: boolean
  rewardPopup: number
  lastSubscribeUsername: string
}
// export const DomainListHintPostfix = '-DomainListHint'
// export const DepositListHintPostfix = '-DepositListHint'
// export const PromoPopHint = 'PromoPopHint'

const initialState: Setting = {
  locale: LANGUAGE_CODE.VIETNAM,
  currency: Currency.VND,
  popUpExpiry: {},
  recentGames: [],
  recentGameResources: {},
  transferScan: false,
  suggestions: true,
  luckyDrawBalance: 0,
  retentionDrawBalance: 0,
  floatingDrawer: true,
  tutorialLocation: undefined,
  triggerPopupTutorial: true,
  rewardPopup: -1,
  lastSubscribeUsername: '',
}

const settingSlice = createSlice({
  name: 'setting',
  initialState: initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      tolgee.changeLanguage(action.payload)
      state.locale = action.payload as LANGUAGE_CODE

      /* This logic only workable if each currency is using 2 languages, and 1 of them is EN */
      if (state.locale !== LANGUAGE_CODE.ENGLISH) {
        state.currency = LANGUAGE_TO_CURRENCY[state.locale]
      }
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload as Currency
    },
    setLocaleCurrency: (
      state,
      action: PayloadAction<{ locale: LANGUAGE_CODE; currency: Currency }>
    ) => {
      state.currency = action.payload.currency
      state.locale = action.payload.locale
    },
    setPopUpExpiry: (state, action: PayloadAction<string>) => {
      state.popUpExpiry[action.payload] = dayjs().add(1, 'day')
    },
    setShieldSessionID: (state, action: PayloadAction<string>) => {
      state.shieldSessionID = action.payload
    },
    setPlatformUUID: (state, action: PayloadAction<string>) => {
      state.platformUUID = action.payload
    },
    removeReferral: (state) => {
      state.referral = undefined
    },
    setReferral: (state, action: PayloadAction<Referral>) => {
      if (action.payload) {
        /* Ignore this trackingCode, assign empty instead */
        if (isBannedTrackingCode(action.payload.trackingCode)) {
          state.referral = undefined
          return
        }

        state.referral = {
          trackingCode: action.payload.trackingCode?.replace(
            /[^0-9a-zA-Z]/g,
            ''
          ),
          username: action.payload.username ?? state.referral?.username,
        }
      }
    },
    setLog: (state, action: PayloadAction<string>) => {
      state.log = action.payload
    },
    toggleScan: (state, action: PayloadAction<boolean>) => {
      state.transferScan = action.payload
    },
    addRecentGame: (state, action: PayloadAction<LaunchGamePayload>) => {
      const recentGame = action.payload
      if (state.recentGames.length >= 20) {
        state.recentGames.pop()
      }

      const similarGameIndex = state.recentGames.findIndex(
        (g) => g.gc === recentGame.gc && g.gpc === recentGame.gpc
      )

      if (similarGameIndex > -1) state.recentGames.splice(similarGameIndex, 1)

      state.recentGames.unshift(recentGame)
    },
    setCurrentSessionCredential: (state, action: PayloadAction<Credential>) => {
      state.currentSessionCredential = action.payload
    },
    toggleBiometricLogin: (state, action: PayloadAction<boolean>) => {
      state.biometricCredentials == undefined || action.payload
        ? (state.biometricCredentials = state.currentSessionCredential)
        : (state.biometricCredentials = undefined)
    },
    setLastSyncShieldInfo: (state, action: PayloadAction<LastSyncShield>) => {
      state.lastSyncShield = action.payload
    },
    setLuckyDrawBalance: (state, action: PayloadAction<number>) => {
      state.luckyDrawBalance = action.payload
    },
    setRetentionDrawBalance: (state, action: PayloadAction<number>) => {
      state.retentionDrawBalance = action.payload
    },
    disableSuggestions: (state, actions: PayloadAction<boolean>) => {
      state.suggestions = actions.payload
    },
    setAppDownloadSuggestionDate: (state, action: PayloadAction<Date>) => {
      state.appDownloadSuggestion = action.payload
    },
    setFloatingDrawer: (state, action: PayloadAction<boolean>) => {
      state.floatingDrawer = action.payload
    },
    setRememberMe: (state, action: PayloadAction<Credential | undefined>) => {
      action?.payload
        ? (state.rememberMeCredentials = action.payload)
        : (state.rememberMeCredentials = undefined)
    },
    setAgentRememberMe: (
      state,
      action: PayloadAction<Credential | undefined>
    ) => {
      action?.payload
        ? (state.agentRememberMeCredentials = action.payload)
        : (state.agentRememberMeCredentials = undefined)
    },
    toggleTriggerPopupTutorial: (state, action: PayloadAction<boolean>) => {
      state.triggerPopupTutorial = action.payload
    },
    setTutorialLocation: (state, action: PayloadAction<object>) => {
      state.tutorialLocation = action.payload
    },
    toggleRewardPopupSwitch: (state) => {
      state.rewardPopup = state.rewardPopup + 1
    },
    setLastSubscribeUsername: (state, action: PayloadAction<string>) => {
      state.lastSubscribeUsername = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AuthActions.setAuthInfo, (state, action) => {
      const currency = action.payload.currency
      console.log('🚀 ~ builder.addCase ~ currency:', currency)
      return {
        ...state,
        currency: action.payload.currency,
        locale: CURRENCY_TO_LANGUAGE[currency],
      }
    })
    // reset sessionID every restart
    // builder.addCase(REHYDRATE, (state, action) => {
    //   state.shieldSessionID = undefined
    // })
    // builder.addMatcher(
    //   contentApi.endpoints.affiliateUsername.matchFulfilled,
    //   (state, { payload }) => {
    //     if (state.referral && payload.data) {
    //       state.referral.username = payload.data.username
    //     }
    //   }
    // )
    // builder.addCase(GameLauncherActions.launchGame, (state, { payload }) => {})
  },
})

const { actions, reducer } = settingSlice
export const SettingActions = actions
export const settingReducer = reducer
