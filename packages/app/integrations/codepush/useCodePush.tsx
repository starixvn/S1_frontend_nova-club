import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import codePush, { DownloadProgress } from 'react-native-code-push'

/*  
  Due to vui fit mistakenly using its own deployment key on the info.plist instead of vui 123's. 
  This is to forcefully inform codepush to pull from vui123 deployment key instead of vui fit's deployment key embedded on info.plist
  TODO: until vui fit released another version and reverted the deployment key on info plist on vui fit to vui123's deployment key. then only this can be removed
*/

const CODEPUSH_DEPLOYMENT_KEY =
  Platform.OS === 'ios' &&
  (!process.env.APP_ENV || process.env.APP_ENV === 'prod')
    ? '7Z3-B9JPV61mEugXeyoQ3LnBCZg3-Sjk2T0dp'
    : undefined

console.log('CODEPUSH_DEPLOYMENT_KEY', CODEPUSH_DEPLOYMENT_KEY)

export default function useCodePushDownload(
  autoDownload = true,
  mandatory = true,
  onCodePushUpdateFailed?: () => void
) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<codePush.SyncStatus>(
    __DEV__
      ? codePush.SyncStatus.UP_TO_DATE
      : codePush.SyncStatus.CHECKING_FOR_UPDATE
  )

  function onDownloadProgress({ totalBytes, receivedBytes }: DownloadProgress) {
    setProgress(receivedBytes / totalBytes)
  }

  async function syncStatus() {
    const stats = await codePush.sync(
      {
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      (status) => {
        if (status === codePush.SyncStatus.UNKNOWN_ERROR) {
          // Temporarily by pass code push if error download , waiting infra fix the delay
          if (onCodePushUpdateFailed) onCodePushUpdateFailed()
        }
        console.log('syncStatus', status)
      },
      onDownloadProgress
    )

    setStatus(status)

    // This is to force update the release
    const availableUpdate = await codePush.checkForUpdate(
      CODEPUSH_DEPLOYMENT_KEY
    )
    if (availableUpdate) {
      const downloadedPackage = await availableUpdate.download(
        onDownloadProgress
      )
      downloadedPackage.install(codePush.InstallMode.IMMEDIATE)
    } else if (stats === codePush.SyncStatus.UPDATE_INSTALLED) {
      codePush.restartApp()
    }

    console.log('syncStatus', stats)
    console.log('availableUpdate', availableUpdate)
  }

  useEffect(() => {
    async function codePushChecking() {
      const remotePackage = await codePush.checkForUpdate(
        CODEPUSH_DEPLOYMENT_KEY
      )
      console.log('remote package', remotePackage)
      if (remotePackage) {
        if (autoDownload) {
          if (remotePackage.isMandatory === mandatory) {
            setStatus(codePush.SyncStatus.DOWNLOADING_PACKAGE)
            const downloadedPackage = await remotePackage.download(
              onDownloadProgress
            )
            console.log('downloaded package', downloadedPackage)
            if (downloadedPackage) {
              setStatus(codePush.SyncStatus.INSTALLING_UPDATE)
              downloadedPackage.install(codePush.InstallMode.IMMEDIATE)
            } else console.log('CODEPUSH DOWNLOAD PACKAGE MISSING')
          } // TODO if not mandatory
        } // TODO if no auto download
      } else {
        codePush.notifyAppReady()
        setStatus(codePush.SyncStatus.UP_TO_DATE)
      }
    }

    try {
      if (status != codePush.SyncStatus.UP_TO_DATE) codePushChecking()
    } catch (e) {
      console.log('useCodePushDownload error', e)
    }
  }, [])

  return { progress, status, download: syncStatus }
}

export async function checkCodePushDownloadable(
  isMandatory = true
): Promise<boolean> {
  try {
    if (__DEV__) return false

    const remotePackage = await codePush.checkForUpdate(CODEPUSH_DEPLOYMENT_KEY)
    if (remotePackage != null && (!isMandatory || remotePackage.isMandatory)) {
      return true
    }
  } catch (e) {
    console.log('onStartScreenValidation', e)
  }

  return false
}
