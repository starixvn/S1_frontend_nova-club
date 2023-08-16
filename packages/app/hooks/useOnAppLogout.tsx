import { LogOut } from 'app/utils/authUtil'
import { useRouter } from 'solito/router'
import useIsDesktop from './useIsDesktop'
import useResetRTKQState from './useResetRTKQState'
const useOnAppLogout = () => {
  const { replace, push } = useRouter()
  const { resetRTKQState } = useResetRTKQState()
  const desktop = useIsDesktop()
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
