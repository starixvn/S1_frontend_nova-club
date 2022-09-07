import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LANGUAGE_CODE } from 'app/constant/language'
import dayjs, { Dayjs } from 'dayjs'
import contentApi from 'services/contentApi'
import { Game } from 'services/contentApi.type'
import { boolean } from 'yup'
import { GameLauncherActions, LaunchGamePayload } from './gameLauncher.slice'

interface PopUpExpire {
  [key: string]: Dayjs | null
}

interface Referral {
  trackingCode: string
  username?: string
}

export interface Setting {
  locale: LANGUAGE_CODE
  referral?: Referral
  popUpExpiry: PopUpExpire
  recentGames: LaunchGamePayload[]
  recentGameResources: Record<string, string>
  log?: string
  transferScan: boolean
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
    setReferral: (state, action: PayloadAction<Referral>) => {
      if (action.payload) {
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
        state.recentGames.shift()
      }

      const similarGameIndex = state.recentGames.findIndex(
        (g) =>
          g.gameCode === recentGame.gameCode &&
          g.providerCode === recentGame.providerCode
      )

      if (similarGameIndex > -1) state.recentGames.splice(similarGameIndex, 1)

      state.recentGames.unshift(recentGame)
    },
  },
  extraReducers: (builder) => {
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
