import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LOGOUT_ACTION } from 'app/constant/redux'
import { LoginResult, Shield_Action } from 'services/authApi.type'
import { ProfileResult } from 'services/playerApi.type'

type TokenType = Pick<LoginResult, 'token'>

export type AuthState = {
  info?: LoginResult
  tokenList?: TokenType[]
  user: ProfileResult | undefined
  isLogoutActionTriggered: boolean
  syncShieldActionType: Shield_Action
  syncShieldStatus: boolean
}

export const authInitialState: AuthState = {
  user: undefined,
  isLogoutActionTriggered: false,
  syncShieldActionType: Shield_Action.NONE,
  syncShieldStatus: false,
}

const playerSlice = createSlice({
  name: 'player',
  initialState: authInitialState,
  reducers: {
    setAuthInfo: (state, action: PayloadAction<LoginResult>) => {
      state.info = action.payload
    },
    setUser: (state, action: PayloadAction<ProfileResult>) => {
      state.user = action.payload
    },
    setIsLogoutActionTriggered: (state, action: PayloadAction<boolean>) => {
      state.isLogoutActionTriggered = action.payload
    },
    setSyncShieldActionType: (state, action: PayloadAction<Shield_Action>) => {
      state.syncShieldActionType = action.payload
    },
    setSyncShieldStatus: (state, action: PayloadAction<boolean>) => {
      state.syncShieldStatus = action.payload
    },
  },
  extraReducers: {
    [LOGOUT_ACTION]: () => {
      return { ...authInitialState, isLogoutActionTriggered: true }
    },
  },
})

const { reducer: authReducer, actions } = playerSlice
export const AuthActions = actions

export default authReducer
