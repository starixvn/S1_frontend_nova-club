import { useAppDispatch } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { SettingActions } from 'app/store/setting.slice'
import { useRouter } from 'next/router'

export default function useLoginWithToken(
  currentToken?: string,
  skip?: boolean
) {
  const dispatch = useAppDispatch()

  if (!skip) {
    const url = new URLSearchParams(window.location.search)
    const username = url.get('username')
    const token = url.get('t')
    const luckySpin = url.get('spin')

    if (token === currentToken) return false

    if (username && token) {
      dispatch(AuthActions.setAuthInfo({ playerName: username, token }))

      if (luckySpin && Number(luckySpin) > 0) {
        dispatch(SettingActions.setLuckyDrawBalance(1))
      }

      return true
    }
  }

  return false
}
