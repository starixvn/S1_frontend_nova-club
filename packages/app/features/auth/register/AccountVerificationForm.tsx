import TimerButton, { ITimerButtonForwardRef } from 'app/components/TimerButton'
import Button from 'app/components/common/Button'
import CheckBox from 'app/components/common/CheckBox'
import FormContainer from 'app/components/form/FormContainer'
import Input from 'app/components/form/Input'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Pressable, Text, View, styled, useResponsiveValue } from 'dripsy'
import { FormikProps } from 'formik'
import { useCallback, useRef } from 'react'
import { TextInput } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useSendRegistrationOtpMutation } from 'services/authApi'
import { useRouter } from 'solito/router'
import { RegisterFormValues } from './RegisterScreen'

interface AccountVerificationFormProps {
  isAgent: boolean
  formik: FormikProps<RegisterFormValues>
}

const AccountVerificationForm = ({
  isAgent,
  formik,
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
  } = formik

  const { t } = useLocalization()
  const { push } = useRouter()
  const { showAlert } = useAlert()
  const locale = useAppSelector((s) => s.setting.locale)

  const otpFieldRef = useRef<TextInput>(null)
  const OTPRef = useRef<ITimerButtonForwardRef>(null)
  const isOtpButtonLoading = useRef(false)

  const [
    sendOtp,
    { isLoading: isOtpApiLoading, isSuccess: isMemberOtpSucess },
  ] = useSendRegistrationOtpMutation()

  const onCheckboxCheck = () => {
    setFieldValue('terms', !values.terms)
  }

  const onSubmit = useCallback(async () => {
    setTouched({
      contactNumber: true,
      verifyCode: true,
      terms: true,
    })

    const { contactNumber, verifyCode, terms } = await validateForm()

    if (contactNumber || verifyCode || terms) return
  }, [setTouched, validateForm])

  const sendOTP = async () => {
    isOtpButtonLoading.current = true
    try {
      const { data, message, success } = await sendOtp({
        username: values.username?.toLowerCase(),
        // WIP: Prefix should not be hardcoded
        contactNumber: '84' + values.contactNumber,
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
  const isContactNumValid = async () => {
    setTouched({ contactNumber: true })
    const { contactNumber } = await validateForm()

    if (contactNumber) return false

    return true
  }
  const onSendOtp = async () => {
    const isValid = await isContactNumValid()
    isValid && sendOTP()
    // if (isValid) {
    //   isAgent ? sendAgentOTP() : sendOTP()
    // }
  }
  const handlePressTnC = () => {
    const params = {
      locale: locale,
    }
    push('/info/tnc')
  }

  const handleContactUs = () => {
    push('/info/contact-us')
  }

  return (
    <FormContainer
      sx={{
        py: 20,
      }}
    >
      <Input
        inputContainerSx={{ width: '100%' }}
        icon="icon-hp"
        textContentType="telephoneNumber"
        prefix="+84"
        inputMode="numeric"
        keyboardType="number-pad"
        maxLength={9}
        action={
          <TimerButton
            accessibilityRole="button"
            ref={OTPRef}
            title={t('authentication.send')}
            loading={isOtpApiLoading}
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
        inputContainerSx={{ width: '100%' }}
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
        onSubmitEditing={onSubmit}
        error={
          touched.verifyCode && errors.verifyCode
            ? t(errors.verifyCode, {
                field: t('common.otp'),
              })
            : undefined
        }
      />

      <View
        sx={{
          minHeight: useResponsiveValue([50, 50, 75, 75, 75]),
          justifyContent: 'space-between',
        }}
      >
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
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

        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Text>{t('authentication.noReceiveOTP')} </Text>

          <Pressable onPress={handleContactUs}>
            <Text sx={{ color: '$secondary.500' }}>
              {t('footer.contactUs')}
            </Text>
          </Pressable>
        </View>
      </View>

      <Button
        sx={{ bg: '$secondary.500', marginTop: '$4', py: '$2' }}
        onPress={submitForm}
        disabled={!values.terms || !isMemberOtpSucess || !!errors.verifyCode}
      >
        {t('common.submit')}
      </Button>
    </FormContainer>
  )
}

export default AccountVerificationForm
