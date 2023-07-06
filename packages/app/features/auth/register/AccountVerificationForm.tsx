import Icon from 'app/components/Icon'
import Input from 'app/components/form/Input'
import { Pressable, Text, View, styled } from 'dripsy'
import { FormikProps } from 'formik'
import { RegisterFormValues } from './RegisterScreen'
import { TextInput } from 'react-native'
import { useCallback, useRef } from 'react'
import useLocalization from 'app/provider/localization'
import CheckBox from 'app/components/common/CheckBox'
import TimerButton from 'app/components/TimerButton'
import { ITimerButtonForwardRef } from 'app/components/TimerButton'
import { useRouter } from 'solito/router'
import { useAppSelector } from 'app/provider/redux/store'
import { useSendUpdateProfileOTPMutation } from 'services/playerApi'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import useAlert from 'app/hooks/useAlert'
import { useSendRegistrationOtpMutation } from 'services/authApi'
import FormContainer from 'app/components/form/FormContainer'

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

  const contactNumberFieldRef = useRef<TextInput>(null)
  const otpFieldRef = useRef<TextInput>(null)
  const OTPRef = useRef<ITimerButtonForwardRef>(null)

  const [sendOtp, { isLoading: isOtpLoading }] =
    useSendRegistrationOtpMutation()

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
    try {
      const { data, message, success } = await sendOtp({
        username: values.username?.toLowerCase(),
        // WIP: Prefix should not be hardcoded
        contactNumber: '84' + values.contactNumber,
      }).unwrap()

      OTPRef.current?.startOtpTimer()

      if (success) {
        Toast.show({ type: 'success', text1: message })
      }
    } catch (error) {
      showAlert(error)
    }
  }

  const handlePressTnC = () => {
    const params = {
      locale: locale,
    }
    push('/auth/register/tnc', params)
  }

  const handleResendOTP = () => {
    console.log('should be contact us')
    // const params = {
    //   locale: locale,
    // }
    // push('/auth/register/tnc', params)
  }

  return (
    <FormContainer
      padding
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
        maxLength={9}
        action={() => (
          <TimerButton
            accessibilityRole="button"
            ref={OTPRef}
            title={t('authentication.send')}
            loading={isOtpLoading}
            onPress={sendOTP}
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
        )}
        value={values.contactNumber}
        onBlur={handleBlur('contactNumber')}
        onChangeText={handleChange('contactNumber')}
        ref={contactNumberFieldRef}
        onSubmitEditing={() => {
          contactNumberFieldRef.current?.focus()
        }}
        error={
          touched.contactNumber && errors.contactNumber
            ? t(errors.contactNumber, {
                field: t('profile.details.phone'),
              })
            : undefined
        }
      />
      <Input
        inputContainerSx={{ width: '100%' }}
        icon="otp"
        placeholder="Please enter OTP"
        textContentType="oneTimeCode"
        prefix="OTP"
        inputMode="numeric"
        action={() => {
          return (
            <TickCircle>
              <Icon name={'tick'} size={14} color={'white'} />
            </TickCircle>
          )
        }}
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
          minHeight: 100,
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

          <Pressable onPress={handleResendOTP}>
            <Text sx={{ color: '$secondary.500' }}>
              {t('authentication.resend')}
            </Text>
          </Pressable>
        </View>
      </View>

      <ButtonContainer
        sx={{ bg: '$secondary.500', marginTop: 20 }}
        onPress={submitForm}
      >
        <ButtonText>Submit</ButtonText>
      </ButtonContainer>
    </FormContainer>
  )
}

const TickCircle = styled(View)({
  backgroundColor: 'green',
  borderRadius: 50,
  p: 5,
})

const ButtonContainer = styled(Pressable)({
  borderRadius: 15,
  mb: 20,
  alignItems: 'center',
})

const ButtonText = styled(Text)({
  width: '100%',
  py: 15,
  px: 25,
  textAlign: 'center',
  textTransform: 'uppercase',
  fontWeight: 'bold',
})

export default AccountVerificationForm
