import QRCodeGenerator from 'app/components/QRCodeGenerator'
import ViewScreenShot, {
  ViewScreenShotMethods,
} from 'app/components/ViewScreenShot'
import Button from 'app/components/common/Button'
import FormContainer from 'app/components/form/FormContainer'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { ScrollView, Text, View } from 'dripsy'
import * as MediaLibrary from 'expo-media-library'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AppState, Linking, Platform } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'

const QrReceive = () => {
  const { t } = useLocalization()
  const ref = useRef<ViewScreenShotMethods>(null)
  const { data } = usePlayerProfileQuery()
  const username = data?.username
  const appState = useRef(AppState.currentState)
  const [canOpenSetting, setCanOpenSetting] = useState(false)
  const { showAlert } = useAlert()

  const hasPermissionDeniedBefore = useCallback(async () => {
    const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync()
    if ((status === 'denied' || status === 'undetermined') && !canAskAgain) {
      setCanOpenSetting(true)
      showAlert(t('qr.noStorageAccess'))
    } else {
      setCanOpenSetting(false)
    }
  }, [])

  const handleDownload = useCallback(() => {
    ref?.current?.download()
    Platform.OS === 'android' && hasPermissionDeniedBefore()
  }, [hasPermissionDeniedBefore])

  const handleOpenSetting = async () => {
    await Linking.openSettings()
  }

  useEffect(() => {
    Platform.OS === 'android' && hasPermissionDeniedBefore()
  }, [])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        Platform.OS === 'android'
      ) {
        hasPermissionDeniedBefore()
      }
      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <FormContainer>
      <ScrollView>
        <View sx={{ p: '2%', borderRadius: 15, alignItems: 'center' }}>
          <ViewScreenShot ref={ref} fileName={`Vui123-${username}`}>
            <QRCodeGenerator />
          </ViewScreenShot>
        </View>
        <View sx={{ alignItems: 'center', py: '$3' }}>
          <Text sx={{ fontWeight: 'bold', fontSize: 18 }}>{username}</Text>
        </View>
        <View sx={{ alignItems: 'center', py: '$3' }}>
          <Text sx={{ fontSize: 16 }}>{t('notes.qr.n1')}</Text>
        </View>
        <Button
          onPress={
            canOpenSetting && Platform.OS === 'android'
              ? handleOpenSetting
              : handleDownload
          }
        >
          {canOpenSetting ? t('qr.openSetting') : t('qr.downloadQr')}
        </Button>
      </ScrollView>
    </FormContainer>
  )
}

export default QrReceive
