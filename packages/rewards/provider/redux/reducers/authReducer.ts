import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoginResult } from 'services/authApi.type'

export type AuthState = {
  info?: LoginResult
}

export const authInitialState: AuthState = {}

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuthInfo: (state, action: PayloadAction<LoginResult>) => {
      state.info = action.payload
    },
  },
})

const { reducer: authReducer, actions } = authSlice
export const AuthActions = actions

export default authReducer
