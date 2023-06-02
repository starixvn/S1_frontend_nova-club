import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import validation from 'app/utils/validation'
import { FormikHelpers, useFormik } from 'formik'
import { MotiView, useDynamicAnimation } from 'moti'
import { useEffect, useMemo, useState } from 'react'
import { createParam } from 'solito'
import * as Yup from 'yup'
import AuthLayout from '../AuthLayout'
import { LoginType } from '../AuthTypeSelection'
import RegisterForm from './RegisterForm'
import AccountVerificationForm from './AccountVerificationForm'
import { View } from 'dripsy'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import { useRegisterMutation } from 'services/authApi'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { isBannedTrackingCode } from 'app/utils/referralUtil'
import useUniqueId from 'app/hooks/useUniqueId'
import { Platform } from 'react-native'
import { APP_DEVICE_ANDROID, APP_DEVICE_IOS } from 'app/utils/constant'
import useAlert from 'app/hooks/useAlert'

const { useParam } = createParam<{ t: LoginType }>()

export type RegisterFormValues = {
  username: string
  password: string
  confirmPassword: string
  contactNumber: string
  verifyCode: string
  terms: boolean
}

const RegisterScreen = () => {
  const { t } = useLocalization()
  const dispatch = useAppDispatch()
  const { showAlert } = useAlert()
  const { width } = useContainerDimension()
  const [routes] = useState([
    { key: 'first', title: t('common.player'), index: 0 },
    { key: 'second', title: t('common.agent'), index: 1 },
  ])
  const [type, setIsAgentLogin] = useParam('t', { initial: LoginType.Member })
  const [index, setIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isAgentLogin = useMemo(() => type === LoginType.Agent, [type])

  const referral = useAppSelector((s) => s.setting.referral)
  const trackingCode = referral?.trackingCode
  const { uuid } = useUniqueId()
  const [register] = useRegisterMutation()

  const handlePress = (value) => {
    setIsAgentLogin(index === 0 ? LoginType.Agent : LoginType.Member)
    setIndex(value)
  }

  const handleMemberRegister = async (
    {
      username,
      password,
      confirmPassword,
      verifyCode,
      terms,
      contactNumber,
    }: RegisterFormValues,
    { setStatus }: FormikHelpers<RegisterFormValues>
  ) => {
    const { data, success, message } = await register({
      username,
      password,
      cpassword: confirmPassword,
      // WIP: Prefix should not be hardcoded
      contactNumber: '84' + contactNumber,
      terms,
      tracking_code:
        trackingCode && !isBannedTrackingCode(trackingCode)
          ? trackingCode
          : undefined,
      verify_code: verifyCode,
      platform_uuid: uuid ?? '',
      device_os:
        Platform.OS !== 'web'
          ? Platform.OS === 'ios'
            ? APP_DEVICE_IOS
            : APP_DEVICE_ANDROID
          : '',
      registered_by: Platform.OS !== 'web' ? 'APP' : '',
    }).unwrap()

    if (success) {
      // dispatch()
      setStatus(true)
    } else {
      showAlert(message)
    }
  }

  const handleAgentRegister = async (
    {
      username,
      password,
      confirmPassword,
      verifyCode,
      contactNumber,
    }: RegisterFormValues,
    { setStatus }: FormikHelpers<RegisterFormValues>
  ) => {}

  const onSubmit = async (
    registerValues: RegisterFormValues,
    formikHelpers: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      setIsSubmitting(true)
      await (isAgentLogin
        ? console.log('handle agent register')
        : handleMemberRegister(registerValues, formikHelpers))
    } catch (error) {
      showAlert(error)
      setIsSubmitting(false)
    }
  }

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      contactNumber: '',
      verifyCode: '',
      terms: false,
    },
    validationSchema: Yup.object({
      username: validation.username,
      password: validation.password,
      confirmPassword: validation.confirmPassword,
      contactNumber: validation.phoneNumber,
      verifyCode: validation.verifyCode,
      terms: Yup.bool()
        .required('validation.required')
        .oneOf([true], 'validation.checked'),
    }),
    onSubmit,
  })

  const onRegisterSuccess = () => {
    animationState.animateTo({
      translateX: -width,
    })
  }

  const onBack = () => {
    animationState.animateTo({
      translateX: 0,
    })
  }

  const animationState = useDynamicAnimation(() => {
    return {
      translateX: 0,
    }
  })

  useEffect(() => {
    const currentX = animationState.current?.translateX

    if (typeof currentX === 'number' && currentX < 0) {
      animationState.animateTo({
        translateX: -width,
      })
    }
  }, [width])

  return (
    <View sx={{ flexDirection: 'row', flex: 1, overflow: 'hidden' }}>
      <MotiView
        state={animationState}
        transition={{
          type: 'timing',
          duration: 400,
        }}
        style={{ width }}
      >
        <AuthLayout>
          <View sx={{ width: '100%' }}>
            <CustomTabBar
              currentIndex={index}
              onPress={handlePress}
              routes={routes}
            />
          </View>
          <RegisterForm
            isAgent={isAgentLogin}
            formik={formik}
            onSuccess={onRegisterSuccess}
          />
        </AuthLayout>
      </MotiView>

      <MotiView
        state={animationState}
        transition={{
          type: 'timing',
          duration: 400,
        }}
        style={{ width }}
      >
        <AuthLayout onBack={onBack}>
          <AccountVerificationForm isAgent={isAgentLogin} formik={formik} />
        </AuthLayout>
      </MotiView>
    </View>
  )
}

export default RegisterScreen
