import CheckBox from 'app/components/CheckBox'
import { Button } from 'app/components/form/Button'
import IconButton from 'app/components/form/IconButton'
import TextInput from 'app/components/form/TextInput'
import useAlert from 'app/hooks/useAlert'
import useBioAuth from 'app/hooks/useBioAuth'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useShield from 'app/hooks/useShield'
import useLocalization from 'app/provider/localization'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { SettingActions } from 'app/store/setting.slice'
import validation, {
  PASSWORD_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
} from 'app/utils/validation'
import { styled, Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { Platform, StyleSheet, TextInput as RNTextField } from 'react-native'
import { useLoginMutation } from 'services/authApi'
import { Shield_Action } from 'services/authApi.type'
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

  const { isBioLoading, showBiometric, normalLogin, startBiometricLogin } =
    useBioAuth()
  const { syncShield } = useShield()

  const isBiometricLogin = useAppSelector((s) => s.setting.biometricCredentials)

  const rememberMeCredential = useAppSelector(
    (s) => s.setting.rememberMeCredentials
  )

  const [isRemember, setIsRemember] = useState(() => {
    if (rememberMeCredential) return true
    else return false
  })

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
        // syncShield(Shield_Action.LOGIN)
        dispatch(AuthActions.setSyncShieldActionType('login'))
        dispatch(SettingActions.setRememberMe(isRemember))
        normalLogin(username, password, () => handleProceedLogin(data, actions))
      } else {
        throw new Error(message)
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

    replace(afterLoginRedirection)
  }

  const onCheckboxCheck = () => {
    setIsRemember(!isRemember)
  }

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: rememberMeCredential?.username || '',
      password: rememberMeCredential?.password || '',
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

      <View
        sx={{
          position: 'relative',
          flexDirection: 'row',
          mt: '$4',
        }}
      >
        <View
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            borderWidth: 0,
          }}
        >
          <CheckBox
            isCheck={isRemember}
            onCheck={onCheckboxCheck}
            tickColor="$orange"
            sx={isRemember ? styles.boxChecked : styles.boxUncheck}
          />
        </View>
        <View sx={{ flexShrink: 1, pl: '$2' }}>
          <Text style={!isRemember ? styles.checked : styles.uncheck}>
            Remember Me
          </Text>
        </View>
        <View
          sx={{
            position: 'absolute',
            right: 0,
          }}
        >
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
    color: '#F15D12',
  },
  uncheck: {
    opacity: 0.43,
  },
  boxChecked: {
    backgroundColor: '#062243',
  },
  boxUncheck: {
    backgroundColor: '#fff',
  },
})

export default LoginForm
