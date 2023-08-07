import { useLazyAgentCheckUsernameQuery } from 'agent/services/authApi'
import Button from 'app/components/common/Button'
import FormContainer from 'app/components/form/FormContainer'
import Input from 'app/components/form/Input'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import isDesktop from 'app/utils/isDesktop'
import {
  PASSWORD_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
  getErrorMessage,
} from 'app/utils/validation'
import { ActivityIndicator, View, styled, useDripsyTheme } from 'dripsy'
import { FormikProps } from 'formik'
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native'
import { useLazyCheckUsernameQuery } from 'services/authApi'
import { RegisterFormValues } from './RegisterScreen'
import ReferralInfo from './ReferralInfo'

const StyledFormContainer = styled(FormContainer)({
  py: '$4',
})

type RegisterFormProps = {
  isAgent: boolean
  formik: FormikProps<RegisterFormValues>
  onSuccess: () => void
} & ComponentProps<typeof StyledFormContainer>

const RegisterForm = ({
  isAgent,
  formik,
  onSuccess,
  ...rest
}: RegisterFormProps) => {
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
  const { theme } = useDripsyTheme()
  const desktop = isDesktop()
  const referral = useAppSelector((s) => s.setting.referral)

  const [agentCheckUsername] = useLazyAgentCheckUsernameQuery()

  const [usernameErrorMsg, setUsernameErrorMsg] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const oldUsernameRef = useRef('')
  const isUsernameCheckedRef = useRef(false)
  const usernameFieldRef = useRef<TextInput>(null)
  const passwordFieldRef = useRef<TextInput>(null)
  const confirmPasswordFieldRef = useRef<TextInput>(null)
  const lang = useAppSelector((state) => state.setting.locale)

  const onSubmit = async () => {
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
  }

  const handleCheckingUsername = useCallback(async () => {
    if (isCheckingUsername) return

    if (!errors.username) {
      setIsCheckingUsername(true)

      try {
        if (isAgent) {
          const { success } = await agentCheckUsername({
            username: values.username,
          }).unwrap()

          isUsernameCheckedRef.current = true

          if (success) {
            if (usernameErrorMsg) setUsernameErrorMsg('')
          }
        } else {
          const { success } = await checkUsername({
            username: values.username,
          }).unwrap()
          isUsernameCheckedRef.current = true
          if (success) {
            if (usernameErrorMsg) setUsernameErrorMsg('')
          }
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
    (e: string) => {
      if (isUsernameCheckedRef.current) isUsernameCheckedRef.current = false
      if (usernameErrorMsg) {
        oldUsernameRef.current = ''
        setUsernameErrorMsg('')
      }

      setFieldValue('username', e)
    },
    [setFieldValue, usernameErrorMsg]
  )

  const usernameActions = useCallback(() => {
    if (!isCheckingUsername) return

    return <ActivityIndicator color={theme.colors.$tertiary} />
  }, [isCheckingUsername, theme.colors.$tertiary])

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
    <StyledFormContainer {...rest}>
      <Input
        autoCapitalize={'none'}
        inputContainerSx={{ width: '100%' }}
        icon="profile-rounded"
        placeholder={t('common.username')}
        textContentType="username"
        value={values.username}
        onBlur={onUsernameBlur}
        onChangeText={onUsernameChange}
        maxLength={USERNAME_MAX_LENGTH}
        ref={usernameFieldRef}
        autoCorrect={false}
        onSubmitEditing={() => {
          passwordFieldRef.current?.focus()
        }}
        error={
          touched.username && errors.username
            ? t(errors.username, {
                field: t('common.username'),
              })
            : usernameErrorMsg
            ? usernameErrorMsg
            : undefined
        }
        action={usernameActions}
      />
      <Input
        autoCapitalize={'none'}
        inputContainerSx={{ width: '100%' }}
        icon="pw"
        placeholder={t('common.password')}
        secureTextEntry
        textContentType="password"
        value={values.password}
        onBlur={handleBlur('password')}
        onChangeText={handleChange('password')}
        maxLength={PASSWORD_MAX_LENGTH}
        ref={passwordFieldRef}
        autoComplete="password-new"
        onSubmitEditing={() => confirmPasswordFieldRef.current?.focus()}
        error={
          touched.password && errors.password
            ? t(errors.password, {
                field: t('common.password'),
              })
            : undefined
        }
      />
      <Input
        autoCapitalize={'none'}
        inputContainerSx={{ width: '100%' }}
        icon="cpw"
        placeholder={t('common.confirmPassword')}
        secureTextEntry
        textContentType="password"
        value={values.confirmPassword}
        onBlur={handleBlur('confirmPassword')}
        onChangeText={handleChange('confirmPassword')}
        maxLength={PASSWORD_MAX_LENGTH}
        ref={confirmPasswordFieldRef}
        autoComplete="password-new"
        onSubmitEditing={onSubmit}
        error={
          touched.confirmPassword && errors.confirmPassword
            ? t(errors.confirmPassword, {
                field: t('common.confirmPassword'),
              })
            : undefined
        }
      />

      {isAgent ? null : <ReferralInfo />}

      {/* Act as a margin for bottom */}
      {desktop && (
        <View aria-hidden sx={{ minHeight: 30, visibility: 'hidden' }} />
      )}

      <Button
        onPress={onSubmit}
        sx={{ mt: desktop ? 'auto' : '$4', py: '$2', bg: '$primary.300' }}
      >
        {t('authentication.register')}
      </Button>
    </StyledFormContainer>
  )
}

export default RegisterForm
