import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Platform } from 'react-native'
import { Game } from 'services/gameApi.type'

export type LaunchGamePayload = Partial<Omit<Game, 'img' | 'xImg'>> & {
  img: { [key: string]: string }
  xImg?: { [key: string]: string }
  desktopMode?: boolean
  params?: Record<string, string> // Params will turn to query parameters, it must be casted to string
}
export type GameLauncherState = LaunchGamePayload & {
  lastLaunchedProvider?: string
}
// export const DomainListHintPostfix = '-DomainListHint'
// export const DepositListHintPostfix = '-DepositListHint'
// export const PromoPopHint = 'PromoPopHint'

const initialState: GameLauncherState = {}

const gameLauncherSlice = createSlice({
  name: 'gameLauncher',
  initialState: initialState,
  reducers: {
    launchGame: (state, action: PayloadAction<LaunchGamePayload>) => {
      /* Open window must be executed before any await, to prevent pop up blocker on Mobile browser */
      if (Platform.OS === 'web') {
        if (!window.gameWindow || window.gameWindow.closed) {
          window.gameWindow = window.open('/launcher')
        }
      }

      Object.assign(state, action.payload, {
        lastLaunchedProvider: action.payload.gpc,
      })
    },
    reset: (state) => {
      return {
        ...initialState,
        lastLaunchedProvider: state.lastLaunchedProvider,
      }
    },
  },
})

const { actions, reducer } = gameLauncherSlice
export const GameLauncherActions = actions
export const gameLauncherReducer = reducer
