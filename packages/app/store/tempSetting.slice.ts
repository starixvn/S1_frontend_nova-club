import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Shield_Action } from 'services/authApi.type'

interface settingStateProps {
  showPrediction: boolean
  luckyDrawTriggered: boolean
  syncShieldActionType: Shield_Action
  syncShieldStatus: boolean
}

const initialState: settingStateProps = {
  showPrediction: true,
  luckyDrawTriggered: false,
  syncShieldActionType: Shield_Action.NONE,
  syncShieldStatus: false,
}

const tempSettingSlice = createSlice({
  name: 'tempSetting',
  initialState,
  reducers: {
    toggleShowPrediction: (state, action: PayloadAction<boolean>) => {
      state.showPrediction = action.payload
    },
    setLuckyDrawTriggered: (state, action: PayloadAction<boolean>) => {
      state.luckyDrawTriggered = action.payload
    },
    setSyncShieldActionType: (state, action: PayloadAction<Shield_Action>) => {
      state.syncShieldActionType = action.payload
    },
    setSyncShieldStatus: (state, action: PayloadAction<boolean>) => {
      state.syncShieldStatus = action.payload
    },
  },
})

const { actions, reducer } = tempSettingSlice
export const TempSettingActions = actions
export const tempSettingReducer = reducer
