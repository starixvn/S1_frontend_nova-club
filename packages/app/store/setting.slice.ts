import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LANGUAGE_CODE } from 'app/constant/language'
import { isBannedTrackingCode } from 'app/utils/referralUtil'
import dayjs, { Dayjs } from 'dayjs'
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

export interface Setting {
  locale: LANGUAGE_CODE
  referral?: Referral
  shieldSessionID?: string
  popUpExpiry: PopUpExpire
  recentGames: LaunchGamePayload[]
  recentGameResources: Record<string, string>
  log?: string
  transferScan: boolean
  platformUUID?: string
  currentSession: {
    username: string
    password: string
  }
  biometricCredentials: {
    username?: string
    password?: string
  } | null
  lastSyncShield?: LastSyncShield
  luckyDrawBalance: number
  suggestions: boolean
  appDownloadSuggestion?: Date
  rememberMeCredentials: {
    username?: string
    password?: string
  } | null
}
// export const DomainListHintPostfix = '-DomainListHint'
// export const DepositListHintPostfix = '-DepositListHint'
// export const PromoPopHint = 'PromoPopHint'

const initialState: Setting = {
  locale: LANGUAGE_CODE.VIETNAM,
  popUpExpiry: {},
  recentGames: [],
  recentGameResources: {},
  transferScan: false,
  currentSession: {},
  biometricCredentials: null,
  suggestions: true,
  luckyDrawBalance: 0,
  rememberMeCredentials: null,
}

const settingSlice = createSlice({
  name: 'setting',
  initialState: initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload as LANGUAGE_CODE
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
    toogleScan: (state, action: PayloadAction<boolean>) => {
      state.transferScan = action.payload
    },
    addRecentGame: (state, action: PayloadAction<LaunchGamePayload>) => {
      const recentGame = action.payload
      if (state.recentGames.length >= 20) {
        state.recentGames.pop()
      }

      const similarGameIndex = state.recentGames.findIndex(
        (g) =>
          g.gameCode === recentGame.gameCode &&
          g.providerCode === recentGame.providerCode
      )

      if (similarGameIndex > -1) state.recentGames.splice(similarGameIndex, 1)

      state.recentGames.unshift(recentGame)
    },
    addCredentials: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.currentSession.username = action.payload.username
      state.currentSession.password = action.payload.password
    },
    toogleBiometricLogin: (state, action: PayloadAction<boolean>) => {
      state.biometricCredentials === null || action.payload
        ? (state.biometricCredentials = state.currentSession)
        : (state.biometricCredentials = null)
    },
    setLastSyncShieldInfo: (state, action: PayloadAction<LastSyncShield>) => {
      state.lastSyncShield = action.payload
    },
    setLuckyDrawBalance: (state, action: PayloadAction<number>) => {
      state.luckyDrawBalance = action.payload
    },
    disableSuggestions: (state, actions: PayloadAction<boolean>) => {
      state.suggestions = actions.payload
    },
    setAppDownloadSuggestionDate: (state, action: PayloadAction<Date>) => {
      state.appDownloadSuggestion = action.payload
    },
    setRememberMe: (
      state,
      action: PayloadAction<{ username: string; password: string } | undefined>
    ) => {
      action?.payload
        ? (state.rememberMeCredentials = action.payload)
        : (state.rememberMeCredentials = null)
    },
  },
  extraReducers: (builder) => {
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
