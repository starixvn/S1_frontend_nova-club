import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResult } from 'services/authApi.type'
import { ProfileResult } from 'services/playerApi.type'

type TokenType = Pick<LoginResult, 'token'>

export type AuthState = {
  info?: LoginResult
  tokenList?: TokenType[]
  user: ProfileResult | undefined
}

export const authInitialState: AuthState = {
  user: undefined,
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
  },
  extraReducers: {
    LOGOUT: () => {
      return authInitialState
    },
  },
})

const { reducer: authReducer, actions } = playerSlice
export const PlayerActions = actions

export default authReducer
