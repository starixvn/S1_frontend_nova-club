import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export function getOs() {
  return Platform.OS
}

export async function getUserAgent() {
  try {
    return DeviceInfo.getUserAgent()
  } catch (error) {
    console.log('🚀 ~ getUserAgent ~ error:', error)
  }
}
