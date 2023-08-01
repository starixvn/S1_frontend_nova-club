import { store, useAppSelector } from 'app/provider/redux/store'
import { LogOut } from 'app/utils/authUtil'
import { useCallback, useEffect, useRef } from 'react'
import { Platform } from 'react-native'
import { useRouter } from 'solito/router'
import { configureAxios } from '../../services/common/axiosInstance'
import useResetRTKQState from './useResetRTKQState'

const useOnAppStart = () => {
  const { replace, push } = useRouter()
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const isLogoutTriggered = useRef(false)

  const { resetRTKQState } = useResetRTKQState()

  const redirectToLoginPage = useCallback(() => {}, [])
  //temporary replacement for RTKQ reset
  // const dispatch = useAppDispatch()

  useEffect(() => {
    configureAxios({
      store,
      onTokenExpired: async () => {
        try {
          if (token && !isLogoutTriggered.current) {
            isLogoutTriggered.current = true

            await LogOut({
              isTokenExpired: true,
            })

            if (Platform.OS === 'web') {
              replace('/')
            } else {
              // clear()
              console.log('logout')
              replace('/')
              setTimeout(() => push('/auth/login'), 500)
            }

            setTimeout(resetRTKQState, 1000)
          }
        } catch (error) {
          // dispatch(AuthActions.setAuthInfo(undefined))

          console.log(error)
        } finally {
          isLogoutTriggered.current = false
        }
      },
    })
  }, [redirectToLoginPage, token, resetRTKQState])
}

export default useOnAppStart
