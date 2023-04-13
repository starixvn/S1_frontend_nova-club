import { AgentAuthActions } from 'agent/store/agentAuthReducer'
import { store } from 'app/provider/redux/store'

export const HAS_LOG_IN_MAP = {
  FIRST_TIME_LOGIN: 0,
  HAS_LOGIN_BEFORE: 1,
} as const

export async function agentLogout() {
  try {
    await store.dispatch(AgentAuthActions.setAgentAuthToken())
  } catch (e) {
    console.log(e)
    return e
  }
}
