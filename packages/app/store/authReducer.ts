import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResult } from 'app/services/authApi.type'

type AuthInfo = Pick<LoginResult, 'playerName' | 'token'>

interface TokenStates {
  [key: string]: AuthInfo
}

/**
 * Expected structure
 * @example
 * token: {
 *  "testtech01": {
 *    username: "testtech01",
 *    token: "...."
 *  }
 * }
 */
type AuthState = {
  tokens: TokenStates
  currentLoginPlayerName: string
}

const initialState: AuthState = {
  tokens: {},
  currentLoginPlayerName: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthInfo>) => {
      const { playerName } = action.payload

      state.tokens[playerName] = action.payload
      state.currentLoginPlayerName = playerName
    },
  },
  extraReducers: {
    LOGOUT: () => {
      return initialState
    },
  },
})

const { reducer: authReducer, actions } = authSlice
export const AuthActions = actions

export default authReducer
