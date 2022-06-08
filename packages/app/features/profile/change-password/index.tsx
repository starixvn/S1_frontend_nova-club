import { GradientBoxText } from 'app/components/GradientBoxText'
import { styled, Text, View } from 'dripsy'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import validation from 'app/utils/validation'
import { Button } from 'react-native'

type PasswordFormValues = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const ChangePasswordScreen = () => {
  const onSubmit = async ({
    oldPassword,
    newPassword,
    confirmPassword,
  }: PasswordFormValues) => {
    console.log('oldPassword :>> ', oldPassword)
    console.log('newPassword :>> ', newPassword)
    console.log('confirmPassword :>> ', confirmPassword)
  }

  const formik = useFormik<PasswordFormValues>({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: validation.passwordRestrict,
      newPassword: validation.passwordRestrict,
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
            value: values.newPassword,
            onChangeText: handleChange('newPassword'),
            onBlur: handleBlur('newPassword'),
            secureTextEntry: true,
          }}
          error={
            touched.newPassword && errors.newPassword
              ? errors.newPassword
              : undefined
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

      <View sx={{ m: '$12' }}>
        <Button title="Ok" disabled={!isValid || !dirty} />
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
  pt: '$6',
}))

const StyledText = styled(Text)(() => ({
  mx: '$12',
}))
export default ChangePasswordScreen
