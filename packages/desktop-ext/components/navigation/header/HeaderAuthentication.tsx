import Button from 'app/components/common/Button'
import Input from 'app/components/form/Input'
import useLocalization from 'app/provider/localization'
import { useAppDispatch } from 'app/provider/redux/store'
import { AuthActions } from 'app/store/authReducer'
import isDesktop from 'app/utils/isDesktop'
import validation, {
  PASSWORD_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
} from 'app/utils/validation'
import { View } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { useLoginMutation } from 'services/authApi'
import { useRouter } from 'solito/router'
import { sleep } from 'utils/common'
import * as Yup from 'yup'
import HeaderLanguageToggle from 'app/components/navigation/header/HeaderLanguageToggle'
import HeaderButton from 'app/components/navigation/header/HeaderButton'
type LoginFormValues = {
  username: string
  password: string
}
const HeaderAuthentication = () => {
  const { push } = useRouter()
  const { t } = useLocalization()
  const desktop = isDesktop()
  const dispatch = useAppDispatch()

  const { openModal } = useModal()
  const [login] = useLoginMutation()

  const onSubmit = async (
    { username, password }: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    await sleep(3000)
    const { data, success, message } = await login({
      username,
      password,
    }).unwrap()

    if (success && data) {
      dispatch(AuthActions.setAuthInfo(data))
    }
  }

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: validation.stringRequired,
      password: validation.stringRequired,
    }),
    onSubmit,
  })

  const { handleChange, handleBlur, values, isSubmitting, submitForm } = formik

  return (
    <View sx={{ flexDirection: 'row', alignItems: 'center', gap: '$3' }}>
      <Input
        sx={{ mb: 0, width: 200 }}
        inputContainerSx={{ py: '$1' }}
        icon="profile-rounded"
        placeholder="Username"
        textContentType="username"
        value={values.username}
        onBlur={handleBlur('username')}
        onChangeText={handleChange('username')}
        maxLength={USERNAME_MAX_LENGTH}
      />
      <Input
        sx={{ mb: 0, width: 200 }}
        inputContainerSx={{ py: '$1' }}
        icon="pw"
        placeholder="Password"
        secureTextEntry
        textContentType="password"
        value={values.password}
        onBlur={handleBlur('password')}
        onChangeText={handleChange('password')}
        onSubmitEditing={submitForm}
        maxLength={PASSWORD_MAX_LENGTH}
      />
      <HeaderButton
        loading={isSubmitting}
        contentProps={{
          sx: { py: '$2' },
        }}
        onPress={() => (desktop ? submitForm : push('/auth/login'))}
      >
        {t('authentication.login')}
      </HeaderButton>
      <HeaderButton
        sx={{ bg: '$primary.300' }}
        contentProps={{
          sx: { py: '$2' },
        }}
        onPress={() =>
          desktop ? openModal('RegisterModal') : push('/auth/register')
        }
      >
        {t('authentication.register')}
      </HeaderButton>
      <HeaderLanguageToggle />
    </View>
  )
}

export default HeaderAuthentication
