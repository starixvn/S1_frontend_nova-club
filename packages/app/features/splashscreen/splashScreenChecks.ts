import firestore from '@react-native-firebase/firestore'
import { isNewVersionAvailable, Version } from 'app/utils/rn-helper'
import { Linking, Platform } from 'react-native'
import { SplashScreenHandler, SplashScreenTask } from './useSplashScreen'

export const checkVersionUpdated: SplashScreenTask = (context) => async () => {
  const { t, showAlert } = context
  let isUptoDate = true
  let handler = () => {}

  const versions = await firestore().collection('versions').get()
  if (versions) {
    const latestVersion = (await versions.docs[
      versions.docs.length - 1
    ]?.data()) as Version

    isUptoDate = !isNewVersionAvailable(latestVersion)

    console.log('SPLASHSCREEN - binary version status', isUptoDate)

    const { major, minor, patch } = latestVersion

    handler = () => {
      if (!isUptoDate)
        showAlert({
          title: t('forceDownload.title', {
            version: `${major}.${minor}.${patch}`,
          }),
          message:
            `${t('forceDownload.message')}\n\n` +
            latestVersion.changes.reduce((c, s) => `${c}- ${s}\n`, ''),
          actions: [
            {
              label: t('forceDownload.download'),
              onPress: () => {
                try {
                  Linking.openURL(
                    Platform.OS === 'android'
                      ? latestVersion.androidUrl
                      : latestVersion.iosUrl
                  )
                } catch (e) {}
              },
              disableAutoClose: true,
            },
          ],
          persistent: true,
          hideCloseButton: true,
        })
    }
  }

  return {
    result: isUptoDate,
    handler,
  } as SplashScreenHandler
}

export const checkMaintenance: SplashScreenTask = (context) => async () => {
  const { dispatch, navigation } = context
  let isMaintenance = false

  try {
    // const result = await dispatch(bannerApi.endpoints.banners.initiate('vn'))
    // isMaintenance = result.error?.httpResponse?.status === 403
  } catch (e) {
    console.log('failed to check for maintenance', e)
  }

  console.log('SPLASHSCREEN - maintenance status', isMaintenance)
  return {
    result: !isMaintenance,
    handler: () => {
      if (isMaintenance) {
        navigation.navigate('MaintenancePage')
      }
    },
  }
}
