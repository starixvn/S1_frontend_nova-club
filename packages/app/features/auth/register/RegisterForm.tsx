import { Button } from 'app/components/form/Button'
import TextInput, { DripsyTextInputProps } from 'app/components/form/TextInput'
import { useLazyCheckUsernameQuery } from 'app/services/authApi'
import { getErrorMessage } from 'app/utils/validation'
import { ActivityIndicator, useDripsyTheme, View } from 'dripsy'
import { FormikProps } from 'formik'
import React, { memo, useCallback, useMemo, useRef, useState } from 'react'
import { RegisterFormValues } from '.'
import { TextInput as RNTextInput } from 'react-native'

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

  const [checkUsername] = useLazyCheckUsernameQuery()

  const [usernameErrorMsg, setUsernameErrorMsg] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const oldUsernameRef = useRef('')
  const isUsernameCheckedRef = useRef(false)
  const passwordFieldRef = useRef<RNTextInput>(null)
  const confirmPasswordFieldRef = useRef<RNTextInput>(null)
  const realNameFieldRef = useRef<RNTextInput>(null)

  const { theme } = useDripsyTheme()

  const onSubmit = useCallback(async () => {
    setTouched({
      username: true,
      password: true,
      confirmPassword: true,
      realName: true,
    })

    const { username, confirmPassword, password, realName } =
      await validateForm()

    if (username || confirmPassword || password || realName) return

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

  const onUsernameBlur = useCallback(async () => {
    const newUsername = values.username
    setTouched({ username: true })

    if (oldUsernameRef.current === newUsername) return

    oldUsernameRef.current = newUsername

    if (!errors.username) {
      setIsCheckingUsername(true)

      try {
        const { success } = await checkUsername({
          username: newUsername,
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
    setTouched,
    usernameErrorMsg,
    values.username,
  ])

  const onUsernameChange = useCallback(
    (e) => {
      if (isUsernameCheckedRef.current) isUsernameCheckedRef.current = false
      if (usernameErrorMsg) setUsernameErrorMsg('')

      setFieldValue('username', e)
    },
    [setFieldValue, usernameErrorMsg]
  )

  const usernameInputConfig: DripsyTextInputProps = useMemo(
    () => ({
      nativeID: 'username',
      placeholder: 'Username',
      value: values.username,
      onChangeText: onUsernameChange,
      onBlur: onUsernameBlur,
      onSubmitEditing: () => {
        passwordFieldRef.current?.focus()
      },
      autoCapitalize: 'none',
    }),
    [values.username, onUsernameChange, onUsernameBlur]
  )

  const usernameError = useMemo(() => {
    if (touched.username && errors.username) {
      return errors.username
    } else if (usernameErrorMsg) {
      return usernameErrorMsg
    }

    return undefined
  }, [errors.username, touched.username, usernameErrorMsg])

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
          placeholder: 'Password',
          value: values.password,
          onChangeText: handleChange('password'),
          onBlur: handleBlur('password'),
          secureTextEntry: true,
          ref: passwordFieldRef,
          onSubmitEditing: () => {
            confirmPasswordFieldRef.current?.focus()
          },
        }}
        error={
          touched.password && errors.password ? errors.password : undefined
        }
        sx={{ mt: '$3' }}
      />

      <TextInput
        _icon="lock-check"
        _input={{
          placeholder: 'Confirm Password',
          value: values.confirmPassword,
          onChangeText: handleChange('confirmPassword'),
          onBlur: handleBlur('confirmPassword'),
          secureTextEntry: true,
          ref: confirmPasswordFieldRef,
          onSubmitEditing: () => {
            realNameFieldRef.current?.focus()
          },
        }}
        error={
          touched.confirmPassword && errors.confirmPassword
            ? errors.confirmPassword
            : undefined
        }
        sx={{ mt: '$3' }}
      />

      <TextInput
        _icon="avatar-write"
        _input={{
          maxLength: 20,
          placeholder: 'Real Name',
          value: values.realName,
          onChangeText: handleChange('realName'),
          onBlur: handleBlur('realName'),
          ref: realNameFieldRef,
          onSubmitEditing: onSubmit,
        }}
        error={
          touched.realName && errors.realName ? errors.realName : undefined
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
            <Button.Label>Register</Button.Label>
          </Button>
        </View>
      </View>
    </>
  )
}

export default RegisterForm
