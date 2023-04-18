import Button from 'agent/components/Button'
import IconButton from 'agent/components/Icon/IconButton'
import Input from 'agent/components/Input'
import TimerButton, {
  ITimerButtonForwardRef,
} from 'agent/components/TimerButton'
import useAgentAlert from 'agent/hooks/useAgentAlert'
import useOnAgentLogout from 'agent/hooks/useOnAgentLogout'
import { useSendOTPMutation } from 'agent/services/accountApi'
import { IResponse } from 'agent/services/common/agentAxiosBaseQuery'
import { useResetPasswordMutation } from 'agent/services/userApi'
import { AgentAuthActions } from 'agent/store/agentAuthReducer'
import { HAS_LOG_IN_MAP } from 'agent/utils/authUtil'
import validation, { getErrorMessage } from 'agent/utils/validation'
import { AGENT_STACK_CONTENT_PADDING } from 'app/constant/sizes'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { useAgentLocalization } from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Flex, Image, ScrollView, Text, useDripsyTheme, View } from 'dripsy'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
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
  const { openModal } = useModal()
  const { showAlert } = useAgentAlert()
  const { push, replace } = useContextualRouter()
  const OTPRef = useRef<ITimerButtonForwardRef>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOtpLoading, setIsOtpLoading] = useState(false)
  const { width } = useWindowDimensions()
  const { top } = useSafeArea()
  const dispatch = useDispatch()
  const { logout } = useOnAgentLogout()

  const [sendOtp] = useSendOTPMutation()
  const [resetPassword] = useResetPasswordMutation()

  const onSubmit = async ({
    password,
    confirmpassword,
    mobile_no,
    OTP,
  }: ResetPasswordValues) => {
    try {
      const { success, message, result } = await resetPassword({
        password,
        confirmpassword,
        mobile_no,
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
        dispatch(
          AgentAuthActions.setAgentIsFirstTimeLogin(
            HAS_LOG_IN_MAP.HAS_LOGIN_BEFORE
          )
        )
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
      OTP: validation.stringRequired,
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
  } = formik

  async function handleSendOtp() {
    try {
      setIsOtpLoading(true)

      const { message, success } = await sendOtp({
        mobile_no: values.mobile_no,
      })
        .unwrap()
        .catch((e) => {
          showAlert(e)
          return e
        })

      if (success) {
        showAlert(message)
        OTPRef.current?.startOtpTimer()
      }
    } catch (e) {
      openModal('AgentAlertModal', { message: getErrorMessage(e) })
    } finally {
      setIsOtpLoading(false)
    }
  }

  return (
    <>
      <View>
        <IconButton
          name="arrow-down"
          color={'white'}
          size={30}
          onPress={() => {
            logout()
            replace('/auth/login')
          }}
          sx={{
            zIndex: 2,
            top: top ? top : 15,
            position: 'absolute',
            transform: [{ rotateZ: '90deg' }],
            left: 15,
          }}
        />
        <Image
          source={require('app/assets/images/auth/pwd.jpg')}
          sx={{
            height: 350 + (top ? top : 15),
            width: Math.min(width, theme.sizes.container),
          }}
          resizeMode={'cover'}
        />
        <Image
          source={require('app/assets/images/logo.png')}
          sx={{
            position: 'absolute',
            height: 100,
            width: Math.min(width, theme.sizes.container),
            top: top ? top : 15,
          }}
          resizeMode={'contain'}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: AGENT_STACK_CONTENT_PADDING,
        }}
        sx={{
          borderRadius: 10,
          bg: 'transparent',
          backgroundColor: 'white',
          top: -top + -10,
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
                loading={isLoading}
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
          />
          <Button
            onPress={submitForm}
            loading={isLoading}
            sx={{ marginY: 20 }}
            disabled={!isValid || !dirty}
          >
            {t('common.submit')}
          </Button>
        </Flex>
      </ScrollView>
    </>
  )
}
export default AgentResetPassword
