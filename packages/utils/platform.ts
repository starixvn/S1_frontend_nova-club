import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export function getOs() {
  return Platform.OS
}

export async function getUserAgent() {
  const res = await DeviceInfo.getUserAgent().then((userAgent) => {
    return userAgent
  })

  return res
}
