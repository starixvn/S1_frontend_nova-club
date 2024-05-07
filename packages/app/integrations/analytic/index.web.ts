import { GAEvents } from './events'
import { sendGTMEvent } from '@next/third-parties/google'

export type LogGAEvent = (event: GAEvents, params?: any) => void

export const logEvent: LogGAEvent = (event, params) => {
  sendGTMEvent({
    event,
    ...params,
  })
}
