import { GradientBoxText } from 'app/components/GradientBoxText'
import { styled, Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import validation from 'app/utils/validation'
import { Button } from 'react-native'
import { useLazyChangePasswordQuery } from 'app/services/changePassword'
import { AlertActions } from 'app/store/alert'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'
import { useAppSelector } from 'app/provider/redux/store'

type PasswordFormValues = {
  oldPassword: string
  password: string
  confirmPassword: string
}

const ChangePasswordScreen = () => {
  const [queryChangePassword] = useLazyChangePasswordQuery()
  const dispatch = useDispatch()
  const { replace } = useRouter()
  const user = useAppSelector((state) => state.player.currentLoginUser)

  const onSubmit = async (
    { oldPassword, password, confirmPassword }: PasswordFormValues,
    actions: FormikHelpers<PasswordFormValues>
  ) => {
    try {
      const { data, success, message } = await queryChangePassword({
        username: user.username,
        old_password: oldPassword,
        password: password,
        cpassword: confirmPassword,
      }).unwrap()

      if (success) {
        console.log('data', data)
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()

        replace('/profile')
      } else {
        dispatch(AlertActions.addError(message))
      }
    } catch (e) {
      dispatch(AlertActions.addError('common.systemError'))
    }
    console.log('oldPassword :>> ', oldPassword)
    console.log('password :>> ', password)
    console.log('confirmPassword :>> ', confirmPassword)
  }

  const formik = useFormik<PasswordFormValues>({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: validation.passwordRestrict,
      password: validation.passwordRestrict,
      confirmPassword: validation.confirmPassword,
    }),
    onSubmit,
  })

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
  } = formik

  return (
    <StyledViewPage>
      <GradientBoxText labelWidth={0.6}>
        <GradientBoxText.TextInput
          label="Old Password"
          _input={{
            placeholder: 'Please enter old password',
            value: values.oldPassword,
            onChangeText: handleChange('oldPassword'),
            onBlur: handleBlur('oldPassword'),
            secureTextEntry: true,
          }}
          error={
            touched.oldPassword && errors.oldPassword
              ? errors.oldPassword
              : undefined
          }
        />
        <GradientBoxText.TextInput
          label="New Password"
          _input={{
            placeholder: 'Please enter new password',
            value: values.password,
            onChangeText: handleChange('password'),
            onBlur: handleBlur('password'),
            secureTextEntry: true,
          }}
          error={
            touched.password && errors.password ? errors.password : undefined
          }
        />
        <GradientBoxText.TextInput
          label="Confirm"
          _input={{
            placeholder: 'Please confirm password',
            value: values.confirmPassword,
            onChangeText: handleChange('confirmPassword'),
            onBlur: handleBlur('confirmPassword'),
            secureTextEntry: true,
          }}
          error={
            touched.confirmPassword && errors.confirmPassword
              ? errors.confirmPassword
              : undefined
          }
        />
      </GradientBoxText>

      <View sx={{ m: '$6' }}>
        <Button title="Ok" disabled={!isValid || !dirty} onPress={submitForm} />
      </View>

      <StyledText>
        {`1. Password must be alphanumeric without special character. The length is unless 6-12 character. \n2. Password can not be the same to old pass`}
      </StyledText>
    </StyledViewPage>
  )
}

const StyledViewPage = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
  pt: '$3',
}))

const StyledText = styled(Text)(() => ({
  mx: '$6',
}))
export default ChangePasswordScreen
