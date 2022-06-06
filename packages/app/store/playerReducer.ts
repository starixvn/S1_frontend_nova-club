import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResult } from 'app/services/authApi.type'
import { ProfileResult } from 'app/services/playerApi.type'

type TokenType = Pick<LoginResult, 'token'>

type Player = ProfileResult & TokenType

type PlayerState = {
  players: Player[]
  currentLoginUser: Player
  currentLoginInfo: LoginResult
}

const initialState: PlayerState = {
  players: [],
  currentLoginUser: {} as PlayerState['currentLoginUser'],
  currentLoginInfo: { playerName: '', token: '' },
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Player>) => {
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
      return initialState
    },
  },
})

const { reducer: playerReducer, actions } = playerSlice
export const PlayerActions = actions

export default playerReducer
