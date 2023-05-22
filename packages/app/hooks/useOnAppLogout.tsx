import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { logOut } from 'app/utils/authUtil'
import { Platform } from 'react-native'
import useResetRTKQState from './useResetRTKQState'

const useOnAppLogout = () => {
  const { replace, push } = useContextualRouter()
  const { resetRTKQState } = useResetRTKQState()

  const logout = async () => {
    try {
      await logOut()

      if (Platform.OS === 'web') {
        replace('/')
      } else {
        push('/')
      }

      setTimeout(resetRTKQState, 1000)
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
