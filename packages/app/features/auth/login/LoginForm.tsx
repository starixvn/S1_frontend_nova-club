import { Button } from 'app/components/form/Button'
import TextInput from 'app/components/form/TextInput'
import useAlert from 'app/hooks/useAlert'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useLocalization from 'app/provider/localization'
import { useAppDispatch } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { SettingActions } from 'app/store/setting.slice'
import validation, {
  PASSWORD_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
} from 'app/utils/validation'
import { styled, Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { TextInput as RNTextField } from 'react-native'
import { useLoginMutation } from 'services/authApi'
import { useLazyPlayerProfileQuery } from 'services/playerApi'
import { createParam } from 'solito'
import { MotiLink } from 'solito/moti'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'

const { useParam } = createParam()

const StyledLink = styled(MotiLink)({})

type LoginFormValues = {
  username: string
  password: string
}

const LoginForm = () => {
  const [login] = useLoginMutation()
  const { t } = useLocalization()
  const { showAlert } = useAlert()
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { replace } = useRouter()
  const [afterLoginRedirection] = useParam('r', {
    initial: '/',
  })
  const passwordFieldRef = useRef<RNTextField>(null)
  const usernameFieldRef = useRef<RNTextField>(null)

  const [getPlayerProfile] = useLazyPlayerProfileQuery()

  const dispatch = useAppDispatch()

  const updateLanguage = async (username: string) => {
    try {
      const { data } = await getPlayerProfile().unwrap()

      if (data) {
        const { language } = data
        dispatch(SettingActions.setLocale(language))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async (
    { username, password }: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    try {
      setIsSubmitting(true)

      const { data, success, message } = await login({
        username,
        password,
      }).unwrap()

      if (success && data) {
        dispatch(AuthActions.setAuthInfo(data))
        // await updateLanguage(data.playerName)
        actions.resetForm()
        if (errorMsg) setErrorMsg('')

        replace(afterLoginRedirection)
      } else {
        throw new Error(message)
      }
    } catch (error) {
      showAlert(error)

      setIsSubmitting(false)
    }
  }

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: validation.username,
      password: validation.password,
    }),
    onSubmit,
  })

  const { makeContextualHref } = useContextualRouting()
  const to = makeContextualHref('forget-password')

  const { handleChange, handleBlur, values, errors, touched, submitForm } =
    formik

  return (
    <>
      <TextInput
        _icon="avatar"
        _input={{
          placeholder: t('common.username'),
          value: values.username,
          onChangeText: handleChange('username'),
          onBlur: handleBlur('username'),
          autoCapitalize: 'none',
          ref: usernameFieldRef,
          onSubmitEditing: () => {
            passwordFieldRef.current?.focus()
          },
          maxLength: USERNAME_MAX_LENGTH,
        }}
        error={
          touched.username && errors.username
            ? t(errors.username, {
                field: t('common.username'),
              })
            : undefined
        }
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
          onSubmitEditing: submitForm,
          maxLength: PASSWORD_MAX_LENGTH,
        }}
        error={
          touched.password && errors.password
            ? t(errors.password, {
                field: t('common.password'),
              })
            : undefined
        }
        sx={{ mt: '$3' }}
      />

      <View sx={{ alignItems: 'flex-end', mt: '$2' }}>
        <MotiLink
          href={to}
          as={`/auth/forget-password`}
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
              fontSize: [14, 16],
              opacity: 0.43,
            }}
          >
            {t('auth.forgotPassword') + '?'}
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
            <Button.Label>{t('auth.login')}</Button.Label>
          </Button>
        </View>

        <View sx={{ mt: '$5' }}>
          <StyledLink
            href={'/auth/register'}
            animate={({ hovered, pressed }) => {
              'worklet'
              return {
                scale: pressed ? 0.9 : hovered ? 1.1 : 1,
              }
            }}
          >
            <Text
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: '$orange',
              }}
            >
              {t('auth.register')}
            </Text>
          </StyledLink>

          {/* {log && <Text>{log}</Text>} */}
        </View>
      </View>
    </>
  )
}

export default LoginForm
