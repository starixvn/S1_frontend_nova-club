import { useLazyUserInfoQuery } from 'agent/services/userApi'
import { AgentAuthActions } from 'agent/store/agentAuthReducer'
import useAlert from 'app/hooks/useAlert'
import { useAppDispatch } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { SettingActions } from 'app/store/setting.slice'
import { useResponsiveValue } from 'dripsy'
import { Platform } from 'react-native'
import { useLoginMutation } from 'services/authApi'
import { LoginResult } from 'services/authApi.type'
import { useRouter } from 'solito/router'

type LoginFormValues = {
  username: string
  password: string
}

export default function useAgentLoginProcess() {
  const dispatch = useAppDispatch()
  const { push, replace, back } = useRouter()
  const { showAlert } = useAlert()
  const [getUserInfo] = useLazyUserInfoQuery()

  const isDesktop = useResponsiveValue([false, false, false, true])

  async function handleAgentSuccessLogin(data: LoginResult) {
    dispatch(AgentAuthActions.setAgentAuthToken(data.data.access_token))
    // dispatch(
    //     SettingActions.setAgentRememberMe(
    //       isRememberAgent ? { username, password } : undefined
    //     )
    //   )
    const resp = await getUserInfo().unwrap()
    if (!resp.has_logged_in || !resp.has_otp) {
      Platform.select({
        web: function () {
          replace('/agent/reset-password')
        },
        default: function () {
          back()
          push('/agent/reset-password')
        },
      })()
    } else {
      // navigateAfterLogin('/agent/profile')
      push('/agent/profile')
    }
  }

  return { handleAgentSuccessLogin }
}
