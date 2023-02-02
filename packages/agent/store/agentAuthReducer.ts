import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResult } from 'agent/services/authApi.type'

// type PartialLoginResult = Pick<LoginResult, 'access_token' | 'token_type'>

interface AgentAuthState {
  access_token?: string
}

const agentAuthInitialState: AgentAuthState = {
  access_token: undefined,
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
  },
})

const { reducer: agentAuthReducer, actions } = agentSlice
export const AgentAuthActions = actions

export default agentAuthReducer
