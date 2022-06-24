import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LANGUAGE_CODE } from 'app/constant/language'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'

export interface LaunchGamePayload {
  gameCode?: string
  providerCode?: string
  gameName?: string
  context?: ContextualModuleKey
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
