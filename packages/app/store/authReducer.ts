import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LoginResult } from '../../services/authApi.type'
import { ProfileResult } from '../../services/playerApi.type'
import { LOGOUT_ACTION } from 'utils/constant'
import { logEvent, setGAUser } from 'app/integrations/analytic'

import { REHYDRATE } from 'redux-persist'
import { RootState } from 'app/provider/redux/store'
import { GAEvents } from 'app/integrations/analytic/events'

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
      setGAUser(action.payload.playerName)
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
      setGAUser()
      return { ...authInitialState, isLogoutActionTriggered: true }
    })
    builder.addCase(REHYDRATE, (state, action) => {
      setTimeout(() => {
        setGAUser(action.payload?.auth?.info?.playerName)
      }, 100)
    })
  },
})

const { reducer: authReducer, actions } = playerSlice
export const AuthActions = actions

export default authReducer
