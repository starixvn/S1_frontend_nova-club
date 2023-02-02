import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { store, useAppSelector } from 'app/provider/redux/store'
import { logOut } from 'app/utils/authUtil'
import { useCallback, useEffect, useRef } from 'react'
import { Platform } from 'react-native'
import { configureAxios } from 'services/common/axiosInstance'
import useResetRTKQState from './useResetRTKQState'

const useOnAppStart = () => {
  const { replace, clear, push } = useContextualRouter()
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const isLogoutTriggered = useRef(false)

  const { resetRTKQState } = useResetRTKQState()

  const redirectToLoginPage = useCallback(() => {}, [replace])

  useEffect(() => {
    configureAxios({
      store,
      onTokenExpired: async () => {
        try {
          if (token && !isLogoutTriggered.current) {
            isLogoutTriggered.current = true

            await logOut({
              isTokenExpired: true,
            })

            if (Platform.OS === 'web') {
              replace('/auth/login')
            } else {
              clear()
              push('/auth/login')
              // setTimeout(() => push('/auth/login'), 500)
            }

            setTimeout(resetRTKQState, 1000)
          }
        } catch (error) {
          console.log(error)
        } finally {
          isLogoutTriggered.current = false
        }
      },
    })
  }, [redirectToLoginPage, resetRTKQState, token])
}

export default useOnAppStart
