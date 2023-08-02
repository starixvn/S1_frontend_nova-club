import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { P, useResponsiveValue } from 'dripsy'
import { LoginResult, Shield_Action } from 'services/authApi.type'
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
import { TempSettingActions } from 'app/store/tempSetting.slice'

export default function useLoginProcess() {
  const dispatch = useAppDispatch()
  const { t } = useLocalization()
  const { push, replace } = useRouter()
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
    data: LoginResult
  ) {
    dispatch(SettingActions.setCurrentSessionCredential({ username, password }))
    dispatch(TempSettingActions.setSyncShieldActionType(Shield_Action.LOGIN))

    await biometricProcess(username).catch((e) => {
      console.warn('Biometric Process Error', e)
    }) // Once Flow completed, the promise will be resolved

    completeSuccessLoginHandler(data)
  }

  async function completeSuccessLoginHandler(data: LoginResult) {
    dispatch(AuthActions.setAuthInfo(data))
    // useResponsiveValue([push('/'), push('/'), push('/'), undefined, undefined])
    replace('/')
  }

  async function biometricProcess(username: string) {
    return new Promise(async (resolve) => {
      const isBiometricAvailable = await checkBiometricEnabled()
      if (
        isBiometricAvailable &&
        (!biometricCredentials || biometricCredentials.username !== username)
      ) {
        showBiometricDialog(() => resolve(true))
      } else resolve(true)
    })
  }

  const showBiometricDialog = async (callback) => {
    openModal('AlertModal', {
      message: t('biometric.message'),
      actions: [
        {
          label: t('common.cancel'),
          onPress: callback,
        },
        {
          label: t('common.yes'),
          onPress: () => biometricPrompt(callback),
        },
      ],
      persistent: true,
    })
  }

  async function biometricPrompt(callback) {
    const success = await authenticate()

    if (success) {
      console.log('set biometric to true')
      dispatch(SettingActions.toggleBiometricLogin(true))
    }

    callback()
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
    if (success && biometricCredentials) {
      const { username, password } = biometricCredentials
      const resp = await dispatch(
        authApi.endpoints.login.initiate({
          username,
          password,
        })
      )
        .unwrap()
        .catch((e: IResponse<LoginResult>) => {
          showAlert(e.message)
        })

      if (resp) {
        const { data, message } = resp
        if (data) {
          dispatch(
            SettingActions.setCurrentSessionCredential({ username, password })
          )

          completeSuccessLoginHandler(data)
        } else {
          showAlert(message)
        }
      }
    }
  }

  return { handleSuccessLogin }
}
