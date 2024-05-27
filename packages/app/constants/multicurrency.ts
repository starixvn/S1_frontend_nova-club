import { Platform } from 'react-native'

/* Only allow multicurrency on beviking domain, except softvnd.beviking.net */
export const IS_MULTICURRENCY_ENABLED =
  Platform.OS === 'web' &&
  typeof window !== 'undefined' &&
  window.location.hostname !== 'softvnd.beviking.net' &&
  window.location.hostname.includes('beviking.net')
