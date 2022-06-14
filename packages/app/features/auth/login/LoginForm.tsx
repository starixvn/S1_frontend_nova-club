import TextInput from 'app/components/form/TextInput'
import { DripsyGradient } from 'app/components/Gradient'
import { useAppDispatch } from 'app/provider/redux/store'
import { useLazyLoginQuery } from 'app/services/authApi'
import { PlayerActions } from 'app/store/playerReducer'
import validation from 'app/utils/validation'
import { styled, Text, useSx, View } from 'dripsy'
import { Formik, FormikHelpers, useFormik } from 'formik'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MotiLink } from 'solito/moti'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import { Button } from 'app/components/form/Button'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { TextLink } from 'solito/link'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'

const StyledButtonOpacity = styled(TouchableOpacity)({})
const StyledLink = styled(MotiLink)({})
const StyledTextLink = styled(TextLink)({})

type LoginFormValues = {
  username: string
  password: string
}

const LoginForm = () => {
  const [login, { isLoading, isError }] = useLazyLoginQuery()
  const sx = useSx()

  const [errorMsg, setErrorMsg] = useState('')
  const { push, replace } = useRouter()

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
    handleReset,
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
          onSubmitEditing: submitForm,
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
