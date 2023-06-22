import CustomTabBar, {
  TabBarSelection,
} from 'app/components/navigation/CustomTabBar'
import { View } from 'dripsy'
import { useMemo, useState } from 'react'
import RegisterForm from './RegisterForm'
import { LoginType } from '../AuthTypeSelection'
import { createParam } from 'solito'
import useLocalization from 'app/provider/localization'
import { FormikHelpers, useFormik } from 'formik'
import { RegisterFormValues } from './RegisterScreen'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import useAlert from 'app/hooks/useAlert'
import { useAppSelector } from 'app/provider/redux/store'
import useUniqueId from 'app/hooks/useUniqueId'
import { useRegisterMutation } from 'services/authApi'
import { isBannedTrackingCode } from 'app/utils/referralUtil'
import { Platform } from 'react-native'
import { APP_DEVICE_ANDROID, APP_DEVICE_IOS } from 'app/utils/constant'
import AccountVerificationForm from './AccountVerificationForm'

const { useParam } = createParam<{ t: LoginType }>()

const RegisterFormLayout = () => {
  const [isStepOne, setIsStepOne] = useState(true)
  const { t } = useLocalization()
  const { showAlert } = useAlert()
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

  console.log('check switch page still exist', formik.values.username)

  return (
    <View sx={{ width: '90%', alignSelf: 'center' }}>
      {isStepOne ? (
        <>
          <View sx={{ width: '100%', minHeight: 60 }}>
            <TabBarSelection
              currentIndex={index}
              onPress={handlePress}
              routes={routes}
            />
          </View>
          <RegisterForm
            isAgent={isAgentLogin}
            formik={formik}
            onSuccess={() => setIsStepOne(!isStepOne)}
          />
        </>
      ) : (
        <View sx={{ mt: 60 }}>
          <AccountVerificationForm isAgent={isAgentLogin} formik={formik} />
        </View>
      )}
    </View>
  )
}

export default RegisterFormLayout
