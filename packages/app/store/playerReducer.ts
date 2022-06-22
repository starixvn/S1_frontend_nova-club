import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResult } from 'app/services/authApi.type'

type TokenType = Pick<LoginResult, 'token'>

export type PlayerState = {
  currentLoginInfo?: LoginResult
  tokens?: TokenType[]
}

export const playerInitialState: PlayerState = {}

const playerSlice = createSlice({
  name: 'player',
  initialState: playerInitialState,
  reducers: {
    setCurrentLoginInfo: (state, action: PayloadAction<LoginResult>) => {
      state.currentLoginInfo = action.payload
    },
  },
  extraReducers: {
    LOGOUT: () => {
      return playerInitialState
    },
  },
})

const { reducer: playerReducer, actions } = playerSlice
export const PlayerActions = actions

export default playerReducer
