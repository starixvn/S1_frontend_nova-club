import { configureAgentAxios } from 'agent/services/common/agentAxiosInstance'
import { agentLogout } from 'agent/utils/authUtil'
import useResetRTKQState from 'app/hooks/useResetRTKQState'
import { ContextualNavigationContext } from 'app/navigation/contextual/ContextualNavigation'
import { store, useAppSelector } from 'app/provider/redux/store'
import { useCallback, useContext, useEffect } from 'react'
import { Platform } from 'react-native'
import { useRouter } from 'solito/router'

const useOnAgentAppStart = () => {
  const { replace, push } = useRouter()
  const { access_token } = useAppSelector((s) => s.agent) || ''

  const { resetRTKQState } = useResetRTKQState()

  useEffect(() => {
    configureAgentAxios({
      store,
      onTokenExpired: async () => {
        try {
          await agentLogout()

          if (Platform.OS == 'web') {
            replace('/auth/login')
          } else push('/auth/login')

          resetRTKQState()
        } catch (e) {
          console.log(e)
        }
      },
    })
  }, [access_token])
}

export default useOnAgentAppStart
