import { store } from 'app/provider/redux/store'
import authApi from 'services/authApi'

export async function logOut() {
  try {
    const { playerName } = store.getState().auth.info || {}
    if (playerName) {
      await store.dispatch(
        authApi.endpoints.logout.initiate({ username: playerName })
      )
    }

    await store.dispatch({ type: 'LOGOUT' })
  } catch (error) {
    console.error(error)
  }
}
