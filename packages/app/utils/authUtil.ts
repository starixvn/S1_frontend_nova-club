import { LOGOUT_ACTION } from 'app/constant/redux'
import { store } from 'app/provider/redux/store'
import authApi from 'services/authApi'

export async function logOut({ isTokenExpired = false } = {}) {
  try {
    const { playerName } = store.getState().auth.info || {}

    if (playerName && !isTokenExpired) {
      await store.dispatch(
        authApi.endpoints.logout.initiate({ username: playerName })
      )
    }

    await store.dispatch({ type: LOGOUT_ACTION })
  } catch (error) {
    console.error(error)
  }
}
