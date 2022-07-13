import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LANGUAGE_CODE } from 'app/constant/language'
import dayjs, { Dayjs } from 'dayjs'
import contentApi from 'services/contentApi'

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
}
// export const DomainListHintPostfix = '-DomainListHint'
// export const DepositListHintPostfix = '-DepositListHint'
// export const PromoPopHint = 'PromoPopHint'

const initialState: Setting = {
  locale: LANGUAGE_CODE.VIETNAM,
  popUpExpiry: {},
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
      state.referral = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      contentApi.endpoints.affiliateUsername.matchFulfilled,
      (state, { payload }) => {
        if (state.referral && payload.data) {
          state.referral.username = payload.data.username
        }
      }
    )
  },
})

const { actions, reducer } = settingSlice
export const SettingActions = actions
export const settingReducer = reducer
