import { DripsyGradient } from 'app/components/Gradient'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { useRegisterMutation } from 'services/authApi'
import { LoginResult } from 'services/authApi.type'
import { AlertActions } from 'app/store/alert'
import { AuthActions } from 'app/store/authReducer'
import validation, { getErrorMessage } from 'app/utils/validation'
import { Image, ScrollView, styled, Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import { AnimatePresence, MotiView, useDynamicAnimation } from 'moti'
import React, { useEffect } from 'react'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import AuthLayout from '../layout/AuthLayout'
import VerificationPage from '../verification'
import RegisterForm from './RegisterForm'
import ReferrerInformation from './ReferrerInformation'
import useLocalization from 'app/provider/localization'

export type RegisterFormValues = {
  username: string
  password: string
  confirmPassword: string
  realName: string
  contactNumber: string
  verifyCode: string
  terms: boolean
}

const RegisterPage = () => {
  const [register] = useRegisterMutation()
  const dispatch = useAppDispatch()
  const { push, replace } = useRouter()
  const { width } = useContainerDimension()
  const { t } = useLocalization()

  // referral value is obtained asynchronously, do not assign to initialValues of form.
  // consume it on onSubmit
  const referral = useAppSelector((s) => s.setting.referral)

  const onSubmit = async (
    {
      username,
      password,
      confirmPassword,
      realName,
      verifyCode,
      terms,
      contactNumber,
    }: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      const { data, success, message } = await register({
        username,
        password,
        cpassword: confirmPassword,
        // WIP: Prefix should not be hardcoded
        contactNumber: '84' + contactNumber,
        terms,
        tracking_code: referral?.trackingCode ?? 'cKp859Eko',
        real_name: realName,
        verify_code: verifyCode,
      }).unwrap()

      if (success) {
        dispatch(AuthActions.setAuthInfo(data as LoginResult))
        actions.resetForm()
        replace('/')
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      dispatch(AlertActions.addAlert({ message: errorMessage }))
    }
  }

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      realName: '',
      contactNumber: '',
      verifyCode: '',
      terms: false,
    },
    validationSchema: Yup.object({
      username: validation.username,
      password: validation.passwordRestrict,
      confirmPassword: validation.confirmPassword,
      realName: Yup.string()
        .min(6, 'validation.userNameMinMaxLength')
        .required('validation.required'),
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
        <VerificationPage formik={formik} onBack={onBack} />
      </MotiView>
    </View>
  )
}

export default RegisterPage
