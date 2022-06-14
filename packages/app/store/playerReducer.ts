import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { LoginResult } from 'app/services/authApi.type'
import { ProfileResult } from 'app/services/playerApi.type'

type TokenType = Pick<LoginResult, 'token'>

export type PlayerState = {
  players: ProfileResult[]
  currentLoginUser?: ProfileResult
  currentLoginInfo?: LoginResult
  tokens?: TokenType[]
}

export const playerInitialState: PlayerState = {
  players: [],
}

const playerSlice = createSlice({
  name: 'player',
  initialState: playerInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<ProfileResult>) => {
      const currentPlayer = action.payload

      state.players = [...state.players, currentPlayer]
      state.currentLoginUser = currentPlayer
    },
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
