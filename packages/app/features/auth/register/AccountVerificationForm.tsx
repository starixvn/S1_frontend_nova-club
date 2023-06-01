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
    setTouched,
    setFieldValue,
    validateForm,
  } = formik

  const { t } = useLocalization()
  const { push } = useRouter()
  const locale = useAppSelector((s) => s.setting.locale)

  const contactNumberFieldRef = useRef<TextInput>(null)
  const otpFieldRef = useRef<TextInput>(null)
  const OTPRef = useRef<ITimerButtonForwardRef>(null)

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
      console.log('Send OTP')
    } catch (e) {
      console.log(e)
    }
  }

  const handlePressTnC = () => {
    console.log('tnc pressed')
    // const params = {
    //   locale: locale,
    // }
    // push('/auth/register/tnc', params)
  }

  const handleResendOTP = () => {
    console.log('resend pressed')
    // const params = {
    //   locale: locale,
    // }
    // push('/auth/register/tnc', params)
  }

  return (
    <View
      sx={{
        width: '90%',
        py: 20,
      }}
    >
      <Input
        icon="icon-hp"
        textContentType="telephoneNumber"
        prefix="+84"
        inputMode="numeric"
        action={() => (
          <TimerButton
            accessibilityRole="button"
            ref={OTPRef}
            title={t('authentication.send')}
            // loading={isOtpLoading}
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
              {t('auth.readAndAgree')}{' '}
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
          <Text>{t('auth.noReceiveOTP')} </Text>

          <Pressable onPress={handleResendOTP}>
            <Text sx={{ color: '$secondary.500' }}>{t('auth.resend')}</Text>
          </Pressable>
        </View>
      </View>

      <ButtonContainer
        sx={{ bg: '$secondary.500', marginTop: 20 }}
        onPress={() => console.log('done register')}
      >
        <ButtonText>Submit</ButtonText>
      </ButtonContainer>
    </View>
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
