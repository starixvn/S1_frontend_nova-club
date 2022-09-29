import { Button } from 'app/components/form/Button'
import InputBase from 'app/components/form/Input/InputBase'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import validation, { PASSWORD_MAX_LENGTH } from 'app/utils/validation'
import { ScrollView, styled, Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useChangePasswordMutation } from 'services/changePassword'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'

type PasswordFormValues = {
  oldPassword: string
  password: string
  confirmPassword: string
}

const ChangePasswordScreen = () => {
  const { t } = useLocalization()
  const [postChangePassword] = useChangePasswordMutation()
  const { back } = useRouter()
  const { showAlert } = useAlert()

  const onSubmit = async (
    { oldPassword, password, confirmPassword }: PasswordFormValues,
    actions: FormikHelpers<PasswordFormValues>
  ) => {
    try {
      const { data, success, message } = await postChangePassword({
        old_password: oldPassword,
        password: password,
        cpassword: confirmPassword,
      })
        .unwrap()
        .catch((error) => {
          showAlert(error)
          return error
        })

      if (success) {
        Toast.show({ type: 'success', text1: message })
        actions.resetForm()

        back()
      }
    } catch (error) {
      showAlert(error)
    }
  }

  const formik = useFormik<PasswordFormValues>({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: validation.password,
      password: validation.password,
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
    <StyledScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <InputBase
        label={t('common.oldPassword')}
        placeholder={t('common.enterOldPassword')}
        value={values.oldPassword}
        onChangeText={handleChange('oldPassword')}
        onBlur={handleBlur('oldPassword')}
        maxLength={PASSWORD_MAX_LENGTH}
        secureTextEntry
        error={
          touched.oldPassword && errors.oldPassword
            ? t(errors.oldPassword, {
                field: t('common.oldPassword'),
              })
            : undefined
        }
      />
      <InputBase
        label={t('common.newPassword')}
        placeholder={t('common.enterNewPassword')}
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        maxLength={PASSWORD_MAX_LENGTH}
        secureTextEntry
        error={
          touched.password && errors.password
            ? t(errors.password, {
                field: t('common.newPassword'),
              })
            : undefined
        }
      />
      <InputBase
        label={t('common.confirmPassword')}
        placeholder={t('common.enterConfirmPassword')}
        value={values.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        maxLength={PASSWORD_MAX_LENGTH}
        secureTextEntry
        error={
          touched.confirmPassword && errors.confirmPassword
            ? t(errors.confirmPassword, {
                field: t('common.confirmPassword'),
              })
            : undefined
        }
      />

      <Button
        rounded
        stretch
        loading={isSubmitting}
        disabled={!isValid || !dirty}
        variant="lg"
        fill={{
          type: 'gradient',
          color: 'secondary',
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
        containerStyle={{
          m: '$10',
        }}
        onPress={submitForm}
      >
        <Button.Label>{t('common.ok')}</Button.Label>
      </Button>
    </StyledScrollView>
  )
}

const StyledScrollView = styled(ScrollView)(() => ({
  flex: 1,
  bg: '$secondary',
  pt: '$3',
}))

const StyledText = styled(Text)(() => ({
  mx: '$6',
}))
export default ChangePasswordScreen
