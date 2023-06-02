import { FormikHelpers, useFormik } from 'formik'
import AuthLayout from '../AuthLayout'
import ForgotPasswordForm from './ForgotPasswordForm'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import { MotiView, useDynamicAnimation } from 'moti'
import { View } from 'dripsy'
import ResetPasswordForm from './ResetPasswordForm'
import { useEffect, useState } from 'react'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useAlert from 'app/hooks/useAlert'
import { usePasswordRecoveryMutation } from 'services/authApi'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { Platform } from 'react-native'
import { useRouter } from 'solito/router'
import useLocalization from 'app/provider/localization'

export type ForgotPasswordFormValues = {
  contactNumber: string
  verifyCode: string
  password: string
  confirmPassword: string
}

const ForgotPasswordScreen = () => {
  const { t } = useLocalization()
  const { width } = useContainerDimension()
  const { showAlert } = useAlert()
  const { push, replace } = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recoverPassword] = usePasswordRecoveryMutation()

  const onSubmit = async (
    forgotPasswordValues: ForgotPasswordFormValues,
    formikHelpers: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    try {
      setIsSubmitting(true)
      const { password, confirmPassword, verifyCode, contactNumber } =
        forgotPasswordValues
      const data = await recoverPassword({
        password,
        cpassword: confirmPassword,
        // WIP: Prefix should not be hardcoded
        contactNumber: '84' + contactNumber,
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
        if (Platform.OS === 'web') replace('/auth/login')
        else push('/auth/login')
      }
    } catch (error) {
      showAlert(error)
      setIsSubmitting(false)
    }
  }

  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      contactNumber: '',
      verifyCode: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: validation.password,
      confirmPassword: validation.confirmPassword,
      contactNumber: validation.phoneNumber,
      verifyCode: validation.verifyCode,
    }),
    onSubmit,
  })

  const onCodeSubmit = () => {
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
        <AuthLayout headerDesc={t('authentication.forgotPasswordHeader')}>
          <ForgotPasswordForm formik={formik} onCodeSubmit={onCodeSubmit} />
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
        <AuthLayout
          headerDesc={t('authentication.resetPasswordHeader')}
          onBack={onBack}
        >
          <ResetPasswordForm formik={formik} />
        </AuthLayout>
      </MotiView>
    </View>
  )
}

export default ForgotPasswordScreen
