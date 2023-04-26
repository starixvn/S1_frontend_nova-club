import { AgentAuthActions } from 'agent/store/agentAuthReducer'
import { store } from 'app/provider/redux/store'

export async function agentLogout() {
  try {
    await store.dispatch(AgentAuthActions.setAgentAuthToken())
  } catch (e) {
    console.log(e)
    return e
  }
}
