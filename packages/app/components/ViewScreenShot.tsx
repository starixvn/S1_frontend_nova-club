import useLocalization from 'app/provider/localization'
import * as MediaLibrary from 'expo-media-library'
import React, {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import ViewShot, { captureRef } from 'react-native-view-shot'

export interface ViewScreenShotProps {
  children: ReactNode
  fileName: string
}

export interface ViewScreenShotMethods {
  download: () => void
}

const ViewScreenShot = forwardRef<ViewScreenShotMethods, ViewScreenShotProps>(
  function ({ children, fileName = 'screenshot' }: ViewScreenShotProps, ref) {
    const viewShotRef = useRef<ViewShot>(null)
    const { t } = useLocalization()

    const hasAndroidPermission = async () => {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

      if (!permission) return false
      const hasPermission = await PermissionsAndroid.check(permission)
      if (hasPermission) {
        return true
      }

      const status = await PermissionsAndroid.request(permission)
      return status === 'granted'
    }

    async function download() {
      try {
        if (Platform.OS === 'android') if (await !hasAndroidPermission()) return
        captureRef(viewShotRef).then(async (uri) => {
          await MediaLibrary.saveToLibraryAsync(uri)
          Toast.show({ type: 'success', text1: t('status.qrDownloadSuccess') })
        })
      } catch (error) {
        console.log(t('status.systemError'), error)
      }
    }

    useImperativeHandle(
      ref,
      () => ({
        download,
      }),
      []
    )

    return (
      <ViewShot
        ref={viewShotRef}
        options={{ fileName, format: 'jpg', quality: 1 }}
      >
        {children}
      </ViewShot>
    )
  }
)

ViewScreenShot.displayName = 'ViewScreenShot'

export default ViewScreenShot
