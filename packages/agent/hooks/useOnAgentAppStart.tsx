import { configureAgentAxios } from 'agent/services/common/agentAxiosInstance'
import { store, useAppSelector } from 'app/provider/redux/store'
import { useEffect } from 'react'
import useOnAgentLogout from './useOnAgentLogout'

const useOnAgentAppStart = () => {
  const { access_token } = useAppSelector((s) => s.agent) || ''
  const { logout } = useOnAgentLogout()

  useEffect(() => {
    configureAgentAxios({
      store,
      onTokenExpired: async () => {
        logout()
      },
    })
  }, [access_token])
}

export default useOnAgentAppStart
