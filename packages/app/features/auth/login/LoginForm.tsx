import { Button } from 'app/components/form/Button'
import TextInput from 'app/components/form/TextInput'
import useContextualRouting from 'app/hooks/useContextualRouting'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { useAppDispatch } from 'app/provider/redux/store'
import { useLoginMutation } from 'app/services/authApi'
import { AlertActions } from 'app/store/alert'
import { PlayerActions } from 'app/store/playerReducer'
import validation, { getErrorMessage } from 'app/utils/validation'
import { styled, Text, useSx, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { createRef, useLayoutEffect, useRef, useState } from 'react'
import { TextInput as RNTextField } from 'react-native'
import { MotiLink } from 'solito/moti'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'

const StyledLink = styled(MotiLink)({})

type LoginFormValues = {
  username: string
  password: string
}

const LoginForm = () => {
  const [login] = useLoginMutation()
  const sx = useSx()

  const [errorMsg, setErrorMsg] = useState('')
  const { replace } = useRouter()
  const passwordFieldRef = useRef<RNTextField>(null)
  const usernameFieldRef = useRef<RNTextField>(null)

  const dispatch = useAppDispatch()

  const onSubmit = async (
    { username, password }: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const { data, success, message } = await login({
        username,
        password,
      }).unwrap()

      if (success && data) {
        dispatch(PlayerActions.setCurrentLoginInfo(data))
        actions.resetForm()
        if (errorMsg) setErrorMsg('')

        replace('/')
      } else {
        throw new Error(message)
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      dispatch(
        AlertActions.addError({
          message: errorMessage,
        })
      )
    }
  }

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: validation.username,
      password: validation.passwordRestrict,
    }),
    onSubmit,
  })

  const { makeContextualHref } = useContextualRouting(ContextualModuleKey.Login)
  const to = makeContextualHref('forget-password')

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
          placeholder: 'User ID',
          value: values.username,
          onChangeText: handleChange('username'),
          onBlur: handleBlur('username'),
          autoCapitalize: 'none',
          ref: usernameFieldRef,
          onSubmitEditing: () => {
            passwordFieldRef.current?.focus()
          },
        }}
        error={
          touched.username && errors.username ? errors.username : undefined
        }
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
          onSubmitEditing: submitForm,
        }}
        error={
          touched.password && errors.password ? errors.password : undefined
        }
        sx={{ mt: '$3' }}
      />

      <View sx={{ alignItems: 'flex-end' }}>
        <MotiLink
          href={to}
          as={`/auth/forget-password`}
          style={sx({
            mt: '$5',
          })}
          animate={({ hovered, pressed }) => {
            'worklet'
            return {
              scale: pressed ? 0.9 : hovered ? 1.1 : 1,
            }
          }}
        >
          <Text
            variant="md"
            sx={{
              opacity: 0.43,
              mt: '$1a',
            }}
          >
            Forgot Password?
          </Text>
        </MotiLink>
      </View>

      <Text variant="error" sx={{ mt: '$3' }}>
        {errorMsg}
      </Text>

      <View sx={{ alignItems: 'center', mt: '$5' }}>
        <View sx={{ width: '80%' }}>
          <Button
            stretch
            onPress={submitForm}
            sx={{ mt: '$4' }}
            loading={isSubmitting}
          >
            <Button.Label>Login</Button.Label>
          </Button>
        </View>

        <StyledLink
          href={'/auth/register'}
          animate={({ hovered, pressed }) => {
            'worklet'
            return {
              scale: pressed ? 0.9 : hovered ? 1.1 : 1,
            }
          }}
          sx={{ mt: '$5' }}
        >
          <Text
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

export default withContextualNav(LoginForm, ContextualModuleKey.Login)
