import Button from 'app/components/common/Button'
import FormContainer from 'app/components/form/FormContainer'
import Input from 'app/components/form/Input'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import validation, { PASSWORD_MAX_LENGTH } from 'app/utils/validation'
import DesktopPageContainer from 'desktop-ext/components/layout/DesktopPage'
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

const ChangePasswordPage = () => {
  const { t } = useLocalization()
  const [postChangePassword] = useChangePasswordMutation()
  const { back } = useRouter()
  const { showAlert } = useAlert()
  const desktop = isDesktop()

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
          console.log('errorup:', error)

          showAlert(error)
          return error
        })

      if (success) {
        Toast.show({ type: 'success', text1: message })
        actions.resetForm()

        back()
      }
    } catch (error) {
      console.log('error:', error)
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
    <ScrollView
      contentContainerSx={{ pb: 20, px: '$4', pt: '$4' }}
      bounces={false}
    >
      <DesktopPageContainer>
        <Input
          responsive
          label={t('manageCredentials.pw.oldPw')}
          placeholder={t('manageCredentials.pw.placeholderOldPw')}
          value={values.oldPassword}
          onChangeText={handleChange('oldPassword')}
          onBlur={handleBlur('oldPassword')}
          maxLength={PASSWORD_MAX_LENGTH}
          secureTextEntry
          error={
            touched.oldPassword && errors.oldPassword
              ? t(errors.oldPassword, {
                  field: t('manageCredentials.pw.oldPw'),
                })
              : undefined
          }
        />
        <Input
          responsive
          label={t('manageCredentials.pw.newPw')}
          placeholder={t('manageCredentials.pw.placeholderNewPw')}
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          maxLength={PASSWORD_MAX_LENGTH}
          secureTextEntry
          error={
            touched.password && errors.password
              ? t(errors.password, {
                  field: t('manageCredentials.pw.newPw'),
                })
              : undefined
          }
        />
        <Input
          responsive
          label={t('manageCredentials.pw.confirmPw')}
          placeholder={t('manageCredentials.pw.placeholderConfirmPw')}
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          maxLength={PASSWORD_MAX_LENGTH}
          secureTextEntry
          error={
            touched.confirmPassword && errors.confirmPassword
              ? t(errors.confirmPassword, {
                  field: t('manageCredentials.pw.confirmPw'),
                })
              : undefined
          }
        />
        <View sx={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button
            onPress={submitForm}
            disabled={!isValid || !dirty}
            sx={{
              mt: '$4',
              ...(desktop
                ? {
                    width: '60%',
                    minWidth: 350,
                  }
                : { width: '100%' }),
            }}
          >
            {t('common.submit')}
          </Button>
        </View>
      </DesktopPageContainer>
    </ScrollView>
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
export default ChangePasswordPage
