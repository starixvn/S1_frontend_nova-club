import notifee, { AndroidStyle } from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'

type NotificationUtils = {
  requestPermission: () => Promise<boolean>
  registerForegroundHandler: () => () => void // return the unsubscribe function
  getToken: () => Promise<string | null | undefined>
}

export const useNotificationUtils = (): NotificationUtils => {
  async function requestPermission() {
    return (await messaging().requestPermission()) > 0
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
    })

    try {
      const { data, notification } = message
      const imgUrl = data.fcm_options?.image
      const attachments = imgUrl ? [{ url: imgUrl }] : []

      console.log(imgUrl)
      await notifee.displayNotification({
        title: notification.title,
        body: notification.body,
        ios: {
          attachments,
        },
        android: {
          channelId,
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: imgUrl,
          },
        },
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
