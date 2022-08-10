import { Button } from 'app/components/form/Button'
import TextInput from 'app/components/form/TextInput'
import TimerButton, { ITimerButtonForwardRef } from 'app/components/TimerButton'
import useLocalization from 'app/provider/localization'
import { useAppDispatch } from 'app/provider/redux/store'
import { usePasswordRecoveryMutation } from 'services/authApi'
import { AlertActions } from 'app/store/alert.slice'
import validation, { getErrorMessage } from 'app/utils/validation'
import { Text, useDripsyTheme, View } from 'dripsy'
import { FormikHelpers, FormikTouched, useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { TextInput as RNTextField } from 'react-native'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import { PageWithBackHeader } from 'app/components/layout/Page'
import UnderlinePinField from '../UnderlinePinField'
import {
  useTransferPinRecoveryMutation,
  useTransferPinRecoveryOtpMutation,
} from 'services/pinApi'
import { usePlayerProfileQuery } from 'services/playerApi'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

interface ForgotPinFormValues {
  confirmPin: string
  contactNumber: string
  pin: string
  verifyCode: string
}

const enum CURRENT_ACTION {
  GET_OTP,
  SET_PASSWORD,
}

const enum ERROR_CODE {
  INVALID_OTP = 10021,
}

const ForgotPinScreen = () => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const dispatch = useAppDispatch()
  const { back, replace } = useRouter()

  const [currentAction, setCurrentAction] = useState(CURRENT_ACTION.GET_OTP)
  const otpFieldRef = useRef<RNTextField>(null)
  const OTPRef = useRef<ITimerButtonForwardRef>(null)
  const { data: playerData } = usePlayerProfileQuery()

  const [sendPinRecoveryOtp, { isLoading: isOtpLoading }] =
    useTransferPinRecoveryOtpMutation()
  const [recoverTransferPin] = useTransferPinRecoveryMutation()

  useEffect(() => {
    setFieldValue('contactNumber', playerData?.data?.contractNumber)
  }, [playerData])

  const onSubmit = async (
    { confirmPin, pin, verifyCode }: ForgotPinFormValues,
    actions: FormikHelpers<ForgotPinFormValues>
  ) => {
    try {
      const { success, message } = await recoverTransferPin({
        pin,
        cpin: confirmPin,
        // WIP: Prefix should not be hardcoded
        verify_code: verifyCode,
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        Toast.show({
          type: 'success',
          text1: message,
        })
        back()
      }
    } catch (error) {
      dispatch(AlertActions.addError('status.systemError'))
    }
  }

  const formik = useFormik<ForgotPinFormValues>({
    initialValues: {
      pin: '',
      confirmPin: '',
      contactNumber: '',
      verifyCode: '',
    },
    validationSchema: Yup.object({
      pin: validation.pin,
      confirmPin: validation.confirmPin,
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
    isValid,
    dirty,
    submitForm,
    validateForm,
    setFieldValue,
    setTouched,
    setFieldError,
  } = formik

  const isFormFieldValid = async (
    fields: FormikTouched<ForgotPinFormValues>
  ) => {
    setTouched(fields)
    const formError = await validateForm()

    const fieldKeys = Object.keys(fields)
    const fieldErrorVal = fieldKeys.find((key) => formError[key])

    return typeof fieldErrorVal === 'undefined'
  }

  const sendOTP = async () => {
    try {
      const { data, message, success } = await sendPinRecoveryOtp({
        // WIP: Prefix should not be hardcoded
        contactNumber: '84' + values.contactNumber,
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      OTPRef.current?.startOtpTimer()

      if (success) {
        Toast.show({
          type: 'success',
          text1: message,
        })
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
    <PageWithBackHeader header={{ title: t('pin.forgotPin') }}>
      <View sx={{ p: 24 }}>
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
          }}
          error={
            touched.verifyCode && errors.verifyCode
              ? t(errors.verifyCode, { field: t('common.otp') })
              : undefined
          }
          sx={{ mt: '$3' }}
        />
      </View>

      <UnderlinePinField
        title={t('pin.pin')}
        value={values.pin}
        setValue={handleChange('pin')}
      />
      <UnderlinePinField
        title={t('pin.confirmPin')}
        value={values.confirmPin}
        setValue={handleChange('confirmPin')}
        errorMsg={
          values.confirmPin.length === 6 && errors.confirmPin
            ? t(errors.confirmPin, {
                field: t('pin.pin'),
              })
            : undefined
        }
      />

      <Button
        rounded
        stretch
        loading={isSubmitting}
        disabled={!isValid || !dirty}
        variant="lg"
        fill={{
          type: 'gradient',
          color: 'secondary',
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
        containerStyle={{
          m: '$10',
        }}
        onPress={submitForm}
      >
        <Button.Label>{t('common.submit')}</Button.Label>
      </Button>
    </PageWithBackHeader>
  )
}

export default ForgotPinScreen
