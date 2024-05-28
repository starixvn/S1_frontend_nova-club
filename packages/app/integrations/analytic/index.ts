import { GAEvents } from './events'
import analytics from '@react-native-firebase/analytics'

export type LogGAEvent = (event: GAEvents, params?: any) => void

export const logEvent: LogGAEvent = async (event, params) => {
  /* APP logEvent will run in async, while web works differently.
     For now, do fire and forget
  */
  analytics().logEvent(event, params)
}

export const setGAUser = (username?: string) => {
  analytics().setUserId(username ?? null)
}
