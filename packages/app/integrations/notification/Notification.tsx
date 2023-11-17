import { useNotificationUtils } from 'app/hooks/notification/useNotificationUtils'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'

import { SettingActions } from 'app/store/setting.slice'
import { useEffect, useState } from 'react'
import {
  useSubscribeMutation,
  useSubscribeTopicMutation,
  useUnsubscribeMutation,
} from 'services/subscriptionApi'
import { Currency } from 'utils/constant'

const Notification = () => {
  const username = useAppSelector((state) => state.auth.info?.playerName)
  const lastSubscribedUsername = useAppSelector(
    (state) => state.setting.lastSubscribeUsername
  )
  const [topicSubscription] = useSubscribeTopicMutation()
  const [subscribeMember] = useSubscribeMutation()
  const [unSubscribeMember] = useUnsubscribeMutation()

  const [fcmToken, setFcmToken] = useState<string | undefined>()
  const dispatch = useAppDispatch()

  const { requestPermission, getToken, registerForegroundHandler } =
    useNotificationUtils()

  useEffect(() => {
    const unSubscribeAsync = initializeNotification()

    // cleanup listeners
    return () => {
      unSubscribeAsync.then((fn) => fn && fn())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (fcmToken) {
      if (username) {
        if (username !== lastSubscribedUsername) {
          subscribeMemberToken(username, fcmToken)

          dispatch(SettingActions.setLastSubscribeUsername(username))

          if (lastSubscribedUsername) {
            unsubscribeMemberToken(lastSubscribedUsername)
          }
        }
      } else if (lastSubscribedUsername) {
        unsubscribeMemberToken(lastSubscribedUsername)
        dispatch(SettingActions.setLastSubscribeUsername(''))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, fcmToken])

  async function initializeNotification() {
    const granted = await requestPermission()
    if (granted) {
      const acquiredToken = await getToken()
      if (acquiredToken) {
        topicSubscription({
          brand: 'v123',
          fcmToken: acquiredToken,
          topic: 'all',
        })

        setFcmToken(acquiredToken)

        const unsubscribeForeground = registerForegroundHandler()

        return () => {
          unsubscribeForeground()
        }
      }
    }
  }

  async function subscribeMemberToken(
    usernameToSubscribe: string,
    token: string
  ) {
    subscribeMember({
      brand: 'v123',
      currency: Currency.VND,
      memberId: usernameToSubscribe,
      fcmToken: token,
    })
  }

  async function unsubscribeMemberToken(usernameToUnsubscribe: string) {
    console.log('test-----', usernameToUnsubscribe)
    unSubscribeMember({
      brand: 'v123',
      memberId: usernameToUnsubscribe,
    })
  }

  return null
}
export default Notification
