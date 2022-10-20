import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { SettingActions } from 'app/store/setting.slice'
import * as LocalAuthentication from 'expo-local-authentication'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
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

  const biometricCredentials = useAppSelector(
    (s) => s.setting.biometricCredentials
  )
  const isCredentialsSaved = !!biometricCredentials

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
    const check = await checkBiometricEnabled()

    if (!check) {
      openModal('AlertModal', { message: t('biometric.notFound') })
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
          username: biometricCredentials?.username,
          password: biometricCredentials?.password,
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

  const normalLogin = (username, password, callback) => {
    Platform.OS !== 'web' &&
      dispatch(SettingActions.addCredentials({ username, password }))

    isBiometricSupported &&
    (!isCredentialsSaved || biometricCredentials.username !== username)
      ? showBiometricDialog(username, password, callback)
      : callback()
  }

  const showBiometricDialog = async (username, password, callback) => {
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
          onPress: () => enableBiometric(callback),
          buttonStyle: { px: 0, minWidth: 120 },
        },
      ],
      persistent: true,
    })
  }

  const enableBiometric = async (callback) => {
    const success = await authentication()

    callback()
    if (success) {
      dispatch(SettingActions.toogleBiometricLogin(true))
    }
  }

  return {
    isBioLoading,
    showBiometric: isBiometricSupported && isCredentialsSaved,
    normalLogin,
    startBiometricLogin,
    enableBiometric,
  }
}

export default useBioAuth
