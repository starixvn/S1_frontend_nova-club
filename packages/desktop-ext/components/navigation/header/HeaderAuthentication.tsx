import AgentLoginButton from 'app/components/AgentLoginButton'
import IconButton from 'app/components/IconButton'
import Input from 'app/components/form/Input'
import HeaderButton from 'app/components/navigation/header/HeaderButton'
import HeaderLanguageToggle from 'app/components/navigation/header/HeaderLanguageToggle'
import useLoginForm from 'app/features/auth/login/useLoginForm'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import { PASSWORD_MAX_LENGTH, USERNAME_MAX_LENGTH } from 'app/utils/validation'
import { Pressable, Row, Text, View, styled, useResponsiveValue } from 'dripsy'
import React, { ElementRef, useRef, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'

const StyledForgotPasswordText = styled(Text)({
  fontSize: 11,
  fontWeight: '500',
})

const HeaderAuthentication = () => {
  const { push } = useRouter()
  const { t } = useLocalization()
  const desktop = isDesktop()
  const { openModal } = useModal()
  const { showAlert } = useAlert()
  const passwordFieldRef = useRef<ElementRef<typeof Input>>(null)

  const [forgotPasswordPosition, setForgotPasswordPosition] = useState({
    x: 0,
    y: 0,
  })

  const headerGapResponsiveValue = useResponsiveValue([
    '$2',
    '$2',
    '$2',
    '$2',
    '$3',
  ])

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
        gap: headerGapResponsiveValue,
      }}
    >
      <View sx={{ mt: '$1' }}>
        <Row sx={{ gap: headerGapResponsiveValue }}>
          <Input
            autoCapitalize={'none'}
            sx={{ mb: 0, width: 200 }}
            inputContainerSx={{ py: 1 }}
            icon="profile-rounded"
            placeholder={t('common.username')}
            textContentType="username"
            value={values.username}
            onBlur={handleBlur('username')}
            onChangeText={handleChange('username')}
            onSubmitEditing={() => {
              passwordFieldRef.current?.focus()
            }}
            maxLength={USERNAME_MAX_LENGTH}
            tabIndex={1}
          />

          <Input
            ref={passwordFieldRef}
            autoCapitalize={'none'}
            sx={{ mb: 0, width: 200 }}
            inputContainerSx={{ py: 1 }}
            icon="pw"
            placeholder={t('common.password')}
            secureTextEntry
            textContentType="password"
            value={values.password}
            onBlur={handleBlur('password')}
            onChangeText={handleChange('password')}
            onSubmitEditing={onLogin}
            maxLength={PASSWORD_MAX_LENGTH}
          />
        </Row>

        <View sx={{ alignItems: 'flex-end' }}>
          {/* Act as a placeholder for the actual forgot password to move to this location */}
          {/* Reason: To solve `tabIndex` issue, rather than specify `tabIndex` number on each component */}
          <StyledForgotPasswordText
            sx={{ visibility: 'hidden' }}
            onLayout={(e) => {
              const { top, x } = e.nativeEvent.layout
              setForgotPasswordPosition({
                x: Math.floor(x),
                y: Math.floor(top),
              })
            }}
          >
            {t('authentication.forgotPassword')}
          </StyledForgotPasswordText>
        </View>
      </View>

      <HeaderButton
        loading={isSubmitting}
        contentProps={{
          sx: { py: '$2' },
        }}
        onPress={() => (desktop ? onLogin() : push('/auth/login'))}
      >
        {t('authentication.login')}
      </HeaderButton>

      {forgotPasswordPosition.x > 0 && (
        <Pressable
          onPress={() => {
            desktop
              ? openModal('ForgotPasswordModal')
              : push('/auth/forgot-password')
          }}
          sx={{
            position: 'absolute',
            top: forgotPasswordPosition.y - 2,
            left: forgotPasswordPosition.x,
          }}
        >
          <StyledForgotPasswordText>
            {t('authentication.forgotPassword')}
          </StyledForgotPasswordText>
        </Pressable>
      )}

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
      <AgentLoginButton />
    </View>
  )
}

export default HeaderAuthentication
