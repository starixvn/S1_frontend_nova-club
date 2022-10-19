import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { SettingActions } from 'app/store/setting.slice'
import * as LocalAuthentication from 'expo-local-authentication'
import { useEffect, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from 'services/authApi'
import { useRouter } from 'solito/router'

const useBioAuth = () => {
  // wherever the useState is located
  const dispatch = useDispatch()
  const { t } = useLocalization()
  const [login] = useLoginMutation()
  const { replace } = useRouter()

  const { openModal } = useModal()
  const [isBioLoading, setIsBioLoading] = useState(false)
  const [isBiometricHardware, setIsBiometricHardware] = useState(false)
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false)
  const isBiometricSupported = isBiometricHardware && isBiometricEnabled

  const username = useAppSelector((s) => s.setting.username)
  const password = useAppSelector((s) => s.setting.password)
  const isCredentialsSaved = !!username && !!password

  useEffect(() => {
    checkBiometricSupported()
  }, [])

  const checkBiometricSupported = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    setIsBiometricHardware(compatible)

    checkBiometricEnabled()
  }

  const checkBiometricEnabled = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync()
    setIsBiometricEnabled(savedBiometrics)

    return savedBiometrics
  }

  const authentication = async () => {
    if (!checkBiometricEnabled()) {
      setTimeout(() => {
        openModal('AlertModal', { message: t('biometric.notFound') })
      }, 500)
    } else {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: t('biometric.label'),
        cancelLabel: t('common.cancel'),
        fallbackLabel: 'Fallback',
        disableDeviceFallback: true,
      })

      return biometricAuth.success
    }
  }

  const startBiometricLogin = async () => {
    const result = await authentication()

    if (result) {
      try {
        setIsBioLoading(true)

        const { data, success, message } = await login({
          username,
          password,
        }).unwrap()

        if (success && data) {
          dispatch(AuthActions.setAuthInfo(data))

          replace('/')
        } else {
          throw new Error(message)
        }
      } catch (error) {
        console.log(
          '🚀 ~ file: useBioAuth.tsx ~ line 84 ~ startBiometricLogin ~ error',
          error
        )
      } finally {
        setIsBioLoading(false)
      }
    }
  }

  const enableBiometricDialog = async (username, password, callback) => {
    openModal('AlertModal', {
      message: t('biometric.message'),
      actions: [
        {
          label: t('common.cancel'),
          onPress: callback,
        },
        {
          label: t('common.yes'),
          onPress: () => storeCredentials(username, password, callback),
        },
      ],
    })
  }

  const storeCredentials = async (username, password, callback) => {
    const success = await authentication()

    callback()
    if (success) {
      dispatch(SettingActions.addCredentials({ username, password }))
    }
  }

  return {
    isBioLoading,
    isBiometricSupported,
    isCredentialsSaved,
    enableBiometricDialog,
    startBiometricLogin,
  }
}

export default useBioAuth
