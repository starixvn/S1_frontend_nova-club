import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Currency } from 'utils/constant'

// type PartialLoginResult = Pick<LoginResult, 'access_token' | 'token_type'>

interface AgentAuthState {
  access_token?: string
  has_logged_in?: number
  has_otp?: 0 | 1
  currency: Currency
}

const agentAuthInitialState: AgentAuthState = {
  access_token: undefined,
  has_logged_in: undefined,
  has_otp: undefined,
  currency: Currency.VND,
  // token_type: undefined,
}

export const agentSlice = createSlice({
  name: 'agent',
  initialState: agentAuthInitialState,
  reducers: {
    setAgentAuthToken: (state, action: PayloadAction<string | undefined>) => {
      state.access_token = action.payload
      // state.token_type = action.payload.token_type
    },
    setAgentHasLoginBefore: (
      state,
      action: PayloadAction<
        | boolean
        | {
            has_logged_in: AgentAuthState['has_logged_in']
            has_otp: AgentAuthState['has_otp']
          }
      >
    ) => {
      const payload = action.payload

      if (typeof payload === 'boolean') {
        if (payload) {
          state.has_logged_in = 1
          state.has_otp = 1
        } else {
          state.has_logged_in = 0
          state.has_otp = 0
        }

        return
      }

      state.has_logged_in = payload.has_logged_in
      state.has_otp = payload.has_otp
    },
    setAgentCurrency: (s, action: PayloadAction<Currency>) => {
      s.currency = action.payload
    },
  },
})

const { reducer: agentAuthReducer, actions } = agentSlice
export const AgentAuthActions = actions

export default agentAuthReducer
