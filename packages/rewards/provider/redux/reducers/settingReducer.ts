import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Currency, LANGUAGE_CODE } from 'utils/constant'

export interface Setting {
  locale: LANGUAGE_CODE
  currency: Currency
}

const initialState: Setting = {
  locale: LANGUAGE_CODE.VIETNAM,
  currency: Currency.VND,
}

const settingSlice = createSlice({
  name: 'setting',
  initialState: initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload as LANGUAGE_CODE
    },
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload
    },
  },
})

const { actions, reducer } = settingSlice
export const SettingActions = actions
export const settingReducer = reducer
