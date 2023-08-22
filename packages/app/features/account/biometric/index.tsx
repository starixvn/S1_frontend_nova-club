import StaticField from 'app/components/StaticField'
import FormContainer from 'app/components/form/FormContainer'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLoginProcess from 'app/features/auth/login/useLoginProcess'
import useLocalization from 'app/provider/localization'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import isDesktop from 'app/utils/isDesktop'
import { Text, styled, useDripsyTheme } from 'dripsy'
import React, { useState } from 'react'
import { Switch } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'

const BiometricScreen = () => {
  const { t } = useLocalization()
  const dispatch = useAppDispatch()
  const desktop = isDesktop()
  const { username } = usePlayerProfileQuery()
  const { showBiometricDialog, biometricProcess } = useLoginProcess()
  const { theme } = useDripsyTheme()

  const biometricCredentials = useAppSelector(
    (s) => s.setting.biometricCredentials
  )
  const isBioLogin =
    !!biometricCredentials && biometricCredentials.username === username

  const toggleBiometricLogin = async () => {
    isBioLogin
      ? dispatch(SettingActions.toggleBiometricLogin(false))
      : // : showBiometricDialog(() => {})
        await biometricProcess(username).catch((e) => {
          console.warn('Biometric Process Error', e)
        }) // Once Flow completed, the promise will be resolved
  }

  return (
    <PageWithBackHeader
      header={{ title: t('biometric.title') }}
      disableScrollView
      hideHeader={desktop}
    >
      <FormContainer sx={{ my: '$4' }} hidePadding>
        <StyledBox>
          <Text>{t('biometric.label')}</Text>
          <Switch
            trackColor={{ false: '#3e3e3e', true: theme.colors?.$primary[100] }}
            thumbColor={isBioLogin ? theme.colors?.$primary[300] : '#f4f3f4'}
            activeThumbColor={theme.colors?.$primary[300]}
            ios_backgroundColor={theme.colors?.$primary[100]}
            onValueChange={() => toggleBiometricLogin()}
            value={isBioLogin}
          />
        </StyledBox>
      </FormContainer>
    </PageWithBackHeader>
  )
}

const StyledBox = styled(StaticField)(() => ({
  flexDirection: 'row',
  mt: 8,
  px: '$pagePadding',
  py: 12,
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export default BiometricScreen
