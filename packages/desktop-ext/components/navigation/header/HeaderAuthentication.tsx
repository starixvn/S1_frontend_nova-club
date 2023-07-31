import AgentLoginButton from 'app/components/AgentLoginButton'
import Shadow from 'app/components/Shadow'
import Button from 'app/components/common/Button'
import IconButton from 'app/components/IconButton'
import Input from 'app/components/form/Input'
import HeaderButton from 'app/components/navigation/header/HeaderButton'
import HeaderLanguageToggle from 'app/components/navigation/header/HeaderLanguageToggle'
import useLoginForm from 'app/features/auth/login/useLoginForm'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import { PASSWORD_MAX_LENGTH, USERNAME_MAX_LENGTH } from 'app/utils/validation'
import { View } from 'dripsy'
import React, { ElementRef, useRef } from 'react'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'

const HeaderAuthentication = () => {
  const { push } = useRouter()
  const { t } = useLocalization()
  const desktop = isDesktop()
  const { openModal } = useModal()
  const { showAlert } = useAlert()
  const passwordFieldRef = useRef<ElementRef<typeof Input>>(null)

  const { formik } = useLoginForm()
  const {
    handleChange,
    handleBlur,
    values,
    isSubmitting,
    submitForm,
    validateForm,
    isValidating,
  } = formik

  const isHideLoginRegisterSection = () => {
    if (!desktop) {
      return true
    }

    const isAuthRelatedURL = window.location.pathname.includes('/auth')

    return isAuthRelatedURL
  }

  const onLogin = async () => {
    if (isValidating) {
      return
    }

    try {
      const { username, password } = await validateForm()

      if (username || password) {
        let errorMessages: string[] = []

        if (username) {
          errorMessages.push(
            t(username, {
              field: t('common.username'),
            })
          )
        }

        if (password) {
          errorMessages.push(
            t(password, {
              field: t('common.password'),
            })
          )
        }

        showAlert(errorMessages.join('\n'))
        return
      }

      submitForm()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: ['$2', '$2', '$2', '$2', '$3'],
      }}
    >
      {isHideLoginRegisterSection() ? null : (
        <>
          <Input
            autoCapitalize={'none'}
            sx={{ mb: 0, width: 200 }}
            inputContainerSx={{ py: '$1' }}
            icon="profile-rounded"
            placeholder="Username"
            textContentType="username"
            value={values.username}
            onBlur={handleBlur('username')}
            onChangeText={handleChange('username')}
            onSubmitEditing={() => {
              passwordFieldRef.current?.focus()
            }}
            maxLength={USERNAME_MAX_LENGTH}
          />
          <Input
            ref={passwordFieldRef}
            autoCapitalize={'none'}
            sx={{ mb: 0, width: 200 }}
            inputContainerSx={{ py: '$1' }}
            icon="pw"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
            value={values.password}
            onBlur={handleBlur('password')}
            onChangeText={handleChange('password')}
            onSubmitEditing={onLogin}
            maxLength={PASSWORD_MAX_LENGTH}
          />
          <IconButton
            nativeID="forgotPassword"
            name="tnc"
            size={20}
            onPress={() => {
              desktop
                ? openModal('ForgotPasswordModal')
                : push('/auth/forgot-password')
            }}
          />
          <HeaderButton
            loading={isSubmitting}
            contentProps={{
              sx: { py: '$2' },
            }}
            onPress={() => (desktop ? onLogin() : push('/auth/login'))}
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
        </>
      )}
      <HeaderLanguageToggle />
      <AgentLoginButton />
    </View>
  )
}

export default HeaderAuthentication
