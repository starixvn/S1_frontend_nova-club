import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LANGUAGE_CODE } from 'app/constant/language'
import dayjs, { Dayjs } from 'dayjs'

interface PopUpExpire {
  [key: string]: Dayjs | null
}

export interface Setting {
  locale: LANGUAGE_CODE
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
  },
})

const { actions, reducer } = settingSlice
export const SettingActions = actions
export const settingReducer = reducer
