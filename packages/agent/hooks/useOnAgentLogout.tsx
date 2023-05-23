import { agentBaseApi } from 'agent/services/agentBaseApi'
import { AgentAuthActions } from 'agent/store/agentAuthReducer'
import { LoginType } from 'app/features/auth/type'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import { sleep } from 'utils/common'

const useOnAgentLogout = () => {
  const { replace, push } = useContextualRouter()
  const dispatch = useDispatch()

  const logout = async () => {
    try {
      if (Platform.OS === 'web') {
        replace('/')
      } else {
        push('/')
      }
      setTimeout(() => {
        dispatch(AgentAuthActions.setAgentAuthToken())
        dispatch(AgentAuthActions.setAgentHasLoginBefore(false))
        clearRTK()
      }, 0)
      sleep(1500)
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
