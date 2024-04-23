import useLocalization from 'app/provider/localization'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import React, {
  ReactNode,
  forwardRef,
  useCallback,
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
    const [permissionResponse, requestPermission] =
      MediaLibrary.usePermissions()

    const hasAndroidPermission = async () => {
      const hasPermission = await checkDevicePermission()
      if (hasPermission) {
        return true
      }
      const { status } = await MediaLibrary.requestPermissionsAsync()

      return status === 'granted'
    }

    const checkDevicePermission = async () => {
      const permissionStorage =
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

      if (!permissionStorage) return false
      return await PermissionsAndroid.check(permissionStorage)
    }

    const download = useCallback(async () => {
      try {
        // if (!hasPermission) {
        //   setHasPermission(await hasAndroidPermission())
        // }

        if (permissionResponse?.status !== 'granted') {
          await requestPermission()
        } else {
          if (Platform.OS === 'android') {
            captureRef(viewShotRef).then(async (uri) => {
              await saveImage(uri, fileName)

              Toast.show({
                type: 'success',
                text1: t('status.qrDownloadSuccess'),
              })
            })
          }
          if (Platform.OS === 'ios') {
            captureRef(viewShotRef).then(async (uri) => {
              await saveImage(uri, fileName)

              // await MediaLibrary.saveToLibraryAsync(newUri)
              Toast.show({
                type: 'success',
                text1: t('status.qrDownloadSuccess'),
              })
            })
          }
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: error,
        })
      }
    }, [permissionResponse])

    const saveImage = async (sourceUri, customFilename) => {
      try {
        // Get the asset's URI from the ID
        const assetUri = await FileSystem.getInfoAsync(sourceUri)

        // Construct new filename
        const extension = sourceUri.split('.').pop() // Get file extension
        const newFilename = customFilename + '.' + extension
        const newPath = FileSystem.documentDirectory + newFilename

        await FileSystem.copyAsync({
          from: assetUri.uri,
          to: newPath,
        })

        // Save the copied image to the MediaLibrary
        if (Platform.OS === 'ios') await MediaLibrary.createAssetAsync(newPath)
        else await MediaLibrary.saveToLibraryAsync(newPath)
        // Return the new file path
        return newPath
      } catch (error) {
        console.error('Failed to save image: ', error)
        return null
      }
    }

    useImperativeHandle(
      ref,
      () => ({
        download,
      }),
      [download]
    )

    return (
      <ViewShot
        ref={viewShotRef}
        options={{ fileName, format: 'png', quality: 1 }}
      >
        {children}
      </ViewShot>
    )
  }
)

ViewScreenShot.displayName = 'ViewScreenShot'

export default ViewScreenShot
