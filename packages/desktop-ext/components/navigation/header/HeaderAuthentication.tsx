import Shadow from 'app/components/Shadow'
import Button from 'app/components/common/Button'
import Input from 'app/components/form/Input'
import HeaderButton from 'app/components/navigation/header/HeaderButton'
import HeaderLanguageToggle from 'app/components/navigation/header/HeaderLanguageToggle'
import useLoginForm from 'app/features/auth/login/useLoginForm'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import { PASSWORD_MAX_LENGTH, USERNAME_MAX_LENGTH } from 'app/utils/validation'
import { View } from 'dripsy'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'

const HeaderAuthentication = () => {
  const { push } = useRouter()
  const { t } = useLocalization()
  const desktop = isDesktop()
  const { openModal } = useModal()
  const { formik } = useLoginForm()
  const { handleChange, handleBlur, values, isSubmitting, submitForm } = formik

  return (
    <View
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: ['$2', '$2', '$2', '$2', '$3'],
      }}
    >
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
        maxLength={USERNAME_MAX_LENGTH}
      />
      <Input
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
        onSubmitEditing={submitForm}
        maxLength={PASSWORD_MAX_LENGTH}
      />
      <HeaderButton
        loading={isSubmitting}
        contentProps={{
          sx: { py: '$2' },
        }}
        onPress={() => (desktop ? submitForm() : push('/auth/login'))}
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
      <Shadow
        offset={[0, -1]}
        startColor={'rgba(255, 255, 255, 0.8)'}
        distance={1}
        style={{ borderRadius: 15 }}
        containerStyle={{ marginHorizontal: 5 }}
      >
        <Button
          sx={{
            bg: '$primary.100',
            px: '$3',
            width: 80,
            borderRadius: 15,
          }}
          onPress={() => openModal('AgentLoginModal')}
          contentProps={{ sx: { py: 2 } }}
          titleProps={{
            sx: {
              fontSize: 11,
              wordWrap: 'break-word',
            },
          }}
        >
          {t('common.agentLogin')}
        </Button>
      </Shadow>
    </View>
  )
}

export default HeaderAuthentication
