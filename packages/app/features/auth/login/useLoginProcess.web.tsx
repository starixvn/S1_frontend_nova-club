import { useAppDispatch } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { SettingActions } from 'app/store/setting.slice'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { LoginResult, Shield_Action } from 'services/authApi.type'
import { useRouter } from 'solito/router'

export default function useLoginProcess() {
  const dispatch = useAppDispatch()
  const { push } = useRouter()

  async function handleSuccessLogin(username, password, data: LoginResult) {
    dispatch(AuthActions.setAuthInfo(data))
    dispatch(TempSettingActions.setIsFloatingMysteryVisible(true))
    dispatch(TempSettingActions.setIsFloatingEuroCupVisible(true))

    push('/')

    dispatch(TempSettingActions.setSyncShieldActionType(Shield_Action.LOGIN))
  }

  return { handleSuccessLogin }
}
