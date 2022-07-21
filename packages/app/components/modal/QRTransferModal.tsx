import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { RootState } from 'app/provider/redux/store'
import { Text, View } from 'dripsy'
import React, { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../form/Button'
import ModalWrapper from './ModalWrapper'
import QRCode from 'react-native-qrcode-svg'
import { usePlayerProfileQuery } from 'services/playerApi'
import RNFS, { readDir } from 'react-native-fs'
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

  const onPressCaptureModalContent = useCallback(() => {
    captureRef(ref).then(async (uri) => {
      await MediaLibrary.saveToLibraryAsync(uri)
      await closeModal()

      // let filePath = RNFS.DocumentDirectoryPath + `/vui123-${username}.png`

      // await RNFS.writeFile(filePath, uri, 'base64')
      //   .then((success) => {
      //     console.log(
      //       '🚀 ~ file: QRTransferModal.tsx ~ line 50 ~ .then ~ success',
      //       success
      //     )
      //   })
      //   .then(async () => {
      //     console.log('QRcode saved')
      //     const fileArr = await readDir(RNFS.DocumentDirectoryPath)
      //     console.log(
      //       '🚀 ~ file: QRTransferModal.tsx ~ line 74 ~ .then ~ fileArr',
      //       fileArr
      //     )
      //   })
      //   .catch((err) => console.log('err', err))

      // RNFS.readDir(RNFS.DocumentDirectoryPath).then((result) => {
      //   console.log('GOT RESULT', result)
      // })
    })
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
            <Text sx={{ color: '$black' }}>{data?.data?.username}</Text>
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
