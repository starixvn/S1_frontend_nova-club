import Button from 'agent/components/Button'
import Input from 'agent/components/Input'
import TimerButton, {
  ITimerButtonForwardRef,
} from 'agent/components/TimerButton'
import useAgentAlert from 'agent/hooks/useAgentAlert'
import useOnAgentLogout from 'agent/hooks/useOnAgentLogout'
import CommonBackHeader from 'agent/navigation/components/CommonBackHeader'
import { IResponse } from 'agent/services/common/agentAxiosBaseQuery'
import {
  useResetPasswordMutation,
  useResetPasswordOTPMutation,
} from 'agent/services/userApi'
import { AgentAuthActions } from 'agent/store/agentAuthReducer'
import validation, {
  MAX_OTP_DIGIT,
  MAX_PHONE_DIGIT,
  getErrorMessage,
} from 'agent/utils/validation'
import KeyboardView from 'app/components/KeyboardView'
import { MOBILE_PREFIX } from 'app/constants/country'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useAgentLocalization } from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Flex, Image, Text, View, useDripsyTheme } from 'dripsy'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'

interface ResetPasswordValues {
  password: string
  confirmpassword: string
  mobile_no: string
  OTP: string
}

const AgentResetPassword = () => {
  const { t } = useAgentLocalization()
  const { theme } = useDripsyTheme()
  const { width } = useContainerDimension()
  const { openModal } = useModal()
  const { showAlert } = useAgentAlert()
  const { push, replace } = useRouter()
  const OTPRef = useRef<ITimerButtonForwardRef>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isEnableOtp, setEnableOtp] = useState(false)
  const { top } = useSafeArea()
  const dispatch = useDispatch()
  const { logout } = useOnAgentLogout()

  const [sendOtp, { isLoading: isOtpLoading }] = useResetPasswordOTPMutation()
  const [resetPassword] = useResetPasswordMutation()

  const onSubmit = async ({
    password,
    confirmpassword,
    mobile_no,
    OTP,
  }: ResetPasswordValues) => {
    try {
      setIsLoading(true)

      const { success, message, result } = await resetPassword({
        password,
        confirmpassword,
        mobile_no: MOBILE_PREFIX.VND + mobile_no,
        OTP,
      })
        .unwrap()
        .catch((e): IResponse<[]> => {
          showAlert(e)
          return e
        })

      if (success) {
        showAlert(message)
        Platform.select({
          web: function () {
            replace('/agent')
          },
          default: function () {
            push('/agent')
          },
        })()
        dispatch(AgentAuthActions.setAgentHasLoginBefore(true))
      }
    } catch (e) {
      showAlert(e)
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik<ResetPasswordValues>({
    initialValues: {
      password: '',
      confirmpassword: '',
      mobile_no: '',
      OTP: '',
    },
    validationSchema: Yup.object({
      password: validation.password,
      confirmpassword: validation.confirmPassword,
      mobile_no: validation.phoneNumber,
      OTP: validation.verifyCode,
    }),
    onSubmit,
  })

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    dirty,
    submitForm,
    setTouched,
  } = formik

  async function handleSendOtp() {
    try {
      const inputValidationResult = await setTouched(
        {
          password: touched.password,
          confirmpassword: touched.confirmpassword,
          OTP: touched.OTP,
          mobile_no: true,
        },
        true
      )

      if (inputValidationResult?.mobile_no) {
        return
      }

      const { message, success } = await sendOtp({
        mobile_no: MOBILE_PREFIX.VND + values.mobile_no,
      })
        .unwrap()
        .catch((e) => {
          showAlert(e)
          return e
        })

      if (success) {
        OTPRef.current?.startOtpTimer()
        setEnableOtp(true)
      }
    } catch (e) {
      openModal('AgentAlertModal', { message: getErrorMessage(e) })
    }
  }
  //Todo: Bad Fix - Andy
  const customRouteFunction = () => {
    logout()
  }
  return (
    <>
      <CommonBackHeader
        title=""
        sx={{ bg: '#0a2143', paddingTop: top }}
        customRoute={() => customRouteFunction()}
      />
      <KeyboardView
        bounces={false}
        contentContainerStyle={{
          zIndex: 5,
          backgroundColor: '#0a2143',
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          sx={{
            alignItems: 'center',
            paddingTop: Platform.OS === 'web' ? 45 : 0,
          }}
        >
          <Image
            source={require('app/assets/images/auth/pwd.jpg')}
            sx={{
              height: 325,
              width,
            }}
            resizeMode={'cover'}
            alt=""
          />
          <Image
            source={require('app/assets/images/logo.png')}
            sx={{
              position: 'absolute',
              height: Math.min(75, width * 0.25),
              aspectRatio: 67 / 24,
            }}
            resizeMode={'contain'}
            alt=""
          />
        </View>
        <View
          sx={{
            bg: 'white',
            px: '$5',
            borderRadius: 15,
            minHeight: 500,
            pt: '$5',
          }}
        >
          <Flex
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Input
              label={t('common.newPassword')}
              isRequired
              secureTextEntry
              placeholder={t('placeholder.enterNewPassword')}
              containerProps={{
                sx: { mb: '$3' },
              }}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={
                touched.password && errors.password
                  ? t(errors.password, {
                      field: t('common.newPassword'),
                    })
                  : undefined
              }
            />
            <Input
              label={t('common.confirmPassword')}
              isRequired
              secureTextEntry
              placeholder={t('placeholder.enterConfirmPassword')}
              containerProps={{
                sx: { mb: '$3' },
              }}
              onChangeText={handleChange('confirmpassword')}
              onBlur={handleBlur('confirmpassword')}
              value={values.confirmpassword}
              error={
                touched.confirmpassword && errors.confirmpassword
                  ? t(errors.confirmpassword, {
                      field: t('common.confirmPassword'),
                    })
                  : undefined
              }
            />
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
                  loading={isOtpLoading}
                  onPress={handleSendOtp}
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
              maxLength={MAX_PHONE_DIGIT}
              isRequired
              error={
                touched.mobile_no && errors.mobile_no
                  ? t(errors.mobile_no, {
                      field: t('common.mobileNumber'),
                    })
                  : undefined
              }
              onChangeText={handleChange('mobile_no')}
              onBlur={handleBlur('mobile_no')}
              keyboardType={'numeric'}
              value={values.mobile_no}
            />
            <Input
              label={t('common.enter') + ' ' + t('common.otp')}
              containerProps={{
                sx: { mb: '$3' },
              }}
              isRequired
              error={
                touched.OTP && errors.OTP
                  ? t(errors.OTP, {
                      field: t('common.mobileNumber') + ' ' + t('common.otp'),
                    })
                  : undefined
              }
              onChangeText={handleChange('OTP')}
              onBlur={handleBlur('OTP')}
              keyboardType={'numeric'}
              maxLength={MAX_OTP_DIGIT}
              editable={isEnableOtp}
            />

            <Button
              onPress={submitForm}
              loading={isLoading}
              sx={{ marginY: 20, minHeight: 38, width: '100%', maxWidth: 135 }}
              disabled={!isValid || !dirty}
            >
              {t('common.submit')}
            </Button>
          </Flex>
        </View>
      </KeyboardView>
    </>
  )
}
export default AgentResetPassword
