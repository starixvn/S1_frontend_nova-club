import { store } from 'app/provider/redux/store'
import authApi from 'app/services/authApi'

export async function logOut() {
  try {
    const { playerName } = store.getState().player.currentLoginInfo || {}
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
