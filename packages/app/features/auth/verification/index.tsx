import { Button } from 'app/components/form/Button'
import TextInput from 'app/components/form/TextInput'
import TimerButton, { ITimerButtonForwardRef } from 'app/components/TimerButton'
import { useAppDispatch } from 'app/provider/redux/store'
import { useSendRegistrationOtpMutation } from 'app/services/authApi'
import { AlertActions } from 'app/store/alert'
import { getErrorMessage } from 'app/utils/validation'
import { Pressable, Text, useDripsyTheme, View } from 'dripsy'
import Checkbox from 'expo-checkbox'
import { FormikProps } from 'formik'
import React, { useRef } from 'react'
import { TextInput as RNTextField } from 'react-native'
import AuthLayout from '../layout/AuthLayout'
import { RegisterFormValues } from '../register'

interface VerificationFormProps {
  formik: FormikProps<RegisterFormValues>
  onBack: () => void
}

const VerificationForm = ({ formik, onBack }: VerificationFormProps) => {
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
    <AuthLayout headerDesc={'ACCOUNT VERIFICATION'} onBack={onBack}>
      <TextInput
        _icon="avatar"
        // WIP: Prefix should not be hardcoded
        prefix="+84"
        _input={{
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
            ? errors.contactNumber
            : undefined
        }
      />

      <TextInput
        _icon="lock"
        prefix="OTP"
        _input={{
          placeholder: 'Please enter OTP',
          value: values.verifyCode,
          onChangeText: handleChange('verifyCode'),
          onBlur: handleBlur('verifyCode'),
          ref: otpFieldRef,
          onSubmitEditing: submitForm,
          keyboardType: 'number-pad',
        }}
        error={
          touched.verifyCode && errors.verifyCode
            ? errors.verifyCode
            : undefined
        }
        endIcon={
          <TimerButton
            accessibilityRole="button"
            ref={OTPRef}
            title="Send"
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
            // @ts-expect-error
            accessibilityRole="label"
            sx={{ pl: '$2', flexDirection: 'row', flexShrink: 1 }}
            onPress={onCheckboxCheck}
          >
            <Text variant="sm">
              I have read & agree the{' '}
              <Text
                variant="sm"
                sx={{ color: '$orange', textDecorationLine: 'underline' }}
              >
                user agreement
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
            <Button.Label>Enter</Button.Label>
          </Button>
        </View>
      </View>

      <View
        sx={{
          flexDirection: 'row',
          flexShrink: 1,
          justifyContent: 'center',
          mt: '$4',
        }}
      >
        <Text variant="xs" sx={{ pl: '$3' }}>
          Didn't receive OTP?{' '}
          <Text
            variant="xs"
            sx={{ color: '$orange', textDecorationLine: 'underline' }}
          >
            Contact Us
          </Text>
        </Text>
      </View>
    </AuthLayout>
  )
}

export default VerificationForm
