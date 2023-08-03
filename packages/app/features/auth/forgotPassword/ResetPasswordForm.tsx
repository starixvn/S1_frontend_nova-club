import Button from 'app/components/common/Button'
import FormContainer from 'app/components/form/FormContainer'
import Input from 'app/components/form/Input'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import { PASSWORD_MAX_LENGTH } from 'app/utils/validation'
import { styled } from 'dripsy'
import { FormikProps } from 'formik'
import { ComponentProps, useRef } from 'react'
import { TextInput } from 'react-native'
import { ForgotPasswordFormValues } from './hook/useForgotPassword'

const StyledFormContainer = styled(FormContainer)({
  py: '$4',
})

type ResetPasswordFormProps = {
  formik: FormikProps<ForgotPasswordFormValues>
} & ComponentProps<typeof StyledFormContainer>

const ResetPasswordForm = ({ formik, ...rest }: ResetPasswordFormProps) => {
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    submitForm,
    isSubmitting,
  } = formik

  const { t } = useLocalization()
  const desktop = isDesktop()

  const passwordFieldRef = useRef<TextInput>(null)
  const confirmPasswordFieldRef = useRef<TextInput>(null)

  return (
    <StyledFormContainer {...rest}>
      <Input
        icon="pw"
        placeholder={t('common.password')}
        secureTextEntry
        textContentType="password"
        value={values.password}
        onBlur={handleBlur('password')}
        onChangeText={handleChange('password')}
        maxLength={PASSWORD_MAX_LENGTH}
        ref={passwordFieldRef}
        autoComplete="password-new"
        onSubmitEditing={() => confirmPasswordFieldRef.current?.focus()}
        error={
          touched.password && errors.password
            ? t(errors.password, {
                field: t('common.password'),
              })
            : undefined
        }
      />
      <Input
        icon="pw"
        placeholder={t('common.confirmPassword')}
        secureTextEntry
        textContentType="password"
        value={values.confirmPassword}
        onBlur={handleBlur('confirmPassword')}
        onChangeText={handleChange('confirmPassword')}
        maxLength={PASSWORD_MAX_LENGTH}
        ref={confirmPasswordFieldRef}
        autoComplete="password-new"
        onSubmitEditing={submitForm}
        error={
          touched.confirmPassword && errors.confirmPassword
            ? t(errors.confirmPassword, {
                field: t('common.confirmPassword'),
              })
            : undefined
        }
      />

      <Button
        onPress={submitForm}
        loading={isSubmitting}
        sx={{
          bg: '$secondary.500',
          marginTop: desktop ? 'auto' : '$4',
          py: '$1',
        }}
      >
        {t('common.enter')}
      </Button>
    </StyledFormContainer>
  )
}

export default ResetPasswordForm
