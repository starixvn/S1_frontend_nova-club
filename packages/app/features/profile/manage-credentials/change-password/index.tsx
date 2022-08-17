import { Button } from 'app/components/form/Button'
import InputBase from 'app/components/form/Input/InputBase'
import useLocalization from 'app/provider/localization'
import { AlertActions } from 'app/store/alert.slice'
import validation from 'app/utils/validation'
import { styled, Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
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
  const dispatch = useDispatch()
  const { back } = useRouter()

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
        .catch((error) => dispatch(AlertActions.addError(error.message)))

      if (success) {
        dispatch(AlertActions.addSuccess(message))
        actions.resetForm()

        back()
      }
    } catch (e) {
      dispatch(AlertActions.addError('status.systemError'))
    }
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
      <InputBase
        label={t('common.oldPassword')}
        placeholder={t('common.enterOldPassword')}
        value={values.oldPassword}
        onChangeText={handleChange('oldPassword')}
        onBlur={handleBlur('oldPassword')}
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

      <StyledText>{t('common.passwordNote')}</StyledText>
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
