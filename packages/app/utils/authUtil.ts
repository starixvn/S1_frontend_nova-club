import { ModalStackParams } from 'app/provider/modal'
import { store } from 'app/provider/redux/store'
import { modalfy } from 'react-native-modalfy'
import { authApi } from 'services/authApi'
import { contentApi } from 'services/contentApi'
import { LOGOUT_ACTION } from 'utils/constant'

export async function LogOut({ isTokenExpired = false } = {}) {
  const { openModal, closeModal } = modalfy<ModalStackParams>()

  try {
    const { playerName } = store.getState().auth.info || {}

    if (playerName && !isTokenExpired) {
      // store.dispatch()
      await store.dispatch(
        authApi.endpoints.logout.initiate({ username: playerName })
      )
    }

    await store.dispatch({ type: LOGOUT_ACTION })
    // replace('/')
    setTimeout(() => {
      // store.dispatch(contentApi.endpoints.getRecoMatch.initiate())
      store.dispatch(contentApi.endpoints.banner.initiate())
      // store.dispatch(contentApi.endpoints.getJackpotAmount.initiate())
    }, 3000)
  } catch (error) {
    console.error(error)
    return error
  } finally {
    closeModal('LoadingModal')
  }
}
