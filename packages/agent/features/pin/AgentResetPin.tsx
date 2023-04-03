import Button from 'agent/components/Button'
import Input from 'agent/components/Input'
import Text from 'agent/components/Text'
import TimerButton, {
  ITimerButtonForwardRef,
} from 'agent/components/TimerButton'
import useAgentAlert from 'agent/hooks/useAgentAlert'
import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import { useAgentResetPinMutation } from 'agent/services/agentApi'
import { IResponse } from 'agent/services/common/agentAxiosBaseQuery'
import { useShareholderResetPinMutation } from 'agent/services/shareholderApi'
import {
  useResetPinOtpMutation,
  useUserInfoQuery,
} from 'agent/services/userApi'
import { ROLE } from 'agent/utils/helper'
import validation, { getErrorMessage } from 'agent/utils/validation'
import {
  AGENT_STACK_CONTENT_PADDING,
  AGENT_STACK_CONTENT_PADDING_WEB,
} from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { useAgentLocalization } from 'app/provider/localization'
import { ScrollView, useDripsyTheme, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import { useRef, useState } from 'react'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import * as Yup from 'yup'
import AgentUnderlinePinField from './AgentUnderlinePinField'

interface AddBankInfoValues {
  mobileNumber: string
  otp: string
  pin: string
  confirmPin: string
}

const AgentResetPin = () => {
  const { theme } = useDripsyTheme()
  const { height } = useContainerDimension()
  const { isAgent, mobile_no } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      isAgent: data?.result?.data.role === ROLE.AGENT,
      mobile_no: data?.result?.data.mobile_no,
    }),
  })
  const OTPRef = useRef<ITimerButtonForwardRef>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [otpField, setOtpField] = useState(false)
  const { showAlert } = useAgentAlert()
  const { openModal } = useModal()
  const { t } = useAgentLocalization()
  // const navigation = useNavigation()
  const { back } = useContextualRouter()
  const [sendOtp] = useResetPinOtpMutation()

  const [agentResetPin] = useAgentResetPinMutation()
  const [shResetPin] = useShareholderResetPinMutation()

  const resetPin = isAgent ? agentResetPin : shResetPin

  const onSubmit = async (
    { otp, pin, confirmPin }: AddBankInfoValues,
    { setStatus }: FormikHelpers<AddBankInfoValues>
  ) => {
    try {
      setIsLoading(true)
      const { message, success, result } = await resetPin({
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
      otp: validation.stringRequired,
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
        OTPRef.current?.startOtpTimer()
        setOtpField(true)
      }
    } catch (err) {
      openModal('AgentAlertModal', {
        message: getErrorMessage(err),
      })
    }
  }

  return (
    <>
      <CommonBackHeader title="pin.resetPin" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop:
            Platform.OS === 'web'
              ? AGENT_STACK_CONTENT_PADDING_WEB
              : AGENT_STACK_CONTENT_PADDING,
          backgroundColor: 'white',
        }}
      >
        <View sx={{ alignItems: 'center', minHeight: height }}>
          <Input
            leftOuterElementProps={{
              sx: { backgroundColor: '$secondaryAgent', marginRight: 1 },
            }}
            leftOuterElement={
              <Text sx={{ paddingX: '$4', color: 'black' }}>+84</Text>
            }
            rightOuterElement={
              <TimerButton
                accessibilityRole="button"
                ref={OTPRef}
                title={t('common.send') + ' ' + t('common.otp')}
                loading={isLoading}
                onPress={() => handleSendOtp(values.mobileNumber)}
                sx={{
                  width: 'auto',
                  backgroundColor: theme.colors.$primaryAgent,
                  m: 0,
                  px: '$3',
                  minWidth: 75,
                }}
                _text={{
                  sx: {
                    color: theme.colors.$white,
                  },
                }}
              />
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
                    field: 'otp',
                  })
                : undefined
            }
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
              bg: theme.colors.$secondaryAgent,
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
              bg: theme.colors.$secondaryAgent,
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
  )
}

export default AgentResetPin
