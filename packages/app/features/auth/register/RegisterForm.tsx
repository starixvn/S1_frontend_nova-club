import TextInput from 'app/components/form/TextInput'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { useAppDispatch } from 'app/provider/redux/store'
import { useLazyRegisterQuery } from 'app/services/authApi'
import { LoginResult } from 'app/services/authApi.type'
import { PlayerActions } from 'app/store/playerReducer'
import validation from 'app/utils/validation'
import { styled, Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MotiLink } from 'solito/moti'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'

const StyledButtonOpacity = styled(TouchableOpacity)({})

type LoginFormValues = {
  username: string
  password: string
  confirmPassword: string
  realName: string
}

const RegisterForm = () => {
  const [register] = useLazyRegisterQuery()
  const [errorMsg, setErrorMsg] = useState('')
  const { push } = useRouter()

  const dispatch = useAppDispatch()

  const onSubmit = async (
    { username, password, confirmPassword, realName }: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const { data, success, message } = await register({
        username,
        password,
        cpassword: confirmPassword,
        contactNumber: '84' + 1e7,
        email: username + '@gmail.com',
        terms: true,
        tracking_code: 'nEgoJLCSbn',
        real_name: realName,
      }).unwrap()

      if (success) {
        dispatch(PlayerActions.setCurrentLoginInfo(data as LoginResult))
        actions.resetForm()
        if (errorMsg) setErrorMsg('')

        push('/home')
      } else {
        throw new Error(message)
      }
    } catch (e) {
      setErrorMsg(e.message)
      //   dispatch(AlertActions.addError(t('common.systemError')))
    }
  }

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      realName: '',
    },
    validationSchema: Yup.object({
      username: validation.username,
      password: validation.passwordRestrict,
      confirmPassword: validation.confirmPassword,
      realName: Yup.string()
        .min(6, 'validation.userNameMinMaxLength')
        .required('validation.required'),
    }),
    onSubmit,
  })

  const {
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    errors,
    touched,
    submitForm,
  } = formik

  return (
    <>
      <TextInput
        _icon="avatar"
        _input={{
          placeholder: 'Username',
          value: values.username,
          onChangeText: handleChange('username'),
          onBlur: handleBlur('username'),
          autoCapitalize: 'none',
        }}
        error={
          touched.username && errors.username ? errors.username : undefined
        }
        sx={{ minHeight: 50 }}
      />

      <TextInput
        _icon="lock"
        _input={{
          placeholder: 'Password',
          value: values.password,
          onChangeText: handleChange('password'),
          onBlur: handleBlur('password'),
          secureTextEntry: true,
        }}
        error={
          touched.password && errors.password ? errors.password : undefined
        }
        sx={{ mt: '$6', minHeight: 50 }}
      />

      <TextInput
        _icon="lock-check"
        _input={{
          placeholder: 'Confirm Password',
          value: values.confirmPassword,
          onChangeText: handleChange('confirmPassword'),
          onBlur: handleBlur('confirmPassword'),
          secureTextEntry: true,
        }}
        error={
          touched.confirmPassword && errors.confirmPassword
            ? errors.confirmPassword
            : undefined
        }
        sx={{ mt: '$6' }}
      />

      <TextInput
        _icon="avatar-write"
        _input={{
          maxLength: 20,
          placeholder: 'Real Name',
          value: values.realName,
          onChangeText: handleChange('realName'),
          onBlur: handleBlur('realName'),
        }}
        error={
          touched.realName && errors.realName ? errors.realName : undefined
        }
        sx={{ mt: '$6', minHeight: 50 }}
      />

      <Text variant="error" sx={{ mt: '$6' }}>
        {errorMsg}
      </Text>

      <View sx={{ alignItems: 'center', mt: '$10' }}>
        <View sx={{ width: '80%' }}>
          <StyledButtonOpacity
            activeOpacity={0.6}
            sx={{ mt: '$8' }}
            onPress={submitForm}
          >
            <DripsyGradient
              gradient={'orangeRed'}
              sx={{ alignItems: 'center', borderRadius: 10 }}
            >
              <Text variant="body" sx={{ p: '$7' }}>
                Register
              </Text>
            </DripsyGradient>
          </StyledButtonOpacity>
        </View>
      </View>
    </>
  )
}

export default RegisterForm
