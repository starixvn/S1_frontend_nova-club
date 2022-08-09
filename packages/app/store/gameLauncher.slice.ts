import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GAME_TYPE_CODE } from 'app/utils/constant'

export interface LaunchGamePayload {
  gameCode?: string
  providerCode?: string
  gameName?: string
  desktopMode?: boolean
  image?: string
  gameType?: GAME_TYPE_CODE
}
export type GameLauncherState = LaunchGamePayload & {}
// export const DomainListHintPostfix = '-DomainListHint'
// export const DepositListHintPostfix = '-DepositListHint'
// export const PromoPopHint = 'PromoPopHint'

const initialState: GameLauncherState = {}

const gameLauncherSlice = createSlice({
  name: 'gameLauncher',
  initialState: initialState,
  reducers: {
    launchGame: (state, action: PayloadAction<LaunchGamePayload>) => {
      Object.assign(state, action.payload)
    },
    reset: () => {
      return initialState
    },
  },
})

const { actions, reducer } = gameLauncherSlice
export const GameLauncherActions = actions
export const gameLauncherReducer = reducer
