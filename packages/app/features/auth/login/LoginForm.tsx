import Input from 'app/components/form/Input'
import useLocalization from 'app/provider/localization'
import { useAppDispatch } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import validation, {
  PASSWORD_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
} from 'app/utils/validation'
import { ActivityIndicator, Pressable, Text, View, styled } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native'
import { useLoginMutation } from 'services/authApi'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'

type LoginFormValues = {
  username: string
  password: string
}
interface LoginFormProps {
  isAgent: boolean
}
const { useParam } = createParam()

const LoginForm = ({ isAgent }: LoginFormProps) => {
  const [login] = useLoginMutation()
  // const [agentLogin] = useAgentLoginMutation()

  const { t } = useLocalization()
  // const { showAlert } = useAlert()
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { replace, push, back } = useRouter()
  const [afterLoginRedirection] = useParam('r')

  // const { handleAgentLogin } = useAfterLogin()

  const passwordFieldRef = useRef<TextInput>(null)
  const usernameFieldRef = useRef<TextInput>(null)

  const dispatch = useAppDispatch()
  // console.log('IsAgent:', isAgent)
  useEffect(() => {
    // console.warn('Recreate')
  }, [])
  // const { isBioLoading, showBiometric, normalLogin, startBiometricLogin } =
  //   useBioAuth()

  // const isBiometricLogin = useAppSelector((s) => s.setting.biometricCredentials)

  // const rememberMeCredential = useAppSelector(
  //   (s) => s.setting.rememberMeCredentials
  // )

  // const [isRemember, setIsRemember] = useState(() => {
  //   if (rememberMeCredential) return true
  //   else return false
  // })
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
        // dispatch(
        //   SettingActions.setRememberMe(
        //     isRemember ? { username, password } : undefined
        //   )
        // )

        // dispatch(
        //   TempSettingActions.setSyncShieldActionType(Shield_Action.LOGIN)
        // )
        // normalLogin(username, password, () => handleProceedLogin(data, actions))
        replace('/?splashscreen=true')
        setIsSubmitting(false)
      } else {
        throw new Error(message)
      }
    } catch (error) {
      // showAlert(error)

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

    // navigateAfterLogin('/')
  }

  // const onCheckboxCheck = () => {
  //   setIsRemember(!isRemember)
  // }

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: validation.stringRequired,
      password: validation.stringRequired,
    }),
    onSubmit,
  })

  const { handleChange, handleBlur, values, errors, touched, submitForm } =
    formik

  return (
    <View
      sx={{
        width: '90%',
        py: 20,
      }}
    >
      <Input
        icon="profile-rounded"
        placeholder="Username"
        textContentType="username"
        value={values.username}
        onBlur={handleBlur('username')}
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
            : undefined
        }
      />
      <Input
        icon="pw"
        placeholder="Password"
        secureTextEntry
        textContentType="password"
        value={values.password}
        onBlur={handleBlur('password')}
        onChangeText={handleChange('password')}
        maxLength={PASSWORD_MAX_LENGTH}
        ref={passwordFieldRef}
        onSubmitEditing={submitForm}
        error={
          touched.password && errors.password
            ? t(errors.password, {
                field: t('common.password'),
              })
            : undefined
        }
      />

      <ButtonContainer sx={{ bg: '$secondary.500' }} onPress={submitForm}>
        {isSubmitting ? <ActivityIndicator /> : <ButtonText>LOGIN</ButtonText>}
      </ButtonContainer>
      <ButtonContainer sx={{ bg: '$primary.300' }}>
        <ButtonText>Register</ButtonText>
      </ButtonContainer>
    </View>
  )
}

const ButtonContainer = styled(Pressable)({
  borderRadius: 15,
  mb: 20,
  alignItems: 'center',
})

const ButtonText = styled(Text)({
  width: '100%',
  py: 15,
  px: 25,
  textAlign: 'center',
  textTransform: 'uppercase',
  fontWeight: 'bold',
})

export default LoginForm
