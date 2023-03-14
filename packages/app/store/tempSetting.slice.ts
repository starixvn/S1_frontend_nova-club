import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Shield_Action } from 'services/authApi.type'

interface settingStateProps {
  triggerPopupEvent: boolean
  luckyDrawTriggered: boolean
  syncShieldActionType: Shield_Action
  syncShieldStatus: boolean
}

const initialState: settingStateProps = {
  triggerPopupEvent: true,
  luckyDrawTriggered: false,
  syncShieldActionType: Shield_Action.NONE,
  syncShieldStatus: false,
}

const tempSettingSlice = createSlice({
  name: 'tempSetting',
  initialState,
  reducers: {
    toggleTriggerPopupEvent: (state, action: PayloadAction<boolean>) => {
      state.triggerPopupEvent = action.payload
    },
    setLuckyDrawTriggered: (state, action: PayloadAction<boolean>) => {
      state.luckyDrawTriggered = action.payload
    },
    setSyncShieldActionType: (state, action: PayloadAction<Shield_Action>) => {
      state.syncShieldActionType = action.payload
      state.syncShieldStatus = false
    },
    setSyncShieldStatus: (state, action: PayloadAction<boolean>) => {
      state.syncShieldStatus = action.payload
    },
  },
})

const { actions, reducer } = tempSettingSlice
export const TempSettingActions = actions
export const tempSettingReducer = reducer
