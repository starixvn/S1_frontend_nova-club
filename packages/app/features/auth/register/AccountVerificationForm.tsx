import { useAgentRegisterOtpMutation } from 'agent/services/authApi'
import TimerButton, { ITimerButtonForwardRef } from 'app/components/TimerButton'
import Button from 'app/components/common/Button'
import CheckBox from 'app/components/common/CheckBox'
import FormContainer from 'app/components/form/FormContainer'
import Input from 'app/components/form/Input'
import { MOBILE_PREFIX } from 'app/constants/country'
import { ROOT_DOMAIN } from 'utils/constant/domain'
import useAlert from 'app/hooks/useAlert'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { ModalStackParams } from 'app/provider/modal'
import { useAppSelector } from 'app/provider/redux/store'
import { Pressable, Text, View, styled, useResponsiveValue } from 'dripsy'
import { FormikProps } from 'formik'
import { ComponentProps, useRef } from 'react'
import { Linking, Platform, TextInput } from 'react-native'
import { ModalComponentProp } from 'react-native-modalfy'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useSendRegistrationOtpMutation } from 'services/authApi'
import { useRouter } from 'solito/router'
import ReceiveOTPContact from '../components/ReceiveOTPContact'
import { RegisterFormValues } from './RegisterScreen'
import SelectList from 'app/components/select/SelectList'
import {
  CURRENCY_SELECTION,
  MOBILE_PREFIX_BY_CURRENCY,
} from 'utils/constant/currency'

const StyledFormContainer = styled(FormContainer)({
  py: '$4',
})

type AccountVerificationFormProps = {
  isAgent: boolean
  formik: FormikProps<RegisterFormValues>
  modal?: ModalComponentProp<ModalStackParams, void, 'RegisterModal'>['modal']
} & ComponentProps<typeof StyledFormContainer>

const AccountVerificationForm = ({
  isAgent,
  formik,
  modal,
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
    isSubmitting,
  } = formik

  const { t } = useLocalization()
  const { push } = useRouter()
  const { showAlert } = useAlert()
  const locale = useAppSelector((s) => s.setting.locale)

  const tncUrl = `${ROOT_DOMAIN}/info/tnc?locale=${locale}`

  const otpFieldRef = useRef<TextInput>(null)
  const OTPRef = useRef<ITimerButtonForwardRef>(null)
  const isOtpButtonLoading = useRef(false)
  const isDesktop = useIsDesktop()
  const minHeightResponsiveValue = useResponsiveValue([50, 50, 75, 75, 75])

  const [
    sendOtp,
    { isLoading: isOtpApiLoading, isSuccess: isMemberOtpSucess },
  ] = useSendRegistrationOtpMutation()

  const [
    sendAgentRegistrationOtp,
    { isLoading: isAgentOtpLoading, isSuccess: isAgentOtpSuccess },
  ] = useAgentRegisterOtpMutation()

  const onCheckboxCheck = () => {
    setFieldValue('terms', !values.terms)
  }

  const sendOTP = async () => {
    isOtpButtonLoading.current = true
    try {
      const { data, message, success } = await sendOtp({
        username: values.username?.toLowerCase(),
        // WIP: Prefix should not be hardcoded
        contactNumber:
          MOBILE_PREFIX_BY_CURRENCY[values.currency] + values.contactNumber,
        currency: values.currency,
      }).unwrap()

      OTPRef.current?.startOtpTimer()

      if (success) {
        Toast.show({ type: 'success', text1: message })
        isOtpButtonLoading.current = false
      }
    } catch (error) {
      isOtpButtonLoading.current = false

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

  const isContactNumValid = async () => {
    setTouched({ contactNumber: true })
    const { contactNumber } = await validateForm()

    if (contactNumber) return false

    return true
  }
  const onSendOtp = async () => {
    const isValid = await isContactNumValid()

    if (isValid) {
      isAgent ? sendAgentOTP() : sendOTP()
    }
  }
  const handlePressTnC = () => {
    if (modal) {
      modal.closeModal()
    }
    isDesktop ? Linking.openURL(tncUrl) : push('/info/tnc')
  }

  const handleSelected = (value) => {
    const currency = CURRENCY_SELECTION?.find((el) => el.value === value)

    setFieldValue('currency', currency?.value)
  }

  return (
    <StyledFormContainer {...rest}>
      <SelectList
        enabledLabel={false}
        label={t('common.currency')}
        placeholder={t('common.currency')}
        options={CURRENCY_SELECTION}
        value={values.currency}
        onSelected={(e) => handleSelected(e)}
      />

      <Input
        inputContainerSx={{ width: '100%' }}
        icon="icon-hp"
        textContentType="telephoneNumber"
        prefix={'+' + MOBILE_PREFIX_BY_CURRENCY[values.currency]}
        inputMode="numeric"
        keyboardType="number-pad"
        maxLength={9}
        action={
          <TimerButton
            accessibilityRole="button"
            ref={OTPRef}
            title={t('authentication.send')}
            loading={isOtpApiLoading || isAgentOtpLoading}
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
        onSubmitEditing={() => {
          otpFieldRef.current?.focus()
        }}
        value={values.contactNumber}
        onBlur={handleBlur('contactNumber')}
        onChangeText={handleChange('contactNumber')}
        error={
          touched.contactNumber && errors.contactNumber
            ? t(errors.contactNumber, {
                field: t('common.phone'),
              })
            : undefined
        }
      />
      <Input
        inputContainerSx={{
          width: '100%',
          opacity: isMemberOtpSucess || isAgentOtpSuccess ? 1 : 0.3,
        }}
        icon="otp"
        placeholder={t('authentication.enterOtp')}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        prefix="OTP"
        inputMode="numeric"
        value={values.verifyCode}
        onBlur={handleBlur('verifyCode')}
        onChangeText={handleChange('verifyCode')}
        maxLength={6}
        ref={otpFieldRef}
        onSubmitEditing={submitForm}
        editable={isMemberOtpSucess || isAgentOtpSuccess}
        error={
          touched.verifyCode && errors.verifyCode
            ? t(errors.verifyCode, {
                field: t('common.otp'),
              })
            : undefined
        }
        {...(Platform.OS === 'web' && {
          disabled: !isMemberOtpSucess && !isAgentOtpSuccess,
        })}
      />

      <View
        sx={{
          minHeight: minHeightResponsiveValue,
          justifyContent: 'space-between',
        }}
      >
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <CheckBox isCheck={values.terms} onCheck={onCheckboxCheck} />
          <Pressable sx={{ pl: '$2' }} onPress={onCheckboxCheck}>
            <Text>
              {t('authentication.readAndAgree')}{' '}
              <Text sx={{ color: '$secondary.500' }} onPress={handlePressTnC}>
                {t('common.userAgreement')}
              </Text>
            </Text>
          </Pressable>
        </View>
      </View>

      <ReceiveOTPContact
        sx={{
          mt: isDesktop ? 'auto' : '$4',
        }}
      />

      <Button
        sx={{ bg: '$secondary.500', marginTop: '$3' }}
        onPress={submitForm}
        loading={isSubmitting}
        disabled={
          !values.terms ||
          (!isMemberOtpSucess && !isAgentOtpSuccess) ||
          !!errors.verifyCode
        }
      >
        {t('common.submit')}
      </Button>
    </StyledFormContainer>
  )
}

export default AccountVerificationForm
