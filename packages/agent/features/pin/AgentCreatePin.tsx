import Button from 'agent/components/Button'
import Input from 'agent/components/Input'
import Text from 'agent/components/Text'
import TimerButton, {
  ITimerButtonForwardRef,
} from 'agent/components/TimerButton'
import useAgentAlert from 'agent/hooks/useAgentAlert'
import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import { useAgentCreatePinMutation } from 'agent/services/agentApi'
import { IResponse } from 'agent/services/common/agentAxiosBaseQuery'
import { useShareholderCreatePinMutation } from 'agent/services/shareholderApi'
import {
  useCreatePinOtpMutation,
  useUserInfoQuery,
} from 'agent/services/userApi'
import { ROLE } from 'agent/utils/helper'
import validation, {
  MAX_OTP_DIGIT,
  MAX_PHONE_DIGIT,
  getErrorMessage,
  removeAgentPhoneNumPrefix,
} from 'agent/utils/validation'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { useAgentLocalization } from 'app/provider/localization'
import { ActivityIndicator, ScrollView, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import * as Yup from 'yup'
import AgentUnderlinePinField from './AgentUnderlinePinField'

interface AddBankInfoValues {
  mobileNumber: string
  otp: string
  pin: string
  confirmPin: string
}

const AgentCreatePin = () => {
  const { back, replace } = useContextualRouter()
  const { isAgent, mobile_no, hasPin, isUninitialized, isFetching } =
    useUserInfoQuery(undefined, {
      selectFromResult: ({ data, ...rest }) => ({
        isAgent: data?.role === ROLE.AGENT,
        mobile_no: data?.mobile_no,
        hasPin: data?.has_pin,
        ...rest,
      }),
    })
  const OTPRef = useRef<ITimerButtonForwardRef>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [otpField, setOtpField] = useState(false)
  const { showAlert } = useAgentAlert()
  const { openModal } = useModal()
  const { t } = useAgentLocalization()
  const [sendOtp] = useCreatePinOtpMutation()
  const [isOtpLoading, setIsOtpLoading] = useState(false)

  const [agentCreatePin] = useAgentCreatePinMutation()
  const [shCreatePin] = useShareholderCreatePinMutation()

  const createPin = isAgent ? agentCreatePin : shCreatePin

  const onSubmit = async (
    { otp, pin, confirmPin }: AddBankInfoValues,
    { setStatus }: FormikHelpers<AddBankInfoValues>
  ) => {
    try {
      setIsLoading(true)
      const { message, success, result } = await createPin({
        OTP_1: otp,
        new_pin: pin,
        confirm_pin: confirmPin,
      })
        .unwrap()
        .catch((error): IResponse<[]> => {
          showAlert(error)
          return error
        })
      if (success) {
        showAlert(message)
        back()
      }
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      showAlert(err)
    }
  }
  const formik = useFormik<AddBankInfoValues>({
    initialValues: {
      mobileNumber: mobile_no?.substring(3) ?? '',
      otp: '',
      pin: '',
      confirmPin: '',
    },
    validationSchema: Yup.object({
      mobileNumber: validation.phoneNumber,
      otp: validation.verifyCode,
      pin: validation.pin,
      confirmPin: validation.confirmPin,
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
    setFieldValue,
  } = formik

  const handleSendOtp = async (mobile_no: string) => {
    setIsOtpLoading(true)

    try {
      const { message, success } = await sendOtp({
        mobile_no,
      })
        .unwrap()
        .catch((error): IResponse<void> => {
          showAlert(error)
          return error
        })
      if (success) {
        setIsOtpLoading(false)
        OTPRef.current?.startOtpTimer()
        setOtpField(true)
      }
    } catch (err) {
      openModal('AgentAlertModal', {
        message: getErrorMessage(err),
      })
    } finally {
      setIsOtpLoading(false)
    }
  }

  useEffect(() => {
    if (mobile_no) {
      const formattedPhoneNum = removeAgentPhoneNumPrefix(mobile_no)
      setFieldValue('mobileNumber', formattedPhoneNum, false)
    }
  }, [mobile_no, setFieldValue])

  useEffect(() => {
    if (isUninitialized || typeof hasPin === 'undefined') {
      return
    }

    if (hasPin) {
      replace('/agent')
    }
  }, [hasPin, isUninitialized, replace])

  return (
    <>
      {isFetching || isUninitialized ? (
        <ActivityIndicator />
      ) : (
        <>
          <CommonBackHeader
            title="pin.createPin"
            customRoute="/agent/wallet/withdrawal"
          />
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 20,
            }}
          >
            <View sx={{ alignItems: 'center' }}>
              <Input
                leftOuterElementProps={{
                  sx: { backgroundColor: '$secondaryAgent', marginRight: 1 },
                }}
                leftOuterElement={
                  <Text sx={{ paddingX: '$4', color: 'black' }}>+84</Text>
                }
                rightOuterElement={
                  isOtpLoading ? (
                    <ActivityIndicator color="white" sx={{ minWidth: 79 }} />
                  ) : (
                    <TimerButton
                      accessibilityRole="button"
                      ref={OTPRef}
                      title={t('common.send') + ' ' + t('common.otp')}
                      loading={isLoading}
                      onPress={() => handleSendOtp(values.mobileNumber)}
                      sx={{
                        width: 'auto',
                        backgroundColor: '$primaryAgent',
                        m: 0,
                        px: '$3',
                        minWidth: 75,
                      }}
                      _text={{
                        sx: { color: '$white' },
                      }}
                    />
                  )
                }
                label={t('common.mobileNumber')}
                containerProps={{
                  sx: { mb: '$3' },
                }}
                isRequired
                editable={false}
                error={
                  touched.mobileNumber && errors.mobileNumber
                    ? t(errors.mobileNumber, {
                        field: 'mobileNumber',
                      })
                    : undefined
                }
                onChangeText={handleChange('mobileNumber')}
                onBlur={handleBlur('mobileNumber')}
                keyboardType={'numeric'}
                value={values.mobileNumber}
                maxLength={MAX_PHONE_DIGIT}
              />
              <Input
                label={t('common.enter') + ' ' + t('common.otp')}
                editable={otpField}
                containerProps={{
                  sx: { mb: '$4' },
                }}
                isRequired
                error={
                  touched.otp && errors.otp
                    ? t(errors.otp, {
                        field: t('common.mobileNumber') + ' ' + t('common.otp'),
                      })
                    : undefined
                }
                maxLength={MAX_OTP_DIGIT}
                onChangeText={handleChange('otp')}
                onBlur={handleBlur('otp')}
                keyboardType={'numeric'}
                value={values.otp}
              />
              <AgentUnderlinePinField
                title={t('pin.newPin')}
                value={values.pin}
                setValue={handleChange('pin')}
                cellContainerSx={{
                  width: '100%',
                  mb: '$3',
                  bg: '#dbebff',
                  paddingX: '$2',
                  paddingY: '$3',
                  borderRadius: 10,
                }}
              />
              <AgentUnderlinePinField
                title={t('pin.confirmPin')}
                value={values.confirmPin}
                cellContainerSx={{
                  width: '100%',
                  mb: '$3',
                  bg: '#dbebff',
                  paddingX: '$2',
                  paddingY: '$3',
                  borderRadius: 10,
                }}
                setValue={handleChange('confirmPin')}
                errorMsg={
                  values.confirmPin.length === 6 && errors.confirmPin
                    ? t(errors.confirmPin, {
                        field: t('pin.newPin'),
                      })
                    : undefined
                }
              />
              <Button
                onPress={submitForm}
                loading={isLoading}
                sx={{ width: 150, justifyContent: 'center', minHeight: 37.5 }}
                disabled={!isValid || !dirty}
              >
                {t('common.submit')}
              </Button>
            </View>
          </ScrollView>
        </>
      )}
    </>
  )
}

export default AgentCreatePin
