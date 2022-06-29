import enhancedWalletApi from 'app/custom_services/walletApi'
import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../provider/redux/store'
import { AuthActions } from '../store/authReducer'

const useResetRTKQ = () => {
  const dispatch = useAppDispatch()
  const isLogoutTriggered = useAppSelector(
    (state) => state.auth.isLogoutActionTriggered
  )

  const clearRTKQState = useCallback(() => {
    if (isLogoutTriggered) {
      dispatch(enhancedWalletApi.util.resetApiState())

      dispatch(AuthActions.setIsLogoutActionTriggered(false))
    }
  }, [dispatch, isLogoutTriggered])

  useEffect(() => {
    clearRTKQState()
  }, [clearRTKQState])
}

export { useResetRTKQ }
