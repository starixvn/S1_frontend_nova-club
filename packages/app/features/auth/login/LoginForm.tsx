import useAfterLogin from 'agent/hooks/useAfterLogin'
import { useLoginMutation as useAgentLoginMutation } from 'agent/services/authApi'
import { useLazyUserInfoQuery } from 'agent/services/userApi'
import { AgentAuthActions } from 'agent/store/agentAuthReducer'
import { ROLE } from 'agent/utils/helper'
import CheckBox from 'app/components/CheckBox'
import { Button } from 'app/components/form/Button'
import IconButton from 'app/components/form/IconButton'
import TextInput from 'app/components/form/TextInput'
import useAlert from 'app/hooks/useAlert'
import useBioAuth from 'app/hooks/useBioAuth'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { SettingActions } from 'app/store/setting.slice'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import validation, {
  PASSWORD_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
} from 'app/utils/validation'
import { Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import { AnimatePresence, MotiText } from 'moti'
import React, { useContext, useRef, useState } from 'react'
import { Platform, StyleSheet, TextInput as RNTextField } from 'react-native'
import { useLoginMutation } from 'services/authApi'
import { Shield_Action } from 'services/authApi.type'
import { createParam } from 'solito'
import * as Yup from 'yup'

const { useParam } = createParam()

type LoginFormValues = {
  username: string
  password: string
}

type LoginFormProps = {
  isAgent: boolean
}

const LoginForm = ({ isAgent }: LoginFormProps) => {
  const [login] = useLoginMutation()
  const [agentLogin] = useAgentLoginMutation()
  const [getUserInfo] = useLazyUserInfoQuery()

  const { t } = useLocalization()
  const { showAlert } = useAlert()
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { replace, push, back, clear } = useContextualRouter()
  const [afterLoginRedirection] = useParam('r')

  // const { handleAgentLogin } = useAfterLogin()

  const passwordFieldRef = useRef<RNTextField>(null)
  const usernameFieldRef = useRef<RNTextField>(null)

  const dispatch = useAppDispatch()

  const { isBioLoading, showBiometric, normalLogin, startBiometricLogin } =
    useBioAuth()

  const isBiometricLogin = useAppSelector((s) => s.setting.biometricCredentials)

  const rememberMeCredential = useAppSelector(
    (s) => s.setting.rememberMeCredentials
  )

  const [isRemember, setIsRemember] = useState(() => {
    if (rememberMeCredential) return true
    else return false
  })

  const navigateAfterLogin = Platform.select({
    web: (base) => {
      let replaceRoute = afterLoginRedirection ?? base

      const urlParams = new URLSearchParams(window.location.search)
      const redirect = urlParams.get('r')
      if (redirect) replaceRoute = redirect

      replace(replaceRoute)
    },
    default: (base) => {
      console.log('base', base)
      if (base) push(base)
      else back()
    },
  })

  const onSubmit = async (
    { username, password }: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    try {
      setIsSubmitting(true)

      if (isAgent) {
        //handle agent login
        const { result, success, message } = await agentLogin({
          username,
          password,
        }).unwrap()

        if (success && result) {
          dispatch(AgentAuthActions.setAgentAuthToken(result.data.access_token))
          const resp = await getUserInfo().unwrap()

          if (resp.has_logged_in === 0) {
            Platform.select({
              web: function () {
                replace('/agent/reset-password')
              },
              default: function () {
                back()
                push('/agent/reset-password')
              },
            })()
          } else {
            navigateAfterLogin('/agent')
          }
        } else {
          throw new Error(message)
        }
      } else {
        //handle member login
        const { data, success, message } = await login({
          username,
          password,
        }).unwrap()

        if (success && data) {
          // syncShield(Shield_Action.LOGIN)
          dispatch(
            SettingActions.setRememberMe(
              isRemember ? { username, password } : undefined
            )
          )

          dispatch(
            TempSettingActions.setSyncShieldActionType(Shield_Action.LOGIN)
          )
          normalLogin(username, password, () =>
            handleProceedLogin(data, actions)
          )
        } else {
          throw new Error(message)
        }
      }
    } catch (error) {
      showAlert(error)

      setIsSubmitting(false)
    }
  }

  const handleProceedLogin = (data, actions) => {
    dispatch(AuthActions.setAuthInfo(data))
    /* clear off lucky draw */
    // dispatch(SettingActions.setLuckyDrawBalance(0))
    // await updateLanguage(data.playerName)

    actions.resetForm()
    if (errorMsg) setErrorMsg('')

    navigateAfterLogin('/')
  }

  const onCheckboxCheck = () => {
    setIsRemember(!isRemember)
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

  const { handleChange, handleBlur, values, errors, touched, submitForm } =
    formik

  return (
    <>
      <TextInput
        _icon="avatar"
        _input={{
          textContentType: 'username',
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
          textContentType: 'password',
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

      <View
        sx={{
          flexDirection: 'row',
          mt: '$4',
        }}
      >
        <TouchableOpacity
          sx={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={onCheckboxCheck}
        >
          <CheckBox
            isCheck={isRemember}
            tickColor="$orange"
            sx={{
              bg: isRemember ? '#062243' : '#fff',
            }}
          />
          <Text
            sx={{ ml: '$2' }}
            style={isRemember ? styles.checked : styles.uncheck}
          >
            {t('auth.rememberMe')}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        sx={{
          alignItems: 'flex-end',
        }}
      >
        <TouchableOpacity onPress={() => push('/auth/forget-password')}>
          <Text
            sx={{
              opacity: 0.43,
            }}
          >
            {t('auth.forgotPassword') + '?'}
          </Text>
        </TouchableOpacity>
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
            loading={isSubmitting || isBioLoading}
          >
            <Button.Label>{t('auth.login')}</Button.Label>
          </Button>
        </View>

        <View
          sx={{ mt: '$5', minHeight: 20 }}
          pointerEvents={isAgent ? 'none' : 'auto'}
        >
          <TouchableOpacity onPress={() => push('/auth/register')}>
            <AnimatePresence>
              {!isAgent && (
                <MotiText
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'timing', duration: 250 }}
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#F15D12',
                  }}
                >
                  {t('auth.register')}
                </MotiText>
              )}
            </AnimatePresence>
          </TouchableOpacity>
        </View>
      </View>

      {Platform.OS !== 'web' && showBiometric && !!isBiometricLogin && (
        <View
          sx={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            name={Platform.OS === 'ios' ? 'face-id' : 'fingerprint'}
            onPress={() => startBiometricLogin()}
          />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  checked: {
    opacity: 0.43,
  },
  uncheck: {
    color: '#F15D12',
  },
})

export default LoginForm
