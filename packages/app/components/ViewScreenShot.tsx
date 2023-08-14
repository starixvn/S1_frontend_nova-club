import useLocalization from 'app/provider/localization'
import * as MediaLibrary from 'expo-media-library'
import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
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
    const [hasPermission, setHasPermission] = useState(false)
    useEffect(() => {
      if (Platform.OS === 'android' && hasPermission) {
        download()
      }
    }, [hasPermission])
    const hasAndroidPermission = async () => {
      const permissionStorage =
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

      if (!permissionStorage) return false
      const hasPermission = await PermissionsAndroid.check(permissionStorage)
      if (hasPermission) {
        return true
      }
      const { status } = await MediaLibrary.requestPermissionsAsync()

      return status === 'granted'
    }

    async function download() {
      try {
        if (Platform.OS === 'android' && !hasPermission) {
          setHasPermission(await hasAndroidPermission())
        }
        if (Platform.OS === 'android' && hasPermission) {
          captureRef(viewShotRef).then(async (uri) => {
            await MediaLibrary.saveToLibraryAsync(uri)
            Toast.show({
              type: 'success',
              text1: t('status.qrDownloadSuccess'),
            })
          })
        }
        if (Platform.OS === 'ios') {
          captureRef(viewShotRef).then(async (uri) => {
            await MediaLibrary.saveToLibraryAsync(uri)
            Toast.show({
              type: 'success',
              text1: t('status.qrDownloadSuccess'),
            })
          })
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: error,
        })
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
