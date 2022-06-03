import React, { useState } from 'react'
import TextInput from 'app/components/form/TextInput'
import { useLazyLoginQuery } from 'app/services/authApi'
import { styled, View, Text, Pressable } from 'dripsy'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'app/components/Icon'
import { MotiLink } from 'solito/moti'
import { DripsyGradient } from 'app/components/Gradient'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import { useRouter } from 'solito/router'
import { useAppDispatch } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'

const StyledButtonOpacity = styled(TouchableOpacity)({})
const StyledLink = styled(MotiLink)({})

type LoginFormValues = {
  username: string
  password: string
}

const LoginForm = () => {
  const [login, { isLoading, isError }] = useLazyLoginQuery()
  const [errorMsg, setErrorMsg] = useState('')
  const { push } = useRouter()

  const dispatch = useAppDispatch()

  const onSubmit = async ({ username, password }: LoginFormValues) => {
    try {
      const { data, success, message } = await login({
        username,
        password,
      }).unwrap()

      if (success && data) {
        const { playerName, token } = data

        dispatch(AuthActions.setToken({ playerName, token }))
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
    },
    validationSchema: Yup.object({
      username: Yup.string().required('validation.required'),
      //   password: Yup.string().required('validation.required'),
      password: validation.passwordRestrict,
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
          placeholder: 'User ID',
          value: values.username,
          onChangeText: handleChange('username'),
          onBlur: handleBlur('username'),
          autoCapitalize: 'none',
        }}
        error={
          touched.username && errors.username ? errors.username : undefined
        }
      />

      <TextInput
        _icon="sl"
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
        sx={{ mt: '$6' }}
      />

      <View sx={{ alignItems: 'flex-end' }}>
        <StyledLink
          href={'/forgot-password'}
          animate={({ hovered, pressed }) => {
            'worklet'
            return {
              scale: pressed ? 0.9 : hovered ? 1.1 : 1,
            }
          }}
          sx={{ width: '100%' }}
        >
          <Text
            variant="md"
            sx={{
              opacity: 0.43,
              mt: '$3',
            }}
          >
            Forgot Password?
          </Text>
        </StyledLink>
      </View>

      <Text variant="error">{errorMsg}</Text>

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
                Login
              </Text>
            </DripsyGradient>
          </StyledButtonOpacity>
        </View>

        <StyledLink
          href={'/auth/register'}
          animate={({ hovered, pressed }) => {
            'worklet'
            return {
              scale: pressed ? 0.9 : hovered ? 1.1 : 1,
            }
          }}
          sx={{ mt: '$10' }}
        >
          <Text
            variant="body"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '$orange',
            }}
          >
            Register
          </Text>
        </StyledLink>
      </View>
    </>
  )
}

export default LoginForm
