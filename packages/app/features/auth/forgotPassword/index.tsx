import { USERNAME_MAX_LENGTH } from 'agent/utils/validation'
import { Button } from 'app/components/form/Button'
import TextInput from 'app/components/form/TextInput'
import TimerButton, { ITimerButtonForwardRef } from 'app/components/TimerButton'
import useAlert from 'app/hooks/useAlert'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import validation, {
  getErrorMessage,
  PASSWORD_MAX_LENGTH,
} from 'app/utils/validation'
import { Text, useDripsyTheme, View } from 'dripsy'
import { FormikHelpers, FormikTouched, useFormik } from 'formik'
import { useMemo, useRef, useState } from 'react'
import { Platform, TextInput as RNTextField } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import {
  usePasswordRecoveryMutation,
  useSendPasswordRecoveryOtpMutation,
} from 'services/authApi'
import { createParam } from 'solito'
import * as Yup from 'yup'
import ReceiveOTPContact from '../common/ReceiveOTPContact'
import AuthLayout from '../layout/AuthLayout'
import { LoginType } from '../type'
import useAgentForgotPassword from './hooks/useAgentForgotPassword'

export interface ForgotPasswordFormValues {
  username: string
  contactNumber: string
  verifyCode: string
  password: string
  confirmPassword: string
  isAgent: boolean
}

const enum CURRENT_ACTION {
  GET_OTP,
  SET_PASSWORD,
}

const enum ERROR_CODE {
  INVALID_OTP = 10021,
}

const { useParam } = createParam<{ t: LoginType }>()
const ForgotPassword = () => {
  const [type] = useParam('t', { initial: LoginType.Member })
  const isAgent = useMemo(() => type === LoginType.Agent, [type])

  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const { push, replace } = useContextualRouter()
  const { showAlert } = useAlert()

  const [currentAction, setCurrentAction] = useState(CURRENT_ACTION.GET_OTP)
  const usernameFieldRef = useRef<RNTextField>(null)
  const contactNumberFieldRef = useRef<RNTextField>(null)
  const otpFieldRef = useRef<RNTextField>(null)
  const confirmPasswordFieldRef = useRef<RNTextField>(null)
  const OTPRef = useRef<ITimerButtonForwardRef>(null)

  const [sendForgotPasswordOtp, { isLoading: isOtpLoading, isSuccess }] =
    useSendPasswordRecoveryOtpMutation()
  const [recoverPassword] = usePasswordRecoveryMutation()

  const { agentResetPassword, agentSendOTP, isAgentLoading, isAgentSuccess } =
    useAgentForgotPassword()

  const onSubmit = async (
    formValues: ForgotPasswordFormValues,
    actions: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    try {
      if (isAgent) {
        agentResetPassword(formValues, actions)
      } else {
        const { password, confirmPassword, verifyCode, contactNumber } =
          formValues
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
          actions.resetForm()
          if (Platform.OS === 'web') replace('/auth/login')
          else push('/auth/login')
        }
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)

      if ('code' in error) {
        switch (error.code) {
          case ERROR_CODE.INVALID_OTP:
            setFieldError('verifyCode', error.message)
            break

          default:
            showAlert(error)
            break
        }
      }
    }
  }

  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      contactNumber: '',
      verifyCode: '',
      isAgent: isAgent ? true : false,
    },
    validationSchema: Yup.object({
      username: Yup.string().when('isAgent', {
        is: true,
        then: validation.username,
      }),
      password: validation.password,
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
    dirty,
    isValid,
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

  const onSendOtp = async () => {
    const isValid = await isFormFieldValid({
      username: true,
      contactNumber: true,
    })

    if (isValid) {
      isAgent
        ? agentSendOTP(OTPRef, values.username, values.contactNumber)
        : sendOTP()
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
      isAgent={isAgent}
      headerDesc={t('auth.forgotPassword')}
      headerColor="#000000"
      gradientColor={['#18d2e8', '#6afcf7']}
    >
      <View sx={{ alignItems: 'center', pt: '$8', flex: 1 }}>
        <View sx={{ width: '75%', flex: 1 }}>
          {isAgent && (
            <TextInput
              _icon="avatar"
              _input={{
                textContentType: 'username',
                placeholder: t('common.username'),
                value: values.username,
                onChangeText: handleChange('username'),
                onBlur: handleBlur('username'),
                autoCapitalize: 'none',
                ref: usernameFieldRef,
                onSubmitEditing: () => {
                  contactNumberFieldRef.current?.focus()
                },
                maxLength: USERNAME_MAX_LENGTH,
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
          <TextInput
            _icon="avatar"
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
            endIcon={
              <TimerButton
                accessibilityRole="button"
                ref={OTPRef}
                title={t('common.send')}
                loading={isOtpLoading || isAgentLoading}
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
              onSubmitEditing: checkInitialForm,
              keyboardType: 'number-pad',
              maxLength: 6,
              editable: isSuccess || isAgentSuccess,
              ...(Platform.OS === 'web' && {
                disabled: !isSuccess && !isAgentSuccess,
              }),
            }}
            error={
              touched.verifyCode && errors.verifyCode
                ? t(errors.verifyCode, { field: t('common.otp') })
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
                  maxLength: PASSWORD_MAX_LENGTH,
                }}
                error={
                  touched.password && errors.password
                    ? t(errors.password, { field: t('common.newPassword') })
                    : undefined
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
                  maxLength: PASSWORD_MAX_LENGTH,
                }}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? t(errors.confirmPassword, {
                        field: t('common.confirmPassword'),
                      })
                    : undefined
                }
                sx={{ mt: '$3' }}
              />
            </View>
          )}

          <View sx={{ mt: '$8', alignItems: 'center' }}>
            <View sx={{ width: '70%' }}>
              {currentAction === CURRENT_ACTION.GET_OTP ? (
                <Button
                  stretch
                  disabled={
                    (!isSuccess && !isAgentSuccess) || !!errors.verifyCode
                  }
                  onPress={checkInitialForm}
                  sx={{ mt: '$8' }}
                >
                  <Button.Label>{t('common.submit')}</Button.Label>
                </Button>
              ) : (
                <Button
                  stretch
                  disabled={!isValid || !dirty}
                  onPress={submitForm}
                  sx={{ mt: '$8' }}
                  loading={isSubmitting}
                >
                  <Button.Label>{t('common.enter')}</Button.Label>
                </Button>
              )}
            </View>
          </View>

          {currentAction === CURRENT_ACTION.GET_OTP && <ReceiveOTPContact />}
        </View>
      </View>
    </AuthLayout>
  )
}

export default ForgotPassword
