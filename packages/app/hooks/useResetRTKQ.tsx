import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../provider/redux/store'
import { AuthActions } from '../store/authReducer'
import walletApi from 'services/walletApi'

const useResetRTKQ = () => {
  const dispatch = useAppDispatch()
  const isLogoutTriggered = useAppSelector(
    (state) => state.auth.isLogoutActionTriggered
  )

  const clearRTKQState = useCallback(() => {
    if (isLogoutTriggered) {
      dispatch(walletApi.util.resetApiState())

      dispatch(AuthActions.setIsLogoutActionTriggered(false))
    }
  }, [dispatch, isLogoutTriggered])

  useEffect(() => {
    clearRTKQState()
  }, [clearRTKQState])
}

export { useResetRTKQ }
