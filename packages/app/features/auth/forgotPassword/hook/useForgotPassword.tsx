import { MOBILE_PREFIX } from 'app/constants/country'
import useAlert from 'app/hooks/useAlert'
import useContainerWidth from 'app/hooks/useContainerWidth'
import useIsDesktop from 'app/hooks/useIsDesktop'
import validation from 'app/utils/validation'
import { FormikHelpers, useFormik } from 'formik'
import { useDynamicAnimation } from 'moti'
import { RefObject, useEffect, useMemo, useState } from 'react'
import { Platform, View as RNView } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { usePasswordRecoveryMutation } from 'services/authApi'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import { LoginType } from '../../AuthLayout'
import useAgentForgotPassword from './useAgentForgotPassword'

export interface ForgotPasswordFormValues {
  username: string
  contactNumber: string
  verifyCode: string
  password: string
  confirmPassword: string
  isAgent: boolean
}

export enum ForgotPassword_Screen {
  GET_OTP,
  SET_NEW_PASSWORD,
}

const { useParam } = createParam<{ t: LoginType }>()

function useForgotPassword(rootView: RefObject<RNView>, modalType?: LoginType) {
  const { showAlert } = useAlert()
  const width = useContainerWidth(rootView)

  const { replace } = useRouter()
  const { closeModal } = useModal()
  const desktop = useIsDesktop()
  const [currentScreen, setCurrentScreen] = useState<ForgotPassword_Screen>(
    ForgotPassword_Screen.GET_OTP
  )

  const [urlType] = useParam('t', { initial: LoginType.Member })

  const type = modalType ?? urlType

  const [recoverPassword] = usePasswordRecoveryMutation()
  const { agentResetPassword, agentSendOTP, isAgentLoading, isAgentSuccess } =
    useAgentForgotPassword()

  const isAgentLogin = useMemo(() => type === LoginType.Agent, [type])

  const onSubmit = async (
    forgotPasswordValues: ForgotPasswordFormValues,
    formikHelpers: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    try {
      if (isAgentLogin) {
        await agentResetPassword(forgotPasswordValues, formikHelpers)
      } else {
        const { password, confirmPassword, verifyCode, contactNumber } =
          forgotPasswordValues
        const data = await recoverPassword({
          password,
          cpassword: confirmPassword,
          // WIP: Prefix should not be hardcoded
          contactNumber: MOBILE_PREFIX.VND.replace('+', '') + contactNumber,
          verify_code: verifyCode,
        })
          .unwrap()
          .catch((error) => {
            showAlert(error)
            return error
          })

        if (data?.success) {
          Toast.show({ type: 'success', text1: data?.message })
          formikHelpers.resetForm()

          if (Platform.OS === 'web' && desktop) {
            closeModal()
          } else {
            replace('/auth/login')
          }
        }
      }
    } catch (error) {
      showAlert(error)
    }
  }

  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      contactNumber: '',
      verifyCode: '',
      isAgent: isAgentLogin,
    },
    validationSchema: Yup.object({
      username: Yup.string().when('isAgent', {
        is: true,
        then: () => {
          return validation.username
        },
      }),
      password: validation.password,
      confirmPassword: validation.confirmPassword,
      contactNumber: validation.phoneNumber,
      verifyCode: validation.verifyCode,
    }),
    onSubmit,
    enableReinitialize: true,
  })

  const onForgotPasswordSubmit = () => {
    setCurrentScreen(ForgotPassword_Screen.SET_NEW_PASSWORD)
    animationState.animateTo({
      translateX: -width,
    })
  }

  const onBack = () => {
    setCurrentScreen(ForgotPassword_Screen.GET_OTP)
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
    isAgentLogin,
    agentSendOTP,
    isAgentLoading,
    isAgentSuccess,
    formik,
    onForgotPasswordSubmit,
    onBack,
    currentScreen,
  }
}

export default useForgotPassword
