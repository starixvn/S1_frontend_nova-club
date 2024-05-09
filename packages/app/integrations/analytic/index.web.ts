import { GAEvents } from './events'
import { sendGTMEvent } from '@next/third-parties/google'

export type LogGAEvent = (event: GAEvents, params?: any) => void

export const logEvent: LogGAEvent = (event, params) => {
  sendGTMEvent({
    event,
    ...params,
  })
}

export const setGAUser = (username?: string) => {
  sendGTMEvent({
    event: 'set_user_id',
    user_id: username ?? null,
  })
}
