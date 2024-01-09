import notifee, {
  AndroidStyle,
  AndroidImportance,
  NotificationAndroid,
} from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'

type NotificationUtils = {
  requestPermission: () => Promise<boolean>
  registerForegroundHandler: () => () => void // return the unsubscribe function
  getToken: () => Promise<string | null | undefined>
}

export const useNotificationUtils = (): NotificationUtils => {
  async function requestPermission() {
    const setting = await notifee.requestPermission()
    return setting ? setting.authorizationStatus > 0 : false
  }

  function registerForegroundHandler() {
    const unsubscribe = messaging().onMessage(onMessageReceived)

    return () => {
      unsubscribe()
    }
  }

  async function getToken() {
    return messaging().getToken()
  }

  async function onMessageReceived(message) {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
    })

    try {
      const { data, notification } = message
      const imgUrl = data.fcm_options?.image
      const attachments = imgUrl ? [{ url: imgUrl }] : []

      let androidNotification: NotificationAndroid = {
        channelId,
        smallIcon: 'ic_notification',
        largeIcon: 'ic_notification',
      }

      if (imgUrl) {
        androidNotification.style = {
          type: AndroidStyle.BIGPICTURE,
          picture: imgUrl,
        }
      }

      await notifee.displayNotification({
        title: notification.title,
        body: notification.body,
        ios: {
          attachments,
        },
        android: androidNotification,
      })
    } catch (e) {
      console.log('on notification received error', e)
    }
  }

  return {
    requestPermission,
    registerForegroundHandler,
    getToken,
  }
}
