import { useAppDispatch } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { useResponsiveValue } from 'dripsy'
import { LoginResult } from 'services/authApi.type'
import { useRouter } from 'solito/router'

export default function useLoginProcess() {
  const dispatch = useAppDispatch()
  const { push } = useRouter()

  const isDesktop = useResponsiveValue([false, false, false, true])

  async function handleSuccessLogin(username, password, data: LoginResult) {
    dispatch(AuthActions.setAuthInfo(data))

    if (!isDesktop) {
      push('/')
    }
    // dispatch(TempSettingActions.setSyncShieldActionType(Shield_Action.LOGIN))
  }

  return { handleSuccessLogin }
}
