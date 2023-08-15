import useAlert from 'app/hooks/useAlert'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AppState, Linking, Platform } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import useLocalization from 'app/provider/localization'
import { ViewScreenShotMethods } from 'app/components/ViewScreenShot'

export default function useQrReceive() {
  const { t } = useLocalization()
  const appState = useRef(AppState.currentState)
  const [canOpenSetting, setCanOpenSetting] = useState(false)
  const { showAlert } = useAlert()
  const ref = useRef<ViewScreenShotMethods>(null)

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

  return {
    ref,
    buttonLabel: canOpenSetting ? t('qr.openSetting') : t('qr.downloadQr'),
    buttonOnPress:
      canOpenSetting && Platform.OS === 'android'
        ? handleOpenSetting
        : handleDownload,
  }
}
