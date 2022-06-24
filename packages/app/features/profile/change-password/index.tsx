import { TextField } from 'app/components/TextField'
import { styled, Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import validation from 'app/utils/validation'
import { Button } from 'react-native'
import { AlertActions } from 'app/store/alert'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'
import { useAppSelector } from 'app/provider/redux/store'
import { useChangePasswordMutation } from 'services/changePassword'
import useLocalization from 'app/provider/localization'
import { PageWithBackHeader } from 'app/components/layout/Page'

type PasswordFormValues = {
  oldPassword: string
  password: string
  confirmPassword: string
}

const ChangePasswordScreen = () => {
  const { t } = useLocalization()
  const [postChangePassword] = useChangePasswordMutation()
  const dispatch = useDispatch()
  const { replace } = useRouter()

  const onSubmit = async (
    { oldPassword, password, confirmPassword }: PasswordFormValues,
    actions: FormikHelpers<PasswordFormValues>
  ) => {
    try {
      const { data, success, message } = await postChangePassword({
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
    <PageWithBackHeader header={{ title: t('menu.changePassword') }}>
      <StyledViewPage>
        <TextField labelWidth={0.6}>
          <TextField.TextInput
            label="common.oldPassword"
            _input={{
              placeholder: t('common.enterOldPassword'),
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
          <TextField.TextInput
            label="common.newPassword"
            _input={{
              placeholder: t('common.enterNewPassword'),
              value: values.password,
              onChangeText: handleChange('password'),
              onBlur: handleBlur('password'),
              secureTextEntry: true,
            }}
            error={
              touched.password && errors.password ? errors.password : undefined
            }
          />
          <TextField.TextInput
            label="common.confirmPassword"
            _input={{
              placeholder: t('common.enterConfirmPassword'),
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
        </TextField>

        <View sx={{ m: '$6' }}>
          <Button
            title="Ok"
            disabled={!isValid || !dirty}
            onPress={submitForm}
          />
        </View>

        <StyledText>{t('common.passwordNote')}</StyledText>
      </StyledViewPage>
    </PageWithBackHeader>
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
