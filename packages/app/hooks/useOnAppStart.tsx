import { ContextualNavigationContext } from 'app/navigation/web/ContextualNavigation'
import { store, useAppSelector } from 'app/provider/redux/store'
import { logOut } from 'app/utils/authUtil'
import { useCallback, useContext, useEffect, useRef } from 'react'
import { Platform } from 'react-native'
import { configureAxios } from 'services/common/axiosInstance'
import { useRouter } from 'solito/router'
import useResetRTKQState from './useResetRTKQState'

const useOnAppStart = () => {
  const { replace } = useRouter()
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const isLogoutTriggered = useRef(false)

  const { stacks, clear: clearNavigationStack } = useContext(
    ContextualNavigationContext
  )
  const { resetRTKQState } = useResetRTKQState()

  const redirectToLoginPage = useCallback(() => {
    replace('/auth/login')

    if (stacks.length > 0) {
      clearNavigationStack()
    }
  }, [clearNavigationStack, replace, stacks.length])

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

            redirectToLoginPage()

            if (Platform.OS == 'web') {
              resetRTKQState()
            }
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
