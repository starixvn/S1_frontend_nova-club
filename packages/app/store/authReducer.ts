import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResult } from 'app/services/authApi.type'

type TokenType = Pick<LoginResult, 'token'>

export type AuthState = {
  info?: LoginResult
  tokenList?: TokenType[]
}

export const authInitialState: AuthState = {}

const playerSlice = createSlice({
  name: 'player',
  initialState: authInitialState,
  reducers: {
    setAuthInfo: (state, action: PayloadAction<LoginResult>) => {
      state.info = action.payload
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
