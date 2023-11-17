import { VAPID_KEY } from '@env'
import firebaseApp from 'app/utils/firebase/firebase'
import {
  getToken as firebaseGetToken,
  getMessaging,
  onMessage,
} from 'firebase/messaging'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

type NotificationUtils = {
  requestPermission: () => Promise<boolean>
  registerForegroundHandler: () => () => void // return the unsubscribe function
  getToken: () => Promise<string | null | undefined>
}

export const useNotificationUtils = (): NotificationUtils => {
  async function requestPermission() {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  function registerForegroundHandler() {
    const unsubscribe = onMessage(getMessaging(firebaseApp), (payload) => {
      console.log('Foreground push notification received:', payload)
      Toast.show({
        type: 'success',
        text1: payload.notification?.title,
        text2: payload.notification?.body,
      })
    })

    return () => {
      unsubscribe()
    }
  }

  async function getToken() {
    try {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        const messaging = getMessaging(firebaseApp)

        const token = await firebaseGetToken(messaging, {
          vapidKey: VAPID_KEY,
        })
        return token
      }
    } catch (error) {
      console.log('An error occurred while retrieving token:', error)
    }
  }

  return {
    requestPermission,
    registerForegroundHandler,
    getToken,
  }
}
