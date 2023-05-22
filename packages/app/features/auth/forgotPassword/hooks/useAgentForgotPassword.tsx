import {
  useResetPwMutation,
  useResetPwSendOtpMutation,
} from 'agent/services/authApi'
import { MOBILE_PREFIX } from 'app/constant/country'
import useAlert from 'app/hooks/useAlert'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { FormikHelpers } from 'formik'
import { Platform } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ForgotPasswordFormValues } from '..'
import { LoginType } from '../../type'

const useAgentForgotPassword = () => {
  const { push, replace } = useContextualRouter()
  const { showAlert } = useAlert()

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
      // WIP: Prefix should not be hardcoded
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
      if (Platform.OS === 'web') replace('/auth/login', { t: LoginType.Agent })
      else push('/auth/login', { t: LoginType.Agent })
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
