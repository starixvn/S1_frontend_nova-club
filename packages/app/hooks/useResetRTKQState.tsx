import { useCallback } from 'react'
import authApi from 'services/authApi'
import bankApi from 'services/bank'
import contentApi from 'services/contentApi'
import playerApi from 'services/playerApi'
import walletApi from 'services/walletApi'
import { useAppDispatch } from '../provider/redux/store'

const useResetRTKQState = () => {
  const dispatch = useAppDispatch()

  const resetRTKQState = useCallback(() => {
    dispatch(walletApi.util.resetApiState())
    dispatch(playerApi.util.resetApiState())
    dispatch(authApi.util.resetApiState())
    dispatch(bankApi.util.resetApiState())
    dispatch(contentApi.util.resetApiState())
  }, [dispatch])

  return {
    resetRTKQState,
  }
}

export default useResetRTKQState
