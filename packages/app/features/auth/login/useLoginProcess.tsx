import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { P, useResponsiveValue } from 'dripsy'
import { LoginResult } from 'services/authApi.type'
import { useRouter } from 'solito/router'
import {
  authenticateAsync,
  hasHardwareAsync,
  isEnrolledAsync,
} from 'expo-local-authentication'
import useLocalization from 'app/provider/localization'
import { useModal } from 'react-native-modalfy'
import { SettingActions } from 'app/store/setting.slice'
import { authApi } from 'services/authApi'
import { IResponse } from 'services/common/types'
import useAlert from 'app/hooks/useAlert'

export default function useLoginProcess() {
  const dispatch = useAppDispatch()
  const { t } = useLocalization()
  const { push } = useRouter()
  const { openModal } = useModal()
  const { showAlert } = useAlert()
  const biometricCredentials = useAppSelector(
    (s) => s.setting.biometricCredentials
  )

  const isDesktop = useResponsiveValue([false, false, false, true])

  async function checkBiometricEnabled() {
    const compatible = await hasHardwareAsync()
    if (compatible) {
      const enrolled = await isEnrolledAsync()
      if (enrolled) return true
    } else return false
    // if (!compatible) throw 'This device is not compatible for biometric authentication'
    // if (!enrolled) throw 'This device doesn't have biometric authentication enabled`
  }

  async function handleSuccessLogin(
    username: string,
    password: string,
    data: LoginResult,
    skipBiometric?: boolean
  ) {
    if (
      skipBiometric ||
      !(await biometricProcess(username, password, () =>
        handleSuccessLogin(username, password, data, true)
      ))
    ) {
      dispatch(AuthActions.setAuthInfo(data))

      if (!isDesktop) {
        push('/')
      }
    }
    // dispatch(TempSettingActions.setSyncShieldActionType(Shield_Action.LOGIN))
  }

  async function biometricProcess(username, password, callback) {
    const isBiometricAvailable = await checkBiometricEnabled()
    if (
      isBiometricAvailable &&
      biometricCredentials &&
      biometricCredentials.username !== username
    ) {
      showBiometricDialog(() =>
        handleSuccessLogin(username, password, callback)
      )
      return true
    }

    return false
  }

  const showBiometricDialog = async (callback) => {
    openModal('AlertModal', {
      message: t('biometric.message'),
      actions: [
        {
          label: t('common.cancel'),
          onPress: callback,
          buttonStyle: { px: 0, minWidth: 120 },
        },
        {
          label: t('common.yes'),
          onPress: () => biometricPrompt(callback),
          buttonStyle: { px: 0, minWidth: 120 },
        },
      ],
      persistent: true,
    })
  }

  async function biometricPrompt(callback) {
    const success = await authenticate()

    callback()
    if (success) {
      dispatch(SettingActions.toggleBiometricLogin(true))
    }
  }

  async function authenticate() {
    const result = await authenticateAsync({
      promptMessage: t('biometric.label'),
      cancelLabel: t('common.cancel'),
      fallbackLabel: 'Fallback',
      disableDeviceFallback: true,
    })

    return result.success
  }

  async function loginWithBiometric() {
    const biometricAvailable = await checkBiometricEnabled()
    if (!biometricAvailable) {
      openModal('AlertModal', { message: t('biometric.notFound') })
      return
    }

    const success = await authenticate()
    if (
      success &&
      biometricCredentials?.username &&
      biometricCredentials?.password
    ) {
      const resp = await dispatch(
        authApi.endpoints.login.initiate({
          username: biometricCredentials?.username,
          password: biometricCredentials?.password,
        })
      )
        .unwrap()
        .catch((e: IResponse<LoginResult>) => {
          showAlert(e.message)
        })

      if (resp) {
        const { data, message } = resp
        if (data) {
          isAgent
            ? handleAgentSuccessLogin(data)
            : handleSuccessLogin(username, password, data)
        } else {
          showAlert(message)
        }
      }
    }
  }

  return { handleSuccessLogin }
}
