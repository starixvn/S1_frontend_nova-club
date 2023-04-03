import { agentBaseApi } from 'agent/services/agentBaseApi'
import { AgentAuthActions } from 'agent/store/agentAuthReducer'
import { LoginType } from 'app/features/auth/type'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { useDispatch } from 'react-redux'
import { sleep } from 'utils/common'

const useOnAgentLogout = () => {
  const { replace } = useContextualRouter()
  const dispatch = useDispatch()

  const logout = async () => {
    try {
      replace('/auth/login', {
        t: LoginType.Agent,
      })
      await sleep(1500)
      dispatch(AgentAuthActions.setAgentAuthToken())
      clearRTK()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  function clearRTK() {
    dispatch(agentBaseApi.util.resetApiState())
  }

  return {
    logout,
  }
}

export default useOnAgentLogout
