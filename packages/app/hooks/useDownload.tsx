import useLocalization from 'app/provider/localization'
import { createFileName } from 'app/utils'
import * as MediaLibrary from 'expo-media-library'
import * as htmlToImage from 'html-to-image'
import React, { useCallback } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { captureRef } from 'react-native-view-shot'
import { useDispatch } from 'react-redux'
import { usePlayerProfileQuery } from 'services/playerApi'

type useDownloadProps = {
  ref: React.RefObject<any>
  closeModal?: any
}
const useDownload = ({ ref, closeModal }: useDownloadProps) => {
  const dispatch = useDispatch()
  const { t } = useLocalization()
  const { data } = usePlayerProfileQuery()
  const username = data?.data?.username

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

    const hasPermission = await PermissionsAndroid.check(permission)
    if (hasPermission) {
      return true
    }

    const status = await PermissionsAndroid.request(permission)
    return status === 'granted'
  }

  const appScreenshotDownload = useCallback(async () => {
    try {
      if (Platform.OS === 'android') if (await !hasAndroidPermission()) return
      captureRef(ref).then(async (uri) => {
        await MediaLibrary.saveToLibraryAsync(uri)
        closeModal && (await closeModal())
        Toast.show({ type: 'success', text1: t('status.qrDownloadSuccess') })
      })
    } catch (error) {
      console.log(
        '🚀 ~ file: QRTransferModal.tsx ~ line 28 ~ onPressCaptureModalContent ~ error',
        error
      )
    }
  }, [])

  const screenshot = async (node) => {
    const dataURI = await htmlToImage.toJpeg(node)
    return dataURI
  }

  const download = (
    image,
    { name = `Vui123-${username}`, extension = 'jpg' } = {}
  ) => {
    const a = document.createElement('a')
    a.href = image
    a.download = createFileName(extension, name)
    a.click()
    return
  }

  const webScreenshotDownload = () => {
    screenshot(ref.current)
      .then((uri) => download(uri))
      .then(() => closeModal && closeModal())
      .then(() =>
        Toast.show({ type: 'success', text1: t('status.qrDownloadSuccess') })
      )
  }

  return {
    appScreenshotDownload,
    webScreenshotDownload,
  }
}

export default useDownload
