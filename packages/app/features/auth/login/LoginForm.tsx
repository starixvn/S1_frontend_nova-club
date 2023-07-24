import Button from 'app/components/common/Button'
import CheckBox from 'app/components/common/CheckBox'
import FormContainer from 'app/components/form/FormContainer'
import Input from 'app/components/form/Input'
import useLocalization from 'app/provider/localization'
import { PASSWORD_MAX_LENGTH, USERNAME_MAX_LENGTH } from 'app/utils/validation'
import { Pressable, Text, View } from 'dripsy'
import React, { useEffect, useRef, useState } from 'react'
import { TextInput, useWindowDimensions } from 'react-native'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import useLoginForm from './useLoginForm'
import { useAppSelector } from 'app/provider/redux/store'

type LoginFormValues = {
  username: string
  password: string
}
interface LoginFormProps {
  isAgent: boolean
}
const { useParam } = createParam()

const LoginForm = ({ isAgent }: LoginFormProps) => {
  const { t } = useLocalization()
  const { width } = useWindowDimensions()
  const { replace, push, back } = useRouter()

  // const { handleAgentLogin } = useAfterLogin()

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
    <FormContainer
      sx={{
        py: '$4',
        width: Math.min(768, width),
      }}
    >
      <Input
        autoCapitalize={'none'}
        inputContainerSx={{ width: '100%' }}
        icon="profile-rounded"
        placeholder="Username"
        textContentType="username"
        value={values.username}
        onBlur={handleBlur('username')}
        onChangeText={handleChange('username')}
        maxLength={USERNAME_MAX_LENGTH}
        ref={usernameFieldRef}
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
        placeholder="Password"
        secureTextEntry
        textContentType="password"
        value={values.password}
        onBlur={handleBlur('password')}
        onChangeText={handleChange('password')}
        maxLength={PASSWORD_MAX_LENGTH}
        ref={passwordFieldRef}
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
          <Pressable onPress={() => push('/auth/forgot-password')}>
            <Text>{t('authentication.forgotPassword')}</Text>
          </Pressable>
        </View>
      </View>

      <Button loading={isSubmitting} onPress={submitForm} sx={{ my: '$2' }}>
        {t('authentication.login')}
      </Button>
      <Button
        onPress={() => push('/auth/register')}
        sx={{ bg: '$primary.300', my: '$2' }}
      >
        {t('authentication.register')}
      </Button>
    </FormContainer>
  )
}

export default LoginForm
