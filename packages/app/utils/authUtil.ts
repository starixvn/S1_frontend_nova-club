import { store } from 'app/provider/redux/store'
import authApi from 'app/services/authApi'

export async function logOut() {
  try {
    const username = store.getState().auth.currentLoginPlayerName
    await store.dispatch(authApi.endpoints.logout.initiate({ username }))

    await store.dispatch({ type: 'LOGOUT' })
  } catch (error) {
    console.error(error)
  }
}
