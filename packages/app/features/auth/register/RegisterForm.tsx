import TextInput from 'app/components/form/TextInput'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { useLazyRegisterQuery } from 'app/services/authApi'
import validation from 'app/utils/validation'
import { styled, Text, View } from 'dripsy'
import { useFormik } from 'formik'
import React, { useState } from 'react'
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
  const [showPassword, setShowPassword] = useState(false)
  const { push } = useRouter()

  const onSubmit = async ({
    username,
    password,
    confirmPassword,
    realName,
  }: LoginFormValues) => {
    try {
      const { result, success, message } = await register({
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
        setErrorMsg('')
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
      realName: Yup.string().required('validation.required'),
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
        _icon="sl"
        _input={{
          placeholder: 'Username',
          value: values.username,
          onChangeText: handleChange('username'),
          onBlur: handleBlur('username'),
        }}
        error={
          touched.username && errors.username ? errors.username : undefined
        }
        sx={{ minHeight: 50 }}
      />

      <TextInput
        _icon="sl"
        _input={{
          placeholder: 'Password',
          value: values.password,
          onChangeText: handleChange('password'),
          onBlur: handleBlur('password'),
          secureTextEntry: showPassword,
        }}
        error={
          touched.password && errors.password ? errors.password : undefined
        }
        sx={{ mt: '$12', minHeight: 50 }}
        actions={[
          () => (
            <StyledButtonOpacity
              activeOpacity={0.6}
              onPress={() => setShowPassword((password) => !password)}
            >
              <Icon name="lc" size={25} sx={{ color: '$orange' }} />
            </StyledButtonOpacity>
          ),
        ]}
      />

      <TextInput
        _icon="sl"
        _input={{
          placeholder: 'Confirm Password',
          value: values.confirmPassword,
          onChangeText: handleChange('confirmPassword'),
          onBlur: handleBlur('confirmPassword'),
        }}
        error={
          touched.confirmPassword && errors.confirmPassword
            ? errors.confirmPassword
            : undefined
        }
        sx={{ mt: '$12', minHeight: 50 }}
        actions={[
          () => (
            <StyledButtonOpacity activeOpacity={0.6}>
              <Icon name="lc" size={25} sx={{ color: '$orange' }} />
            </StyledButtonOpacity>
          ),
        ]}
      />

      <TextInput
        _icon="sl"
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
        sx={{ mt: '$12', minHeight: 50 }}
        actions={[
          () => (
            <StyledButtonOpacity activeOpacity={0.6}>
              <Icon name="lc" size={25} sx={{ color: '$orange' }} />
            </StyledButtonOpacity>
          ),
        ]}
      />

      <Text variant="error">{errorMsg}</Text>

      <View sx={{ alignItems: 'center', mt: '$6' }}>
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
