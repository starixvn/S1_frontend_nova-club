import { Button } from 'app/components/form/Button'
import TextInput, { DripsyTextInputProps } from 'app/components/form/TextInput'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { getErrorMessage, PASSWORD_MAX_LENGTH } from 'app/utils/validation'
import { ActivityIndicator, useDripsyTheme, View } from 'dripsy'
import { FormikProps } from 'formik'
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { TextInput as RNTextInput } from 'react-native'
import { useLazyCheckUsernameQuery } from 'services/authApi'
import { RegisterFormValues } from '.'

interface RegisterFormProps {
  formik: FormikProps<RegisterFormValues>
  onSuccess: () => void
}

const MemoTextInput = memo(TextInput)

const RegisterForm = ({ formik, onSuccess }: RegisterFormProps) => {
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setTouched,
    setFieldValue,
    validateForm,
  } = formik

  const { t } = useLocalization()
  const [checkUsername] = useLazyCheckUsernameQuery()
  const lang = useAppSelector((state) => state.setting.locale)

  const [usernameErrorMsg, setUsernameErrorMsg] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const oldUsernameRef = useRef('')
  const isUsernameCheckedRef = useRef(false)
  const passwordFieldRef = useRef<RNTextInput>(null)
  const confirmPasswordFieldRef = useRef<RNTextInput>(null)

  const { theme } = useDripsyTheme()

  const onSubmit = useCallback(async () => {
    setTouched({
      username: true,
      password: true,
      confirmPassword: true,
    })

    const { username, confirmPassword, password } = await validateForm()

    if (username || confirmPassword || password) return

    if (isCheckingUsername || usernameErrorMsg || !isUsernameCheckedRef.current)
      return

    onSuccess()
  }, [
    isCheckingUsername,
    onSuccess,
    setTouched,
    usernameErrorMsg,
    validateForm,
  ])

  const handleCheckingUsername = useCallback(async () => {
    if (isCheckingUsername) return

    if (!errors.username) {
      setIsCheckingUsername(true)

      try {
        const { success } = await checkUsername({
          username: values.username,
        }).unwrap()

        isUsernameCheckedRef.current = true

        if (success) {
          if (usernameErrorMsg) setUsernameErrorMsg('')
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error)
        setUsernameErrorMsg(errorMessage)
      } finally {
        setIsCheckingUsername(false)
      }
    }
  }, [
    checkUsername,
    errors.username,
    isCheckingUsername,
    usernameErrorMsg,
    values.username,
  ])

  const onUsernameBlur = useCallback(async () => {
    const newUsername = values.username
    setTouched({ username: true })

    if (oldUsernameRef.current === newUsername) return

    oldUsernameRef.current = newUsername

    handleCheckingUsername()
  }, [handleCheckingUsername, setTouched, values.username])

  const onUsernameChange = useCallback(
    (e) => {
      if (isUsernameCheckedRef.current) isUsernameCheckedRef.current = false
      if (usernameErrorMsg) {
        oldUsernameRef.current = ''
        setUsernameErrorMsg('')
      }

      setFieldValue('username', e)
    },
    [setFieldValue, usernameErrorMsg]
  )

  const usernameInputConfig: DripsyTextInputProps = useMemo(
    () => ({
      nativeID: 'username',
      placeholder: t('common.username'),
      value: values.username,
      onChangeText: onUsernameChange,
      onBlur: onUsernameBlur,
      onSubmitEditing: () => {
        passwordFieldRef.current?.focus()
      },
      autoCapitalize: 'none',
    }),
    [t, values.username, onUsernameChange, onUsernameBlur]
  )

  const usernameError = useMemo(() => {
    if (touched.username && errors.username) {
      return t(errors.username, { field: t('common.username') })
    } else if (usernameErrorMsg) {
      return usernameErrorMsg
    }

    return undefined
  }, [errors.username, t, touched.username, usernameErrorMsg])

  const usernameActions = useMemo(
    () => [
      () => {
        if (!isCheckingUsername) return null

        return (
          <ActivityIndicator color={theme.activityIndicator.primary.color} />
        )
      },
    ],
    [isCheckingUsername, theme.activityIndicator.primary.color]
  )

  useEffect(() => {
    if (usernameErrorMsg) {
      /**
       * On changing language, retrigger checking username api to get the corresponding
       * error message translation
       */
      handleCheckingUsername()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, usernameErrorMsg])

  return (
    <>
      {/* TextInput is memoized to prevent loading animation from keep re-rendering */}
      <MemoTextInput
        _icon="avatar"
        _input={usernameInputConfig}
        error={usernameError}
        actions={usernameActions}
      />

      <TextInput
        _icon="lock"
        _input={{
          placeholder: t('common.password'),
          value: values.password,
          onChangeText: handleChange('password'),
          onBlur: handleBlur('password'),
          secureTextEntry: true,
          ref: passwordFieldRef,
          onSubmitEditing: () => {
            confirmPasswordFieldRef.current?.focus()
          },
          maxLength: PASSWORD_MAX_LENGTH,
        }}
        error={
          touched.password && errors.password
            ? t(errors.password, { field: t('common.password') })
            : undefined
        }
        sx={{ mt: '$3' }}
      />

      <TextInput
        _icon="lock-check"
        _input={{
          placeholder: t('common.confirmPassword'),
          value: values.confirmPassword,
          onChangeText: handleChange('confirmPassword'),
          onBlur: handleBlur('confirmPassword'),
          secureTextEntry: true,
          ref: confirmPasswordFieldRef,
          onSubmitEditing: onSubmit,
          maxLength: PASSWORD_MAX_LENGTH,
        }}
        error={
          touched.confirmPassword && errors.confirmPassword
            ? t(errors.confirmPassword, { field: t('common.confirmPassword') })
            : undefined
        }
        sx={{ mt: '$3' }}
      />

      <View sx={{ alignItems: 'center', mt: '$5' }}>
        <View sx={{ width: '70%' }}>
          <Button
            sx={{ mt: '$4' }}
            containerStyle={{ alignSelf: 'stretch' }}
            onPress={onSubmit}
          >
            <Button.Label>{t('auth.register')}</Button.Label>
          </Button>
        </View>
      </View>
    </>
  )
}

export default RegisterForm
