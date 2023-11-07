import Button from 'app/components/common/Button'
import CheckBox from 'app/components/common/CheckBox'
import FormContainer from 'app/components/form/FormContainer'
import Input from 'app/components/form/Input'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { ModalStackParams } from 'app/provider/modal'
import { useAppSelector } from 'app/provider/redux/store'
import { PASSWORD_MAX_LENGTH, USERNAME_MAX_LENGTH } from 'app/utils/validation'
import { Pressable, Text, View, styled } from 'dripsy'
import React, { ComponentProps, useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { LoginType } from '../AuthLayout'
import useLoginForm from './useLoginForm'

const StyledFormContainer = styled(FormContainer)({
  py: '$4',
})

type LoginFormProps = {
  isAgent: boolean
  isAgentLoginWithDesktopModal?: boolean
} & ComponentProps<typeof StyledFormContainer>

const { useParam } = createParam()

const LoginForm = ({
  isAgent,
  isAgentLoginWithDesktopModal,
  ...rest
}: LoginFormProps) => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { closeModal, openModal } = useModal<ModalStackParams>()
  const desktop = useIsDesktop()

  const passwordFieldRef = useRef<TextInput>(null)
  const usernameFieldRef = useRef<TextInput>(null)
  const rememberMeCredential = useAppSelector((s) =>
    isAgent
      ? s.setting.agentRememberMeCredentials
      : s.setting.rememberMeCredentials
  )

  const [isRemember, setIsRemember] = useState(() => {
    if (rememberMeCredential) return true
    else return false
  })

  const { formik } = useLoginForm(isAgent, isRemember)

  const {
    isSubmitting,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    submitForm,
    setValues,
  } = formik

  const onCheckboxCheck = () => {
    setIsRemember(!isRemember)
  }

  useEffect(() => {
    if (rememberMeCredential) {
      setIsRemember(true)
    } else {
      setIsRemember(false)
    }
    setValues({
      username: rememberMeCredential?.username ?? '',
      password: rememberMeCredential?.password ?? '',
    })
  }, [isAgent])

  return (
    <StyledFormContainer {...rest}>
      <Input
        autoCapitalize={'none'}
        inputContainerSx={{ width: '100%' }}
        icon="profile-rounded"
        placeholder={t('common.username')}
        textContentType="username"
        value={values.username}
        onBlur={handleBlur('username')}
        onChangeText={handleChange('username')}
        maxLength={USERNAME_MAX_LENGTH}
        ref={usernameFieldRef}
        autoCorrect={false}
        onSubmitEditing={() => {
          passwordFieldRef.current?.focus()
        }}
        error={
          touched.username && errors.username
            ? t(errors.username, {
                field: t('common.username'),
              })
            : undefined
        }
      />
      <Input
        autoCapitalize={'none'}
        inputContainerSx={{ width: '100%' }}
        icon="pw"
        placeholder={t('common.password')}
        secureTextEntry
        textContentType="password"
        value={values.password}
        onBlur={handleBlur('password')}
        onChangeText={handleChange('password')}
        maxLength={PASSWORD_MAX_LENGTH}
        ref={passwordFieldRef}
        autoComplete="password"
        onSubmitEditing={submitForm}
        error={
          touched.password && errors.password
            ? t(errors.password, {
                field: t('common.password'),
              })
            : undefined
        }
      />

      <View
        sx={{
          minHeight: 50,
          justifyContent: 'space-between',
          mb: 10,
        }}
      >
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <CheckBox isCheck={isRemember} onCheck={onCheckboxCheck} />
          <Pressable sx={{ pl: '$2' }} onPress={onCheckboxCheck}>
            <Text>{t('authentication.rememberMe')}</Text>
          </Pressable>
        </View>

        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Pressable
            onPress={() => {
              if (isAgentLoginWithDesktopModal) {
                closeModal('AgentLoginModal', () => {
                  setTimeout(() => {
                    openModal('ForgotPasswordModal', {
                      t: LoginType.Agent,
                    })
                  })
                })

                return
              }

              push({
                pathname: '/auth/forgot-password',
                query: {
                  t: isAgent ? LoginType.Agent : LoginType.Member,
                },
              })
            }}
          >
            <Text>{t('authentication.forgotPassword')}</Text>
          </Pressable>
        </View>
      </View>

      <Button
        loading={isSubmitting}
        onPress={submitForm}
        sx={{ mb: '$2', mt: desktop ? 'auto' : '$2' }}
      >
        {t('authentication.login')}
      </Button>

      <Button
        onPress={() => {
          if (isAgentLoginWithDesktopModal) {
            closeModal('AgentLoginModal', () => {
              setTimeout(() => {
                openModal('RegisterModal', {
                  t: LoginType.Agent,
                })
              })
            })

            return
          }
          push({
            pathname: '/auth/register',
            query: {
              t: isAgent ? LoginType.Agent : LoginType.Member,
            },
          })
        }}
        sx={{ bg: '$primary.300', my: '$2' }}
      >
        {t('authentication.register')}
      </Button>
    </StyledFormContainer>
  )
}

export default LoginForm
