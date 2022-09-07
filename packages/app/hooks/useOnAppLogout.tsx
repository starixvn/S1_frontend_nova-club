import { ContextualNavigationContext } from 'app/navigation/web/ContextualNavigation'
import { logOut } from 'app/utils/authUtil'
import { useContext } from 'react'
import { Platform } from 'react-native'
import { useRouter } from 'solito/router'
import useResetRTKQState from './useResetRTKQState'

const useOnAppLogout = () => {
  const { replace } = useRouter()
  const { clear: clearNavigationStack } = useContext(
    ContextualNavigationContext
  )
  const { resetRTKQState } = useResetRTKQState()

  const logout = async () => {
    try {
      await logOut()
      replace('/auth/login')

      if (Platform.OS === 'web') {
        clearNavigationStack()
        resetRTKQState()
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    logout,
  }
}

export default useOnAppLogout
