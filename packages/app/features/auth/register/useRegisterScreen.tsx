import useAlert from 'app/hooks/useAlert'
import useUniqueId from 'app/hooks/useUniqueId'
import { useAppSelector } from 'app/provider/redux/store'
import { APP_DEVICE_IOS, APP_DEVICE_ANDROID } from 'app/utils/constant'
import { isBannedTrackingCode } from 'app/utils/referralUtil'
import validation from 'app/utils/validation'
import { FormikHelpers, useFormik } from 'formik'
import { useDynamicAnimation } from 'moti'
import { useState, useMemo, useEffect, RefObject } from 'react'
import { Platform } from 'react-native'
import { useRegisterMutation } from 'services/authApi'
import { createParam } from 'solito'
import { LoginType } from '../AuthTypeSelection'
import { RegisterFormValues } from './RegisterScreen'
import useContainerWidth from 'app/hooks/useContainerWidth'
import { View as RNView } from 'react-native'
import * as Yup from 'yup'

const { useParam } = createParam<{ t: LoginType }>()

export default function useRegisterScreen(rootView: RefObject<RNView>) {
  const { showAlert } = useAlert()
  const width = useContainerWidth(rootView)

  const [routes] = useState([
    { key: 'first', title: 'common.player', index: 0 },
    { key: 'second', title: 'common.agent', index: 1 },
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

  return {
    animationState,
    width,
    routes,
    index,
    handlePress,
    isAgentLogin,
    formik,
    onRegisterSuccess,
    onBack,
  }
}
