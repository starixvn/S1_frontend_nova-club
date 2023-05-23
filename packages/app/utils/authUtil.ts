import { ModalStackParams } from 'app/provider/modal'
import { store } from 'app/provider/redux/store'
import { modalfy } from 'react-native-modalfy'
import { authApi } from 'services/authApi'
import { LOGOUT_ACTION } from './constant'
import { useRouter } from 'solito/router'

export async function LogOut({ isTokenExpired = false } = {}) {
  // const { replace } = useRouter()
  try {
    const { playerName } = store.getState().auth.info || {}

    // if (playerName && !isTokenExpired) {
    //   // store.dispatch()
    //   await store.dispatch(
    //     authApi.endpoints.logout.initiate({ username: playerName })
    //   )
    // }

    await store.dispatch({ type: LOGOUT_ACTION })
    // replace('/')
  } catch (error) {
    console.error(error)
    return error
  } finally {
  }
}
