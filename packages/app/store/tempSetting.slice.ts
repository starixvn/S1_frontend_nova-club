import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Shield_Action } from 'services/authApi.type'

interface settingStateProps {
  syncShieldActionType: Shield_Action
  syncShieldStatus: boolean
  splashScreenLoaded: boolean
  isHomeEventModalTriggered: boolean
}

const initialState: settingStateProps = {
  syncShieldActionType: Shield_Action.NONE,
  syncShieldStatus: false,
  splashScreenLoaded: false,
  isHomeEventModalTriggered: false,
}

const tempSettingSlice = createSlice({
  name: 'tempSetting',
  initialState,
  reducers: {
    setModalTriggered: (state, action) => {
      // state.homeModalTriggeredCache = {
      //   ...state.homeModalTriggeredCache,
      //   ...Object(action.payload),
      // }
    },
    setIsHomeEventModalTriggered: (state, action: PayloadAction<boolean>) => {
      state.isHomeEventModalTriggered = action.payload
    },
    setSyncShieldActionType: (state, action: PayloadAction<Shield_Action>) => {
      state.syncShieldActionType = action.payload
      state.syncShieldStatus = false
    },
    setSyncShieldStatus: (state, action: PayloadAction<boolean>) => {
      state.syncShieldStatus = action.payload
    },
    setSplashScreenLoaded: (state, action: PayloadAction<boolean>) => {
      state.splashScreenLoaded = action.payload
    },
  },
})

const { actions, reducer } = tempSettingSlice
export const TempSettingActions = actions
export const tempSettingReducer = reducer
