import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React, { useCallback, useRef, useState } from 'react'
import { Button } from '../form/Button'
import ModalWrapper from './ModalWrapper'
import QRCode from 'react-native-qrcode-svg'
import { usePlayerProfileQuery } from 'services/playerApi'
import { PermissionsAndroid, Platform } from 'react-native'
import ViewShot, { captureRef } from 'react-native-view-shot'
import * as MediaLibrary from 'expo-media-library'

const QRTransferModal = ({ modal: { closeModal } }) => {
  const { t } = useLocalization()
  const ref = useRef()

  const { width, height } = useContainerDimension()

  const { data } = usePlayerProfileQuery()
  const username = data?.data?.username
  const referralCode = data?.data?.referral_code

  const onPressCaptureModalContent = useCallback(async () => {
    try {
      if (Platform.OS === 'android') if (await !hasAndroidPermission()) return
      captureRef(ref).then(async (uri) => {
        await MediaLibrary.saveToLibraryAsync(uri)
        await closeModal()
      })
    } catch (error) {
      console.log(
        '🚀 ~ file: QRTransferModal.tsx ~ line 28 ~ onPressCaptureModalContent ~ error',
        error
      )
    }
  }, [])

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

    const hasPermission = await PermissionsAndroid.check(permission)
    if (hasPermission) {
      return true
    }

    const status = await PermissionsAndroid.request(permission)
    return status === 'granted'
  }

  function onDismiss() {
    closeModal()
  }

  return (
    <ModalWrapper sx={{ width }}>
      <View
        sx={{
          bg: 'white',
          borderRadius: 12,
          p: '$4',
          width: '100%',
        }}
      >
        <ViewShot
          ref={ref}
          options={{ fileName: 'Your-File-Name', format: 'png', quality: 0.9 }}
        >
          <View
            sx={{
              alignItems: 'center',
              bg: 'white',
              aspectRatio: 1,
              justifyContent: 'space-evenly',
            }}
          >
            <Text sx={{ color: '$black' }}>{username}</Text>
            <QRCode
              value={referralCode}
              size={width * 0.5}
              logo={require('../../assets/nclub-appicon.png')}
              ecl="H"
              quietZone={12}
              logoBackgroundColor="white"
              logoMargin={4}
              logoBorderRadius={100}
            />
            <Text sx={{ color: '$black' }}>{t('notes.qr.n1')}</Text>
          </View>
        </ViewShot>

        <Button
          rounded
          stretch
          variant="lg"
          fill={{
            type: 'gradient',
            color: 'secondary',
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          onPress={onPressCaptureModalContent}
        >
          <Button.Label>{t('qr.downloadQrCode')}</Button.Label>
        </Button>
      </View>
    </ModalWrapper>
  )
}

export default QRTransferModal
