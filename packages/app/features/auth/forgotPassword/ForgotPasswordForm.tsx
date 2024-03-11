import TimerButton, { ITimerButtonForwardRef } from 'app/components/TimerButton'
import Button from 'app/components/common/Button'
import FormContainer from 'app/components/form/FormContainer'
import Input from 'app/components/form/Input'
import { MOBILE_PREFIX } from 'app/constants/country'
import useAlert from 'app/hooks/useAlert'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { USERNAME_MAX_LENGTH } from 'app/utils/validation'
import { styled } from 'dripsy'
import { FormikProps, FormikTouched } from 'formik'
import { ComponentProps, useRef } from 'react'
import { Platform, TextInput } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useSendPasswordRecoveryOtpMutation } from 'services/authApi'
import { useRouter } from 'solito/router'
import ReceiveOTPContact from '../components/ReceiveOTPContact'
import useForgotPassword, {
  ForgotPasswordFormValues,
} from './hook/useForgotPassword'

const StyledFormContainer = styled(FormContainer)({
  py: '$4',
})

type AccountVerificationFormProps = {
  formik: FormikProps<ForgotPasswordFormValues>
  onCodeSubmit: () => void
  isAgentLogin: boolean
  isAgentLoading: boolean
  isAgentSuccess: boolean
  agentSendOTP: ReturnType<typeof useForgotPassword>['agentSendOTP']
} & ComponentProps<typeof StyledFormContainer>

const ForgotPasswordForm = ({
  formik,
  onCodeSubmit,
  isAgentLogin,
  isAgentLoading,
  isAgentSuccess,
  agentSendOTP,
  ...rest
}: AccountVerificationFormProps) => {
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    submitForm,
    setTouched,
    setFieldValue,
    validateForm,
  } = formik

  const { t } = useLocalization()
  const { push } = useRouter()
  const { showAlert } = useAlert()
  const locale = useAppSelector((s) => s.setting.locale)

  const otpFieldRef = useRef<TextInput>(null)
  const contactNumRef = useRef<TextInput>(null)
  const OTPTimerRef = useRef<ITimerButtonForwardRef>(null)
  const desktop = useIsDesktop()

  const isFormFieldValid = async (
    fields: FormikTouched<ForgotPasswordFormValues>
  ) => {
    setTouched(fields)
    const formError = await validateForm()

    const fieldKeys = Object.keys(fields)
    const fieldErrorVal = fieldKeys.find((key) => formError[key])

    return typeof fieldErrorVal === 'undefined'
  }

  const [sendOtp, { isLoading: isOtpLoading, isSuccess }] =
    useSendPasswordRecoveryOtpMutation()

  const onSubmit = async () => {
    const isFormValid = await isFormFieldValid({
      username: true,
      contactNumber: true,
      verifyCode: true,
    })

    if (isFormValid) {
      onCodeSubmit()
    }
  }

  const sendOTP = async () => {
    try {
      const { data, message, success } = await sendOtp({
        contactNumber: MOBILE_PREFIX.VND + values.contactNumber,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })

      OTPTimerRef.current?.startOtpTimer()

      if (success) {
        Toast.show({ type: 'success', text1: message })
        otpFieldRef.current?.focus()
      }
    } catch (error) {
      showAlert(error)
    }
  }

  const onSendOtp = async () => {
    const isValid = await isFormFieldValid({
      username: true,
      contactNumber: true,
    })

    if (isValid) {
      isAgentLogin
        ? agentSendOTP(OTPTimerRef, values.username, values.contactNumber)
        : sendOTP()
    }
  }

  return (
    <StyledFormContainer {...rest}>
      {isAgentLogin && (
        <Input
          icon="profile-rounded"
          placeholder={t('common.username')}
          textContentType="username"
          value={values.username}
          onBlur={handleBlur('username')}
          onChangeText={handleChange('username')}
          autoCapitalize="none"
          maxLength={USERNAME_MAX_LENGTH}
          autoComplete="username"
          onSubmitEditing={() => {
            contactNumRef.current?.focus()
          }}
          error={
            touched.username && errors.username
              ? t(errors.username, {
                  field: t('common.username'),
                })
              : undefined
          }
        />
      )}

      <Input
        ref={contactNumRef}
        icon="icon-hp"
        textContentType="telephoneNumber"
        prefix="+84"
        inputMode="tel"
        keyboardType="number-pad"
        autoComplete="tel"
        maxLength={9}
        action={
          <TimerButton
            accessibilityRole="button"
            ref={OTPTimerRef}
            title={t('authentication.send')}
            loading={isOtpLoading || isAgentLoading}
            onPress={onSendOtp}
            sx={{
              width: 'auto',
              backgroundColor: '$otp',
              m: 0,
              px: 6,
              minWidth: 53,
              minHeight: 28,
            }}
            _text={{
              sx: {
                color: '$white',
                fontWeight: 'bold',
              },
            }}
          />
        }
        value={values.contactNumber}
        onBlur={handleBlur('contactNumber')}
        onChangeText={handleChange('contactNumber')}
        onSubmitEditing={() => {
          otpFieldRef.current?.focus()
        }}
        error={
          touched.contactNumber && errors.contactNumber
            ? t(errors.contactNumber, {
                field: t('common.phone'),
              })
            : undefined
        }
      />
      <Input
        ref={otpFieldRef}
        icon="otp"
        placeholder={t('authentication.enterOtp')}
        textContentType="oneTimeCode"
        prefix="OTP"
        inputMode="numeric"
        keyboardType="number-pad"
        value={values.verifyCode}
        onBlur={handleBlur('verifyCode')}
        onChangeText={handleChange('verifyCode')}
        maxLength={6}
        editable={isSuccess || isAgentSuccess}
        onSubmitEditing={onSubmit}
        inputContainerSx={{ opacity: isSuccess || isAgentSuccess ? 1 : 0.3 }}
        error={
          touched.verifyCode && errors.verifyCode
            ? t(errors.verifyCode, {
                field: t('common.otp'),
              })
            : undefined
        }
        {...(Platform.OS === 'web' && {
          disabled: !isSuccess && !isAgentSuccess,
        })}
      />

      <ReceiveOTPContact
        sx={{
          mt: desktop ? 'auto' : '$4',
        }}
      />

      <Button
        onPress={onSubmit}
        sx={{
          bg: '$secondary.500',
          mt: '$3',
        }}
      >
        {t('common.submit')}
      </Button>
    </StyledFormContainer>
  )
}

export default ForgotPasswordForm
