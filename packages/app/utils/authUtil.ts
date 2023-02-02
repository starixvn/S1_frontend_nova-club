import { LOGOUT_ACTION } from 'app/constant/redux'
import { ModalStackParams } from 'app/provider/modal'
import { store } from 'app/provider/redux/store'
import { modalfy } from 'react-native-modalfy'
import { authApi } from 'services/authApi'

export async function logOut({ isTokenExpired = false } = {}) {
  const { openModal, closeModal } = modalfy<ModalStackParams>()

  try {
    const { playerName } = store.getState().auth.info || {}

    if (playerName && !isTokenExpired) {
      // store.dispatch()
      openModal('LoadingModal')
      await store.dispatch(
        authApi.endpoints.logout.initiate({ username: playerName })
      )
    }

    await store.dispatch({ type: LOGOUT_ACTION })
  } catch (error) {
    console.error(error)
    return error
  } finally {
    closeModal('LoadingModal')
  }
}
