import { useAgentRegisterMutation } from 'agent/services/authApi'
import { useLazyUserInfoQuery, useUserInfoQuery } from 'agent/services/userApi'
import { AgentAuthActions } from 'agent/store/agentAuthReducer'
import { MOBILE_PREFIX } from 'app/constants/country'
import useAlert from 'app/hooks/useAlert'
import useContainerWidth from 'app/hooks/useContainerWidth'
import useUniqueId from 'app/hooks/useUniqueId'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { APP_DEVICE_ANDROID, APP_DEVICE_IOS } from 'utils/constant'
import { isBannedTrackingCode } from 'app/utils/referralUtil'
import validation from 'app/utils/validation'
import { FormikHelpers, useFormik } from 'formik'
import { useDynamicAnimation } from 'moti'
import { RefObject, useCallback, useEffect, useMemo, useState } from 'react'
import { Linking, Platform, View as RNView } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useRegisterMutation } from 'services/authApi'
import { LoginResult, Shield_Action } from 'services/authApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import { LoginType } from '../AuthLayout'
import { RegisterFormValues } from './RegisterScreen'
import { agentRoute, memberRoute } from '../login/LoginScreen'
import useLocalization from 'app/provider/localization'

const { useParam } = createParam<{ t: LoginType }>()

export enum Register_Screen {
  SET_USERNAME,
  ACCOUNT_VERIFICATION,
}

export default function useRegisterScreen(
  rootView: RefObject<RNView>,
  modalType?: LoginType
) {
  const { t } = useLocalization()
  const { showAlert } = useAlert()
  const width = useContainerWidth(rootView)
  const dispatch = useAppDispatch()
  const { replace } = useRouter()
  const { closeModal, currentModal } = useModal()

  const [currentScreen, setCurrentScreen] = useState<Register_Screen>(
    Register_Screen.SET_USERNAME
  )

  const [paramType, setIsAgentLogin] = useParam('t')
  const type = paramType ?? modalType

  const [index, setIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isAgentLogin = type === LoginType.Agent

  const agentToken = useAppSelector((s) => s.agent.access_token)

  const { agentCurrency } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      agentCurrency: data?.wallet.currency,
    }),
    skip: !agentToken,
  })

  const referral = useAppSelector((s) => s.setting.referral)
  const trackingCode = referral?.trackingCode
  const { uuid } = useUniqueId()
  const [register] = useRegisterMutation()
  const [agentRegister] = useAgentRegisterMutation()
  const [getUserInfo] = useLazyUserInfoQuery()

  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const memberToken = useAppSelector((state) => state.auth.info?.token)
  const { openModal } = useModal()

  const { data } = usePlayerProfileQuery(undefined, {
    skip: !isLoggedIn,
  })
  const referralCode = data?.referral_code ?? ''

  const handlePress = (value) => {
    setIsAgentLogin(index === 0 ? LoginType.Agent : LoginType.Member)
    setIndex(value)
  }

  const routes = useMemo(
    () => (memberToken ? [agentRoute] : [memberRoute, agentRoute]),
    [memberToken]
  )

  useEffect(() => {
    const initT = routes.find((e) => {
      return e.type === type
    })
    if (initT) setIndex(initT.index)
  }, [routes, type])

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
      tracking_code: !!agentToken
        ? ''
        : trackingCode && !isBannedTrackingCode(trackingCode)
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
      agent_currency: !!agentToken ? agentCurrency : '',
      agent_token: !!agentToken ? agentToken : '',
    }).unwrap()

    if (success) {
      // This must be flagged true, before auth resuls it set.
      dispatch(TempSettingActions.setIsHomeEventModalTriggered(true))
      dispatch(AuthActions.setAuthInfo(data as LoginResult))
      dispatch(
        TempSettingActions.setSyncShieldActionType(Shield_Action.REGISTER)
      )

      if (currentModal) {
        closeModal()
      }

      // replace('/')

      //temporary disable auto popup till modal closed
      setTimeout(() => {
        openModal('ActionableModal', {
          title: t('authentication.registerSuccess.m1'),
          message: t('authentication.registerSuccess.m2'),
          onClose: () => {
            dispatch(TempSettingActions.setIsHomeEventModalTriggered(false))
            replace('/')
          },
          actions: [
            {
              label: t('home.joinNow'),
              onPress: () => Linking.openURL('https://t.me/cungvui123'),
            },
          ],
        })
      }, 1000)

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
  ) => {
    const { result, success, message } = await agentRegister({
      currency: {
        VND: {
          CASH: '1',
        },
      },
      username: username?.toLowerCase(),
      password,
      confirmpassword: confirmPassword,
      // WIP: Prefix should not be hardcoded
      mobile_no: MOBILE_PREFIX.VND + contactNumber,
      // terms,
      referral_code: isLoggedIn ? referralCode : '',
      OTP: verifyCode,
    }).unwrap()

    if (success && result) {
      dispatch(AgentAuthActions.setAgentAuthToken(result.data.access_token))
      const resp = await getUserInfo().unwrap()

      if (currentModal) {
        closeModal()
      }

      // replace('/agent/profile')

      setTimeout(() => {
        openModal('ActionableModal', {
          title: t('authentication.registerSuccess.a1'),
          message: t('authentication.registerSuccess.a2'),
          onClose: () => replace('/agent/profile'),
          actions: [
            {
              label: t('home.joinNow'),
              onPress: () => Linking.openURL('https://t.me/vui123Daily'),
            },
          ],
        })
      }, 1000)
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
      await (isAgentLogin
        ? handleAgentRegister(registerValues, formikHelpers)
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

  const animationState = useDynamicAnimation(() => {
    return {
      translateX: 0,
    }
  })

  const onBack = useCallback(() => {
    setCurrentScreen(Register_Screen.SET_USERNAME)
    animationState.animateTo({
      translateX: 0,
    })
  }, [animationState])

  const onRegisterSuccess = useCallback(() => {
    setCurrentScreen(Register_Screen.ACCOUNT_VERIFICATION)

    animationState.animateTo({
      translateX: -width,
    })
  }, [animationState, width])

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
    currentScreen,
  }
}
