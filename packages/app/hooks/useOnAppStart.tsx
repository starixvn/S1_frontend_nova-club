import { store, useAppSelector } from 'app/provider/redux/store'
// import { logOut } from 'app/utils/authUtil'
import { useCallback, useEffect, useRef } from 'react'
import { Platform } from 'react-native'

// import useResetRTKQState from './useResetRTKQState'
import { useRouter } from 'solito/router'
import { configureAxios } from '../../services/common/axiosInstance'

const useOnAppStart = () => {
  const { replace, push } = useRouter()
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const isLogoutTriggered = useRef(false)

  // const { resetRTKQState } = useResetRTKQState()

  const redirectToLoginPage = useCallback(() => {}, [replace])

  useEffect(() => {
    configureAxios({
      store,
      onTokenExpired: async () => {
        try {
          if (token && !isLogoutTriggered.current) {
            isLogoutTriggered.current = true

            // await logOut({
            //   isTokenExpired: true,
            // })

            if (Platform.OS === 'web') {
              replace('/')
            } else {
              // clear()
              replace('/')
              // setTimeout(() => push('/auth/login'), 500)
            }

            // setTimeout(resetRTKQState, 1000)
          }
        } catch (error) {
          console.log(error)
        } finally {
          isLogoutTriggered.current = false
        }
      },
    })
  }, [redirectToLoginPage, token])
}

export default useOnAppStart
