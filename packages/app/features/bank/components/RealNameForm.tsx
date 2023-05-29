import TimerButton, { ITimerButtonForwardRef } from 'app/components/TimerButton'
import Input from 'app/components/form/Input'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import React, { useEffect, useRef } from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import {
  usePlayerProfileQuery,
  useSendUpdateProfileOTPMutation,
} from 'services/playerApi'

const RealNameForm = ({ formik, children }) => {
  const { t } = useLocalization()
  const { showAlert } = useAlert()

  const { data: playerData } = usePlayerProfileQuery()

  const [sendOtp, { isLoading: isOtpLoading }] =
    useSendUpdateProfileOTPMutation()
  const OTPRef = useRef<ITimerButtonForwardRef>(null)

  useEffect(() => {
    playerData?.firstName.length !== 0 &&
      setFieldValue('realName', playerData?.firstName)
  }, [playerData?.firstName])

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
    setValues,
  } = formik

  const sendOTP = async () => {
    try {
      const { data, message, success } = await sendOtp().unwrap()

      OTPRef.current?.startOtpTimer()

      if (success) {
        Toast.show({ type: 'success', text1: message })
      }
    } catch (error) {
      showAlert(error)
    }
  }

  return (
    <>
      {playerData?.firstName.length !== 0 && (
        <Input
          label={t('profile.details.realname')}
          value={playerData?.firstName || ''}
          editable={false}
        />
      )}
      {playerData?.firstName.length === 0 && (
        <Input
          label={t('bank.accountName')}
          value={values.realName}
          autoComplete="off"
          autoCorrect={false}
          spellCheck={false}
          onChangeText={handleChange('realName')}
          onBlur={handleBlur('realName')}
          error={
            touched.realName && errors.realName
              ? t(errors.realName, {
                  field: t('bank.accountName'),
                })
              : undefined
          }
        />
      )}

      {children}

      {true && (
        <Input
          label={t('OTP')}
          value={values.otp}
          maxLength={6}
          onChangeText={handleChange('otp')}
          onBlur={handleBlur('otp')}
          error={
            touched.otp && errors.otp
              ? t(errors.otp, {
                  field: t('OTP'),
                })
              : undefined
          }
          action={() => (
            <TimerButton
              accessibilityRole="button"
              ref={OTPRef}
              title={t('common.send')}
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
                  color: 'black',
                },
              }}
            />
          )}
        />
      )}
    </>
  )
}

export default RealNameForm
