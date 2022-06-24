import { Button } from 'app/components/form/Button'
import TextInput from 'app/components/form/TextInput'
import TimerButton, { ITimerButtonForwardRef } from 'app/components/TimerButton'
import useLocalization from 'app/provider/localization'
import { useAppDispatch } from 'app/provider/redux/store'
import {
  usePasswordRecoveryMutation,
  useSendPasswordRecoveryOtpMutation,
} from 'services/authApi'
import { AlertActions } from 'app/store/alert'
import validation, { getErrorMessage } from 'app/utils/validation'
import { Text, useDripsyTheme, View } from 'dripsy'
import { FormikHelpers, FormikTouched, useFormik } from 'formik'
import { useRef, useState } from 'react'
import { TextInput as RNTextField } from 'react-native'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import AuthLayout from '../layout/AuthLayout'

interface ForgotPasswordFormValues {
  contactNumber: string
  verifyCode: string
  password: string
  confirmPassword: string
}

const enum CURRENT_ACTION {
  GET_OTP,
  SET_PASSWORD,
}

const enum ERROR_CODE {
  INVALID_OTP = 10021,
}

const ForgotPassword = () => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const dispatch = useAppDispatch()
  const { push, replace } = useRouter()

  const [currentAction, setCurrentAction] = useState(CURRENT_ACTION.GET_OTP)
  const otpFieldRef = useRef<RNTextField>(null)
  const confirmPasswordFieldRef = useRef<RNTextField>(null)
  const OTPRef = useRef<ITimerButtonForwardRef>(null)

  const [sendForgotPasswordOtp, { isLoading: isOtpLoading }] =
    useSendPasswordRecoveryOtpMutation()
  const [recoverPassword] = usePasswordRecoveryMutation()

  const onSubmit = async (
    {
      password,
      confirmPassword,
      verifyCode,
      contactNumber,
    }: ForgotPasswordFormValues,
    actions: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    try {
      const { success } = await recoverPassword({
        password,
        cpassword: confirmPassword,
        // WIP: Prefix should not be hardcoded
        contactNumber: '84' + contactNumber,
        verify_code: verifyCode,
      }).unwrap()

      if (success) {
        actions.resetForm()
        replace('/auth/login')
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)

      if ('code' in error) {
        switch (error.code) {
          case ERROR_CODE.INVALID_OTP:
            setFieldError('verifyCode', error.message)
            break

          default:
            dispatch(AlertActions.addAlert({ message: errorMessage }))
            break
        }
      }
    }
  }

  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      password: '',
      confirmPassword: '',
      contactNumber: '',
      verifyCode: '',
    },
    validationSchema: Yup.object({
      password: validation.passwordRestrict,
      confirmPassword: validation.confirmPassword,
      contactNumber: validation.phoneNumber,
      verifyCode: validation.verifyCode,
    }),
    onSubmit,
  })

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
    setFieldError,
  } = formik

  const isFormFieldValid = async (
    fields: FormikTouched<ForgotPasswordFormValues>
  ) => {
    setTouched(fields)
    const formError = await validateForm()

    const fieldKeys = Object.keys(fields)
    const fieldErrorVal = fieldKeys.find((key) => formError[key])

    return typeof fieldErrorVal === 'undefined'
  }

  const sendOTP = async () => {
    try {
      const { data, message, success } = await sendForgotPasswordOtp({
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
    const isValid = await isFormFieldValid({
      contactNumber: true,
    })

    if (isValid) {
      sendOTP()
    }
  }

  const checkInitialForm = async () => {
    const isFormValid = await isFormFieldValid({
      contactNumber: true,
      verifyCode: true,
    })

    if (isFormValid) {
      setCurrentAction(CURRENT_ACTION.SET_PASSWORD)
    }
  }

  return (
    <AuthLayout
      headerDesc={t('auth.forgotPassword')}
      onBack={() => {
        push('/auth/login')
      }}
    >
      <TextInput
        _icon="avatar"
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
        endIcon={
          <TimerButton
            accessibilityRole="button"
            ref={OTPRef}
            title="Send"
            loading={isOtpLoading}
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
          placeholder: t('auth.enterOtp'),
          value: values.verifyCode,
          onChangeText: handleChange('verifyCode'),
          onBlur: handleBlur('verifyCode'),
          ref: otpFieldRef,
          onSubmitEditing: checkInitialForm,
          keyboardType: 'number-pad',
        }}
        error={
          touched.verifyCode && errors.verifyCode
            ? errors.verifyCode
            : undefined
        }
        sx={{ mt: '$3' }}
      />

      {currentAction === CURRENT_ACTION.SET_PASSWORD && (
        <View sx={{ mt: '$8' }}>
          <Text sx={{ color: '$border', opacity: 0.52 }}>
            {t('auth.enterNewPassword')}
          </Text>

          <TextInput
            _icon="lock"
            _input={{
              placeholder: t('common.newPassword'),
              value: values.password,
              onChangeText: handleChange('password'),
              onBlur: handleBlur('password'),
              secureTextEntry: true,
              onSubmitEditing: () => {
                confirmPasswordFieldRef.current?.focus()
              },
            }}
            error={
              touched.password && errors.password ? errors.password : undefined
            }
            sx={{ mt: '$3' }}
          />

          <TextInput
            _icon="lock-check"
            _input={{
              placeholder: t('common.confirmPassword'),
              value: values.confirmPassword,
              onChangeText: handleChange('confirmPassword'),
              onBlur: handleBlur('confirmPassword'),
              secureTextEntry: true,
              ref: confirmPasswordFieldRef,
              onSubmitEditing: submitForm,
            }}
            error={
              touched.confirmPassword && errors.confirmPassword
                ? errors.confirmPassword
                : undefined
            }
            sx={{ mt: '$3' }}
          />
        </View>
      )}

      <View sx={{ mt: '$8', alignItems: 'center' }}>
        <View sx={{ width: '70%' }}>
          {currentAction === CURRENT_ACTION.GET_OTP ? (
            <Button stretch onPress={checkInitialForm} sx={{ mt: '$8' }}>
              <Button.Label>{t('common.submit')}</Button.Label>
            </Button>
          ) : (
            <Button
              stretch
              onPress={submitForm}
              sx={{ mt: '$8' }}
              loading={isSubmitting}
            >
              <Button.Label>{t('common.enter')}</Button.Label>
            </Button>
          )}
        </View>
      </View>

      {currentAction === CURRENT_ACTION.GET_OTP && (
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
      )}
    </AuthLayout>
  )
}

export default ForgotPassword
