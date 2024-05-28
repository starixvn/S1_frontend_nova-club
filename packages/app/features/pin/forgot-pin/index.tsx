import TimerButton, { ITimerButtonForwardRef } from 'app/components/TimerButton'
import Button from 'app/components/common/Button'
import FormContainer from 'app/components/form/FormContainer'
import Input from 'app/components/form/Input'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useAlert from 'app/hooks/useAlert'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import validation from 'app/utils/validation'
import { View } from 'dripsy'
import { FormikHelpers, FormikTouched, useFormik } from 'formik'
import { useEffect, useMemo, useRef, useState } from 'react'
import { TextInput as RNTextField } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import {
  useTransferPinRecoveryMutation,
  useTransferPinRecoveryOtpMutation,
} from 'services/pinApi'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import UnderlinePinField from '../UnderlinePinField'

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

const ForgotPinScreen = () => {
  const { t } = useLocalization()
  const { showAlert } = useAlert()
  const { back } = useRouter()
  const desktop = useIsDesktop()

  const [currentAction, setCurrentAction] = useState(CURRENT_ACTION.GET_OTP)
  const otpFieldRef = useRef<RNTextField>(null)
  const OTPRef = useRef<ITimerButtonForwardRef>(null)
  const { data: playerData } = usePlayerProfileQuery()

  const [sendPinRecoveryOtp, { isLoading: isOtpLoading }] =
    useTransferPinRecoveryOtpMutation()
  const [recoverTransferPin] = useTransferPinRecoveryMutation()

  const lang = useAppSelector((s) => s.setting.locale)

  useEffect(() => {
    setValues({
      ...values,
      pin: '',
      confirmPin: '',
    })
  }, [lang])

  useEffect(() => {
    setFieldValue('contactNumber', playerData?.contractNumber)
  }, [playerData])

  const onSubmit = async (
    { confirmPin, pin, verifyCode }: ForgotPinFormValues,
    actions: FormikHelpers<ForgotPinFormValues>
  ) => {
    try {
      const { success, message } = await recoverTransferPin({
        pin: pin,
        cpin: confirmPin,
        // WIP: Prefix should not be hardcoded
        verify_code: verifyCode,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })
      if (success) {
        Toast.show({
          type: 'success',
          text1: t('manageCredentials.pin.resetPinSuccess'),
        })
        back()
      }
    } catch (error) {
      showAlert(error)
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
    resetForm,
    submitForm,
    validateForm,
    setFieldValue,
    setTouched,
    setValues,
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
        .catch((error) => {
          showAlert(error)
          return error
        })
      OTPRef.current?.startOtpTimer()

      if (success) {
        Toast.show({ type: 'success', text1: t('status.success') })
      }
    } catch (error) {
      showAlert(error)
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

  const memoPin = useMemo(
    () => (
      <>
        <UnderlinePinField
          label={t('manageCredentials.pin.newPin')}
          value={values.pin}
          setValue={handleChange('pin')}
        />
        <UnderlinePinField
          label={t('manageCredentials.pin.confirmPin')}
          value={values.confirmPin}
          setValue={handleChange('confirmPin')}
          errorMsg={
            values.confirmPin.length === 6 && errors.confirmPin
              ? t(errors.confirmPin, {
                  field: t('common.pin'),
                })
              : undefined
          }
        />
      </>
    ),
    [values, errors]
  )

  return (
    <PageWithBackHeader
      header={{ title: t('manageCredentials.pin.forgotPin') }}
      hideHeader={desktop}
    >
      <FormContainer>
        <Input
          sx={{ mt: '$2' }}
          label={t('common.phone')}
          value={values.contactNumber}
          editable={false}
          action={
            <TimerButton
              accessibilityRole="button"
              ref={OTPRef}
              title={t('authentication.send')}
              loading={isOtpLoading}
              onPress={onSendOtp}
              sx={{
                width: 'auto',
                backgroundColor: '$otp',
                m: 0,
                px: '$3',
                minWidth: 53,
                marginRight: 10,
              }}
              _text={{
                sx: {
                  py: '$1',
                  color: '$white',
                  fontWeight: 'bold',
                },
              }}
            />
          }
        />
        <Input
          label={'OTP'}
          placeholder={t('authentication.enterOtp')}
          value={values.verifyCode}
          keyboardType={'number-pad'}
          maxLength={6}
          onChangeText={handleChange('verifyCode')}
          onBlur={handleBlur('verifyCode')}
          onSubmitEditing={checkInitialForm}
          error={
            touched.verifyCode && errors.verifyCode
              ? t(errors.verifyCode, { field: t('common.otp') })
              : undefined
          }
        />
        {memoPin}
        <View sx={{ flexDirection: 'row', justifyContent: 'center' }}>
          {desktop && <View sx={{ width: '20%', minWidth: 200 }} />}
          <Button
            loading={isSubmitting}
            onPress={submitForm}
            disabled={!isValid || !dirty}
            sx={{
              mt: '$4',
              maxWidth: 350,
              ...(desktop
                ? {
                    width: '55%',
                  }
                : { width: '100%' }),
            }}
          >
            {t('common.submit')}
          </Button>
        </View>
      </FormContainer>
    </PageWithBackHeader>
  )
}

export default ForgotPinScreen
