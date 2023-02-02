import Button from 'agent/components/Button'
import Card from 'agent/components/Card'
import Input from 'agent/components/Input'
import TimerButton, {
  ITimerButtonForwardRef,
} from 'agent/components/TimerButton'
import useAgentAlert from 'agent/hooks/useAgentAlert'
import { useSendOTPMutation } from 'agent/services/accountApi'
import { IResponse } from 'agent/services/common/agentAxiosBaseQuery'
import { useResetPasswordMutation } from 'agent/services/userApi'
import validation, {
  getErrorMessage,
  PASSWORD_MAX_LENGTH,
} from 'agent/utils/validation'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import {
  ActivityIndicator,
  Flex,
  ScrollView,
  Text,
  useDripsyTheme,
  View,
} from 'dripsy'
import { isLoading } from 'expo-font'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useModal } from 'react-native-modalfy'
import * as Yup from 'yup'

interface ResetPasswordValues {
  password: string
  confirmpassword: string
  mobile_no: string
  OTP: string
}

const AgentChangePassword = () => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const { openModal } = useModal()
  const { showAlert } = useAgentAlert()
  const { replace } = useContextualRouter()
  const OTPRef = useRef<ITimerButtonForwardRef>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOtpLoading, setIsOtpLoading] = useState(false)

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
        replace('/agent')
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
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 20,
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
          placeholder={t('common.enterNewPassword')}
          maxLength={PASSWORD_MAX_LENGTH}
          containerProps={{
            sx: { mb: '$3' },
          }}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          error={
            values.password.length === 6 && errors.password
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
          maxLength={PASSWORD_MAX_LENGTH}
          containerProps={{
            sx: { mb: '$3' },
          }}
          onChangeText={handleChange('confirmpassword')}
          onBlur={handleBlur('confirmpassword')}
          value={values.confirmpassword}
          error={
            values.confirmpassword.length === 6 && errors.confirmpassword
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
                  field: 'mobile_no',
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
                  field: 'OTP',
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
  )
}
export default AgentChangePassword
