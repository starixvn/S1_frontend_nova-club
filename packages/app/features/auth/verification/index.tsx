import { Button } from 'app/components/form/Button'
import TextInput from 'app/components/form/TextInput'
import TimerButton, { ITimerButtonForwardRef } from 'app/components/TimerButton'
import { useAppDispatch } from 'app/provider/redux/store'
import { useSendRegistrationOtpMutation } from 'services/authApi'
import { AlertActions } from 'app/store/alert.slice'
import { getErrorMessage } from 'app/utils/validation'
import { Pressable, Text, useDripsyTheme, View } from 'dripsy'
import Checkbox from 'expo-checkbox'
import { FormikProps } from 'formik'
import React, { useRef } from 'react'
import { TextInput as RNTextField } from 'react-native'
import AuthLayout from '../layout/AuthLayout'
import { RegisterFormValues } from '../register'
import useLocalization from 'app/provider/localization'
import ReceiveOTPContact from '../common/ReceiveOTPContact'

interface VerificationFormProps {
  formik: FormikProps<RegisterFormValues>
  onBack: () => void
}

const VerificationForm = ({ formik, onBack }: VerificationFormProps) => {
  const { t } = useLocalization()

  const {
    handleChange,
    handleBlur,
    isSubmitting,
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

  const otpFieldRef = useRef<RNTextField>(null)

  const [sendRegistrationOtp, { isLoading }] = useSendRegistrationOtpMutation()

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
        username: values.username,
        // WIP: Prefix should not be hardcoded
        contactNumber: '84' + values.contactNumber,
      }).unwrap()

      OTPRef.current?.startOtpTimer()

      if (success) {
        dispatch(AlertActions.addSuccess(message))
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      dispatch(AlertActions.addAlert({ message: errorMessage }))
    }
  }

  const onSendOtp = async () => {
    const isValid = await isContactNumValid()

    if (isValid) {
      sendOTP()
    }
  }

  return (
    <AuthLayout headerDesc={t('auth.accountVerification')} onBack={onBack}>
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
            loading={isLoading}
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
              >
                {t('common.userAgreement')}
              </Text>
            </Text>
          </Pressable>
        </View>
      </View>

      <View sx={{ mt: '$8', alignItems: 'center' }}>
        <View sx={{ width: '70%' }}>
          <Button
            stretch
            onPress={submitForm}
            sx={{ mt: '$8' }}
            loading={isSubmitting}
          >
            <Button.Label>{t('common.enter')}</Button.Label>
          </Button>
        </View>
      </View>

      <ReceiveOTPContact />
    </AuthLayout>
  )
}

export default VerificationForm
