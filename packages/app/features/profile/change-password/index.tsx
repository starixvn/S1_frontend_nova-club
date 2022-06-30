import { TextField } from 'app/components/TextField'
import { styled, Text, View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import validation from 'app/utils/validation'
import { AlertActions } from 'app/store/alert'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'
import { useChangePasswordMutation } from 'services/changePassword'
import useLocalization from 'app/provider/localization'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { Button } from 'app/components/form/Button'

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
      // const response = await axios.put(
      //   'https://player-stage.gball8.com/api/nv88_api/v1/player_api/password',
      //   {
      //     old_password: oldPassword,
      //     password: password,
      //     cpassword: confirmPassword,
      //     username: 'techtests01',
      //   },
      //   {
      //     headers: {
      //       Authorization: 'Bearer d7623ecec18fea9c4269d00b6d8fa6e1',
      //       api_key: 'zl9oo0vtrtbih1fufvq8pk8stvqprad8',
      //     },
      //   }
      // )
      // console.log(
      //   '🚀 ~ file: index.tsx ~ line 46 ~ ChangePasswordScreen ~ response',
      //   response
      // )

      const { data, success, message } = await postChangePassword({
        old_password: oldPassword,
        password: password,
        cpassword: confirmPassword,
      })
        .unwrap()
        .catch((error) => dispatch(AlertActions.addError(error.message)))

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
        <TextField labelWidth={0.8}>
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
