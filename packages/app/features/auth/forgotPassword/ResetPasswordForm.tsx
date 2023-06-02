import Input from 'app/components/form/Input'
import { Pressable, Text, View, styled } from 'dripsy'
import { FormikProps } from 'formik'
import { ForgotPasswordFormValues } from './ForgotPasswordScreen'
import { PASSWORD_MAX_LENGTH } from 'app/utils/validation'
import { useCallback, useRef } from 'react'
import { TextInput } from 'react-native'
import useLocalization from 'app/provider/localization'

type ResetPasswordFormProps = {
  formik: FormikProps<ForgotPasswordFormValues>
}

const ResetPasswordForm = ({ formik }: ResetPasswordFormProps) => {
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    submitForm,
    setTouched,
    setFieldValue,
    validateForm,
  } = formik

  const { t } = useLocalization()

  const passwordFieldRef = useRef<TextInput>(null)
  const confirmPasswordFieldRef = useRef<TextInput>(null)

  const onSubmit = useCallback(async () => {
    setTouched({
      password: true,
      confirmPassword: true,
    })

    const { password, confirmPassword } = await validateForm()

    if (password || confirmPassword) return
  }, [setTouched, validateForm])

  return (
    <View
      sx={{
        width: '90%',
        py: 20,
      }}
    >
      <Input
        icon="pw"
        placeholder="Password"
        secureTextEntry
        textContentType="password"
        value={values.password}
        onBlur={handleBlur('password')}
        onChangeText={handleChange('password')}
        maxLength={PASSWORD_MAX_LENGTH}
        ref={passwordFieldRef}
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
        placeholder="Confirm Password"
        secureTextEntry
        textContentType="password"
        value={values.confirmPassword}
        onBlur={handleBlur('confirmPassword')}
        onChangeText={handleChange('confirmPassword')}
        maxLength={PASSWORD_MAX_LENGTH}
        ref={confirmPasswordFieldRef}
        onSubmitEditing={onSubmit}
        error={
          touched.confirmPassword && errors.confirmPassword
            ? t(errors.confirmPassword, {
                field: t('common.confirmPassword'),
              })
            : undefined
        }
      />

      <ButtonContainer
        sx={{ bg: '$secondary.500', marginTop: 65 }}
        onPress={submitForm}
      >
        <ButtonText>Submit</ButtonText>
      </ButtonContainer>
    </View>
  )
}

const ButtonContainer = styled(Pressable)({
  borderRadius: 15,
  mb: 20,
  alignItems: 'center',
})

const ButtonText = styled(Text)({
  width: '100%',
  py: 15,
  px: 25,
  textAlign: 'center',
  textTransform: 'uppercase',
  fontWeight: 'bold',
})

export default ResetPasswordForm
