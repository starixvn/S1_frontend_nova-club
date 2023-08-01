import { LogOut } from 'app/utils/authUtil'
import { Platform } from 'react-native'
import useResetRTKQState from './useResetRTKQState'
import { useRouter } from 'solito/router'
import isDesktop from 'app/utils/isDesktop'
const useOnAppLogout = () => {
  const { replace, push } = useRouter()
  const { resetRTKQState } = useResetRTKQState()
  const desktop = isDesktop()
  const logout = async () => {
    try {
      await LogOut()
      console.log('loggingOut...')
      if (desktop) {
        replace('/')
      } else {
        push('/auth/login')
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
