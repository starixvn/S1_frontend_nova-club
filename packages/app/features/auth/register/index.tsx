import { APP_DEVICE_ANDROID, APP_DEVICE_IOS } from 'app/constant/redux'
import useAlert from 'app/hooks/useAlert'
import useBioAuth from 'app/hooks/useBioAuth'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useShield from 'app/hooks/useShield'
import useUniqueId from 'app/hooks/useUniqueId'
import useLocalization from 'app/provider/localization'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import { SettingActions } from 'app/store/setting.slice'
import { isBannedTrackingCode } from 'app/utils'
import validation from 'app/utils/validation'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import { AnimatePresence, MotiView, useDynamicAnimation } from 'moti'
import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useRegisterMutation } from 'services/authApi'
import {
  LoginResult,
  RegisterResult,
  Shield_Action,
} from 'services/authApi.type'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import AuthLayout from '../layout/AuthLayout'
import VerificationPage from '../verification'
import ReferrerInformation from './ReferrerInformation'
import RegisterForm from './RegisterForm'

export type RegisterFormValues = {
  username: string
  password: string
  confirmPassword: string
  contactNumber: string
  verifyCode: string
  terms: boolean
}

const { useParam } = createParam()

const RegisterPage = () => {
  const [ref] = useParam('ref')
  const [register] = useRegisterMutation()
  const dispatch = useAppDispatch()
  const { push, replace } = useRouter()
  const { showAlert } = useAlert()
  const { openModal } = useModal()
  const { width } = useContainerDimension()
  const { t } = useLocalization()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { uuid } = useUniqueId()
  const { syncShield } = useShield()

  /* allow /auth/register to pass in ref code from query string, same as /download page */
  useEffect(() => {
    if (typeof ref === 'string') {
      dispatch(
        SettingActions.setReferral({
          trackingCode: ref,
        })
      )
    }
  }, [dispatch, ref])

  const { normalLogin } = useBioAuth()
  // referral value is obtained asynchronously, do not assign to initialValues of form.
  // consume it on onSubmit
  const referral = useAppSelector((s) => s.setting.referral)
  const trackingCode = referral?.trackingCode
  const handleOnSuccessRegister = (data?: RegisterResult) => {
    /*
      currently only :
      - freespin will have note on response,
      - freebet's note has been removed at backend
    */
    function setLuckySpinAndNavigate() {
      try {
        if (data?.wheel_info?.totalSpin) {
          dispatch(
            SettingActions.setLuckyDrawBalance(
              Number(data?.wheel_info?.totalSpin)
            )
          )
        }
      } catch (e) {
        console.log('Error setting total spin')
      } finally {
        replace({
          pathname: '/',
        })
      }
    }

    if ('note' in data) {
      const note = data.note
      openModal('AlertModal', {
        message: note,
        onClose: () => setLuckySpinAndNavigate(),
      })
    } else {
      setLuckySpinAndNavigate()
    }
  }

  const onSubmit = async (
    {
      username,
      password,
      confirmPassword,
      verifyCode,
      terms,
      contactNumber,
    }: RegisterFormValues,
    { setStatus }: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      setIsSubmitting(true)
      const { data, success, message } = await register({
        username,
        password,
        cpassword: confirmPassword,
        // WIP: Prefix should not be hardcoded
        contactNumber: '84' + contactNumber,
        terms,
        tracking_code:
          trackingCode && !isBannedTrackingCode(trackingCode)
            ? trackingCode
            : undefined,
        verify_code: verifyCode,
        platform_uuid: uuid ?? '',
        device_os:
          Platform.OS !== 'web'
            ? Platform.OS === 'ios'
              ? APP_DEVICE_IOS
              : APP_DEVICE_ANDROID
            : '',
        registered_by: Platform.OS !== 'web' ? 'APP' : '',
      }).unwrap()

      if (success) {
        syncShield(Shield_Action.REGISTER)
        dispatch(AuthActions.setAuthInfo(data as LoginResult))

        normalLogin(username, password, () => handleOnSuccessRegister(data))
        /* to indicate the register is successfull and used to persist loading on submit button */
        setStatus(true)
      }
    } catch (error) {
      showAlert(error)
      setIsSubmitting(false)
    }
  }

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      contactNumber: '',
      verifyCode: '',
      terms: true,
    },
    validationSchema: Yup.object({
      username: validation.username,
      password: validation.password,
      confirmPassword: validation.confirmPassword,
      contactNumber: validation.phoneNumber,
      verifyCode: validation.verifyCode,
      terms: Yup.bool()
        .required('validation.required')
        .oneOf([true], 'validation.checked'),
    }),
    onSubmit,
  })

  const onRegisterSuccess = () => {
    animationState.animateTo({
      translateX: -width,
    })
  }

  const onBack = () => {
    animationState.animateTo({
      translateX: 0,
    })
  }

  const animationState = useDynamicAnimation(() => {
    return {
      translateX: 0,
    }
  })

  useEffect(() => {
    /** Fix if user change screen size (eg: Screen orientation)
     * Else the `translateX` will stick to previous screen width
     */
    const currentX = animationState.current?.translateX

    if (typeof currentX === 'number' && currentX < 0) {
      animationState.animateTo({
        translateX: -width,
      })
    }
  }, [width])

  return (
    <View sx={{ flexDirection: 'row', flex: 1, overflow: 'hidden' }}>
      <MotiView
        state={animationState}
        style={{ width }}
        transition={{
          type: 'timing',
          duration: 400,
        }}
      >
        <AuthLayout
          formHeader={
            <AnimatePresence>
              {referral && <ReferrerInformation />}
            </AnimatePresence>
          }
          headerDesc={t('auth.accountReg')}
          onBack={() => push('/auth/login')}
        >
          <RegisterForm formik={formik} onSuccess={onRegisterSuccess} />
        </AuthLayout>
      </MotiView>

      <MotiView
        state={animationState}
        style={{ width }}
        transition={{
          type: 'timing',
          duration: 400,
        }}
      >
        <VerificationPage
          formik={formik}
          isSubmitting={isSubmitting}
          onBack={onBack}
        />
      </MotiView>
    </View>
  )
}

export default RegisterPage
