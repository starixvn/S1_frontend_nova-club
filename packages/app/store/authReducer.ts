import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LoginResult } from '../../services/authApi.type'
import { ProfileResult } from '../../services/playerApi.type'
import { LOGOUT_ACTION } from 'utils/constant'

type TokenType = Pick<LoginResult, 'token'>

export type AuthState = {
  info?: LoginResult
  tokenList?: TokenType[]
  user: ProfileResult | undefined
  isLogoutActionTriggered: boolean
}

export const authInitialState: AuthState = {
  user: undefined,
  isLogoutActionTriggered: false,
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
    
  },
  extraReducers: (builder) => {
    builder.addCase(LOGOUT_ACTION, (state, action) => {
      return { ...authInitialState, isLogoutActionTriggered: true }
    })
  },
})

const { reducer: authReducer, actions } = playerSlice
export const AuthActions = actions

export default authReducer
