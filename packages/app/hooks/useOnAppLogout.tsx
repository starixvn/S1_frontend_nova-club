import { LogOut } from 'app/utils/authUtil'
import { Platform } from 'react-native'
import useResetRTKQState from './useResetRTKQState'
import { useRouter } from 'solito/router'
const useOnAppLogout = () => {
  const { replace, push } = useRouter()
  const { resetRTKQState } = useResetRTKQState()
  const logout = async () => {
    try {
      await LogOut()
      console.log('loggingOut...')
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
