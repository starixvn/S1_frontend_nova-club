import { Button } from 'app/components/form/Button'
import TextInput from 'app/components/form/TextInput'
import TimerButton, { ITimerButtonForwardRef } from 'app/components/TimerButton'
import useAlert from 'app/hooks/useAlert'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { Pressable, Text, useDripsyTheme, View } from 'dripsy'
import Checkbox from 'expo-checkbox'
import { FormikProps } from 'formik'
import React, { useRef } from 'react'
import { Platform, TextInput as RNTextField } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useSendRegistrationOtpMutation } from 'services/authApi'
import ReceiveOTPContact from '../common/ReceiveOTPContact'
import AuthLayout from '../layout/AuthLayout'
import { RegisterFormValues } from '../register'
import { useAgentRegisterOtpMutation } from 'agent/services/authApi'
import { MOBILE_PREFIX } from 'app/constant/country'

interface VerificationFormProps {
  isAgent: boolean
  formik: FormikProps<RegisterFormValues>
  onBack: () => void
  isSubmitting: boolean
}

const VerificationForm = ({
  isAgent,
  formik,
  onBack,
  isSubmitting,
}: VerificationFormProps) => {
  const { t } = useLocalization()
  const { showAlert } = useAlert()

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    submitForm,
    validateForm,
    setFieldValue,
    setTouched,
  } = formik

  const OTPRef = useRef<ITimerButtonForwardRef>(null)

  const { theme } = useDripsyTheme()
  const dispatch = useAppDispatch()
  const { push } = useContextualRouter()
  const locale = useAppSelector((s) => s.setting.locale)

  const otpFieldRef = useRef<RNTextField>(null)

  const [sendRegistrationOtp, { isLoading, isSuccess }] =
    useSendRegistrationOtpMutation()

  const [
    sendAgentRegistrationOtp,
    { isLoading: isAgentOtpLoading, isSuccess: isAgentOtpSuccess },
  ] = useAgentRegisterOtpMutation()

  const onCheckboxCheck = () => {
    setFieldValue('terms', !values.terms)
  }

  const isContactNumValid = async () => {
    setTouched({ contactNumber: true })
    const { contactNumber } = await validateForm()

    if (contactNumber) return false

    return true
  }

  const sendOTP = async () => {
    try {
      const { data, message, success } = await sendRegistrationOtp({
        username: values.username?.toLowerCase(),
        // WIP: Prefix should not be hardcoded
        contactNumber: '84' + values.contactNumber,
      }).unwrap()

      if (success) {
        OTPRef.current?.startOtpTimer()
        Toast.show({ type: 'success', text1: message })
      }
    } catch (error) {
      showAlert(error)
    }
  }

  const sendAgentOTP = async () => {
    try {
      const { data, message, success } = await sendAgentRegistrationOtp({
        username: values.username?.toLowerCase(),
        // WIP: Prefix should not be hardcoded
        mobile_no: MOBILE_PREFIX.VND + values.contactNumber,
      }).unwrap()

      if (success) {
        OTPRef.current?.startOtpTimer()
        Toast.show({ type: 'success', text1: message })
      }
    } catch (error) {
      showAlert(error)
    }
  }

  const onSendOtp = async () => {
    const isValid = await isContactNumValid()

    if (isValid) {
      isAgent ? sendAgentOTP() : sendOTP()
    }
  }

  const handlePressTnC = () => {
    const params = {
      locale: locale,
    }
    push('/auth/register/tnc', params)
  }

  return (
    <AuthLayout
      headerDesc={t('auth.accountVerification')}
      headerColor="#ffffff"
      gradientColor={['#a60102', '#b30303', '#cc0707', '#fe3434', '#fc9e9e']}
      onBack={onBack}
    >
      <View sx={{ alignItems: 'center', pt: '$8', flex: 1 }}>
        <View sx={{ width: '75%', flex: 1 }}>
          <TextInput
            _icon="avatar"
            // WIP: Prefix should not be hardcoded
            prefix="+84"
            _input={{
              maxLength: 9,
              placeholder: '',
              value: values.contactNumber,
              onChangeText: handleChange('contactNumber'),
              onBlur: handleBlur('contactNumber'),
              autoCapitalize: 'none',
              onSubmitEditing: () => {
                otpFieldRef.current?.focus()
              },
              keyboardType: 'number-pad',
            }}
            error={
              touched.contactNumber && errors.contactNumber
                ? t(errors.contactNumber, { field: t('profile.details.phone') })
                : undefined
            }
          />

          <TextInput
            _icon="lock"
            prefix="OTP"
            _input={{
              placeholder: t('auth.enterOtp'),
              value: values.verifyCode,
              onChangeText: handleChange('verifyCode'),
              onBlur: handleBlur('verifyCode'),
              ref: otpFieldRef,
              onSubmitEditing: submitForm,
              keyboardType: 'number-pad',
              maxLength: 6,
              editable: isSuccess || isAgentOtpSuccess,
              ...(Platform.OS === 'web' && {
                disabled: !isSuccess && !isAgentOtpSuccess,
              }),
            }}
            error={
              touched.verifyCode && errors.verifyCode
                ? t(errors.verifyCode, { field: t('common.otp') })
                : undefined
            }
            endIcon={
              <TimerButton
                accessibilityRole="button"
                ref={OTPRef}
                title={t('common.send')}
                loading={isLoading || isAgentOtpLoading}
                onPress={onSendOtp}
                sx={{
                  width: 'auto',
                  backgroundColor: theme.colors.$gray,
                  m: 0,
                  px: '$3',
                  minWidth: 53,
                }}
                _text={{
                  sx: {
                    color: theme.colors.$black,
                  },
                }}
              ></TimerButton>
            }
            sx={{ mt: '$3' }}
          />

          <View sx={{ flexDirection: 'row', alignItems: 'center', mt: '$4' }}>
            <View
              sx={{
                backgroundColor: theme.colors.$gray,
                borderRadius: 2,
                borderWidth: 0,
              }}
            >
              <Checkbox
                value={values.terms}
                onValueChange={onCheckboxCheck}
                color={
                  values.terms
                    ? theme.colors.$blue
                    : touched.terms && errors.terms
                    ? theme.colors.$error
                    : theme.colors.$gray
                }
              />
            </View>
            <View sx={{ flexDirection: 'row', flexShrink: 1 }}>
              <Pressable
                sx={{ pl: '$2', flexDirection: 'row', flexShrink: 1 }}
                onPress={onCheckboxCheck}
              >
                <Text variant="sm">
                  {t('auth.readAndAgree')}{' '}
                  <Text
                    variant="sm"
                    sx={{ color: '$orange', textDecorationLine: 'underline' }}
                    onPress={handlePressTnC}
                  >
                    {t('menu.tnc').toLowerCase()}
                  </Text>
                </Text>
              </Pressable>
            </View>
          </View>

          <View sx={{ mt: '$8', alignItems: 'center' }}>
            <View sx={{ width: '70%' }}>
              <Button
                stretch
                disabled={
                  !values.terms ||
                  (!isSuccess && !isAgentOtpSuccess) ||
                  !!errors.verifyCode
                }
                onPress={submitForm}
                sx={{ mt: '$8' }}
                loading={isSubmitting}
              >
                <Button.Label>{t('common.enter')}</Button.Label>
              </Button>
            </View>
          </View>

          <ReceiveOTPContact />
        </View>
      </View>
    </AuthLayout>
  )
}

export default VerificationForm
