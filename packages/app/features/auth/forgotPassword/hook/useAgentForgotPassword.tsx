import {
  useResetPwMutation,
  useResetPwSendOtpMutation,
} from 'agent/services/authApi'
import useAlert from 'app/hooks/useAlert'
import { FormikHelpers } from 'formik'
import { Platform } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { MOBILE_PREFIX } from 'app/constants/country'
import { useRouter } from 'solito/router'
import { useModal } from 'react-native-modalfy'
import { ForgotPasswordFormValues } from './useForgotPassword'
import { LoginType } from '../../AuthTypeSelection'
import isDesktop from 'app/utils/isDesktop'

const useAgentForgotPassword = () => {
  const { push } = useRouter()
  const { closeModal } = useModal()
  const { showAlert } = useAlert()
  const desktop = isDesktop()

  const [
    postSendOtp,
    { isLoading: isAgentLoading, isSuccess: isAgentSuccess },
  ] = useResetPwSendOtpMutation()
  const [postResetPassword] = useResetPwMutation()

  const agentResetPassword = async (
    formValues: ForgotPasswordFormValues,
    actions: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    const { username, password, confirmPassword, verifyCode, contactNumber } =
      formValues

    const data = await postResetPassword({
      username,
      password,
      confirmpassword: confirmPassword,
      mobile_no: MOBILE_PREFIX.VND + contactNumber,
      OTP: verifyCode,
    })
      .unwrap()
      .catch((error) => {
        showAlert(error)
        return error
      })

    if (data?.success) {
      Toast.show({ type: 'success', text1: data?.message })
      actions.resetForm()

      if (Platform.OS === 'web' && desktop) {
        closeModal()
      } else {
        push({
          pathname: '/auth/login',
          query: {
            t: LoginType.Agent,
          },
        })
      }
    }
  }

  const agentSendOTP = async (OTPRef, username, contactNumber) => {
    try {
      const { data, message, success } = await postSendOtp({
        // WIP: Prefix should not be hardcoded
        username,
        mobile_no: MOBILE_PREFIX.VND + contactNumber,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })

      OTPRef.current?.startOtpTimer()

      if (success) {
        Toast.show({ type: 'success', text1: message })
      }
    } catch (error) {
      showAlert(error)
    }
  }

  return {
    agentResetPassword,
    agentSendOTP,
    isAgentLoading,
    isAgentSuccess,
  }
}

export default useAgentForgotPassword
