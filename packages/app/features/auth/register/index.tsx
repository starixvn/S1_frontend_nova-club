import { APP_DEVICE_ANDROID, APP_DEVICE_IOS } from 'app/constant/redux'
import useAlert from 'app/hooks/useAlert'
import useBioAuth from 'app/hooks/useBioAuth'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useUniqueId from 'app/hooks/useUniqueId'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { SettingActions } from 'app/store/setting.slice'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { isBannedTrackingCode } from 'app/utils/referralUtil'
import validation from 'app/utils/validation'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import { AnimatePresence, MotiView, useDynamicAnimation } from 'moti'
import React, { useEffect, useMemo, useState } from 'react'
import { Platform } from 'react-native'
import { useRegisterMutation } from 'services/authApi'
import {
  LoginResult,
  RegisterResult,
  Shield_Action,
} from 'services/authApi.type'
import { createParam } from 'solito'
import * as Yup from 'yup'
import AuthLayout from '../layout/AuthLayout'
import VerificationPage from '../verification'
import ReferrerInformation from './ReferrerInformation'
import RegisterForm from './RegisterForm'
import { LoginType } from '../type'
import { useAgentRegisterMutation } from 'agent/services/authApi'
import { AgentAuthActions } from 'agent/store/agentAuthReducer'
import { useLazyUserInfoQuery } from 'agent/services/userApi'
import { usePlayerProfileQuery } from 'services/playerApi'

export type RegisterFormValues = {
  username: string
  password: string
  confirmPassword: string
  contactNumber: string
  verifyCode: string
  terms: boolean
}

const { useParam } = createParam<{ t: LoginType; ref: string }>()
const RegisterPage = () => {
  const [ref] = useParam('ref')
  const [type] = useParam('t', { initial: LoginType.Member })
  const isAgent = useMemo(() => type === LoginType.Agent, [type])

  const [register] = useRegisterMutation()
  const [agentRegister] = useAgentRegisterMutation()
  const [getUserInfo] = useLazyUserInfoQuery()
  const dispatch = useAppDispatch()
  const { replace, clear } = useContextualRouter()
  const { showAlert } = useAlert()
  const { width } = useContainerDimension()
  const { t } = useLocalization()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { uuid } = useUniqueId()

  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const { data } = usePlayerProfileQuery(undefined, {
    skip: !isLoggedIn,
  })
  const referralCode = data?.referral_code ?? ''

  // const { syncShield } = useShield()

  /* allow /auth/register to pass in ref code from query string, same as /download page */
  useEffect(() => {
    if (typeof ref === 'string') {
      dispatch(
        SettingActions.setReferral({
          trackingCode: ref,
        })
      )
    }
  }, [dispatch, ref])

  const { normalLogin } = useBioAuth()
  // referral value is obtained asynchronously, do not assign to initialValues of form.
  // consume it on onSubmit
  const referral = useAppSelector((s) => s.setting.referral)
  const trackingCode = referral?.trackingCode

  const handleOnSuccessRegister = (data?: RegisterResult) => {
    dispatch(AuthActions.setAuthInfo(data as LoginResult))

    if (Platform.OS === 'web') {
      replace('/')
    } else clear()
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
      // console.log('TOKEN: ', data as LoginResult)
      // syncShield(Shield_Action.REGISTER)
      dispatch(
        TempSettingActions.setSyncShieldActionType(Shield_Action.REGISTER)
      )
      dispatch(AuthActions.setAuthInfo(data as LoginResult))

      normalLogin(username, password, () => handleOnSuccessRegister(data))
      /* to indicate the register is successfull and used to persist loading on submit button */
      setStatus(true)
    } else {
      showAlert(message)
    }
    setIsSubmitting(false)
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
  ) => {
    const { result, success, message } = await agentRegister({
      currency: {
        VND: {
          CASH: '1',
        },
      },
      username,
      password,
      confirmpassword: confirmPassword,
      // WIP: Prefix should not be hardcoded
      mobile_no: '84' + contactNumber,
      // terms,
      referral_code: isLoggedIn ? referralCode : '',
      OTP: verifyCode,
    }).unwrap()

    if (success && result) {
      dispatch(AgentAuthActions.setAgentAuthToken(result.data.access_token))
      const resp = await getUserInfo().unwrap()

      replace('/agent/profile')

      /* to indicate the register is successfull and used to persist loading on submit button */
      setStatus(true)
    } else {
      showAlert(message)
    }
    setIsSubmitting(false)
  }

  const onSubmit = async (
    registerValues: RegisterFormValues,
    formikHelpers: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      setIsSubmitting(true)
      isAgent
        ? handleAgentRegister(registerValues, formikHelpers)
        : handleMemberRegister(registerValues, formikHelpers)
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
      terms: true,
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
    /** Fix if user change screen size (eg: Screen orientation)
     * Else the `translateX` will stick to previous screen width
     */
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
        style={{ width }}
        transition={{
          type: 'timing',
          duration: 400,
        }}
      >
        <AuthLayout
          formHeader={
            <AnimatePresence>
              {referral && <ReferrerInformation />}
            </AnimatePresence>
          }
          headerDesc={t('auth.accountReg')}
          headerColor="#ffffff"
          gradientColor={[
            '#a60102',
            '#b30303',
            '#cc0707',
            '#fe3434',
            '#fc9e9e',
          ]}
        >
          <View sx={{ alignItems: 'center', pt: '$8', flex: 1 }}>
            <View sx={{ width: '75%', flex: 1 }}>
              <RegisterForm
                isAgent={isAgent}
                formik={formik}
                onSuccess={onRegisterSuccess}
              />
            </View>
          </View>
        </AuthLayout>
      </MotiView>

      <MotiView
        state={animationState}
        style={{ width }}
        transition={{
          type: 'timing',
          duration: 400,
        }}
      >
        <VerificationPage
          isAgent={isAgent}
          formik={formik}
          isSubmitting={isSubmitting}
          onBack={onBack}
        />
      </MotiView>
    </View>
  )
}

export default RegisterPage
