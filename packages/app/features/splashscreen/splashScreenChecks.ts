import { CommonActions } from '@react-navigation/native'
import { contentApi } from 'services/contentApi'
import { SplashScreenHandler, SplashScreenTask } from './useSplashScreen'
import firestore from '@react-native-firebase/firestore'
import { Version, isNewVersionAvailable } from 'app/utils/rn-helper'
import { Linking, Platform } from 'react-native'
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
  let isForbidden = false

  try {
    const { error, data } = await dispatch(
      contentApi.endpoints.getLeaderboard.initiate()
    )

    isForbidden = error?.statusCode === 403
    isMaintenance =
      error?.statusCode === 405 ||
      error?.statusCode === 404 ||
      typeof data === 'string'
  } catch (e) {
    console.log('failed to check for maintenance', e)
  }

  console.log('SPLASHSCREEN - maintenance status', isMaintenance)
  console.log('SPLASHSCREEN - forbidden status', isForbidden)
  return {
    result: !isMaintenance && !isForbidden,
    handler: () => {
      if (isMaintenance) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Maintenance' }],
          })
        )
      } else if (isForbidden) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Forbidden' }],
          })
        )
      }
    },
  }
}
