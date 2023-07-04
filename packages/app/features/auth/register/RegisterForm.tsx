import Button from 'app/components/common/Button'
import Input from 'app/components/form/Input'
import useLocalization from 'app/provider/localization'
import {
  PASSWORD_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
  getErrorMessage,
} from 'app/utils/validation'
import { View } from 'dripsy'
import { FormikProps } from 'formik'
import { useCallback, useRef, useState } from 'react'
import { TextInput } from 'react-native'
import { useLazyCheckUsernameQuery } from 'services/authApi'
import { RegisterFormValues } from './RegisterScreen'
import FormContainer from 'app/components/form/FormContainer'

interface RegisterFormProps {
  isAgent: boolean
  formik: FormikProps<RegisterFormValues>
  onSuccess: () => void
}

const RegisterForm = ({ isAgent, formik, onSuccess }: RegisterFormProps) => {
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
  //   const [agentCheckUsername] = useLazyAgentCheckUsernameQuery()

  const [usernameErrorMsg, setUsernameErrorMsg] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const oldUsernameRef = useRef('')
  const isUsernameCheckedRef = useRef(false)
  const usernameFieldRef = useRef<TextInput>(null)
  const passwordFieldRef = useRef<TextInput>(null)
  const confirmPasswordFieldRef = useRef<TextInput>(null)

  const onSubmit = useCallback(async () => {
    setTouched({
      username: true,
      password: true,
      confirmPassword: true,
    })

    const { username, confirmPassword, password } = await validateForm()

    if (username || confirmPassword || password) return

    onSuccess()
  }, [setTouched, validateForm, onSuccess])

  const handleCheckingUsername = useCallback(async () => {
    if (isCheckingUsername) return

    if (!errors.username) {
      setIsCheckingUsername(true)

      try {
        if (isAgent) {
          // pending for agent services implementation
          //   const { success } = await agentCheckUsername({
          //     username: values.username,
          //   }).unwrap()
          //   isUsernameCheckedRef.current = true
          //   if (success) {
          //     if (usernameErrorMsg) setUsernameErrorMsg('')
          //   }
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

  return (
    <FormContainer
      padding
      sx={{
        py: '$4',
      }}
    >
      <Input
        inputContainerSx={{ width: '100%' }}
        icon="profile-rounded"
        placeholder="Username"
        textContentType="username"
        value={values.username}
        onBlur={onUsernameBlur}
        onChangeText={handleChange('username')}
        maxLength={USERNAME_MAX_LENGTH}
        ref={usernameFieldRef}
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
      />
      <Input
        inputContainerSx={{ width: '100%' }}
        icon="pw"
        placeholder="Password"
        secureTextEntry
        textContentType="password"
        value={values.password}
        onBlur={handleBlur('password')}
        onChangeText={handleChange('password')}
        maxLength={PASSWORD_MAX_LENGTH}
        ref={passwordFieldRef}
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
        inputContainerSx={{ width: '100%' }}
        icon="cpw"
        placeholder="Confirm Password"
        secureTextEntry
        textContentType="password"
        value={values.confirmPassword}
        onBlur={handleBlur('confirmPassword')}
        onChangeText={handleChange('confirmPassword')}
        maxLength={PASSWORD_MAX_LENGTH}
        ref={confirmPasswordFieldRef}
        onSubmitEditing={onSubmit}
        error={
          touched.confirmPassword && errors.confirmPassword
            ? t(errors.confirmPassword, {
                field: t('common.confirmPassword'),
              })
            : undefined
        }
      />

      <Button
        onPress={onSubmit}
        sx={{ mt: '$6', my: '$2', bg: '$primary.300' }}
      >
        {t('authentication.register')}
      </Button>
    </FormContainer>
  )
}

export default RegisterForm
