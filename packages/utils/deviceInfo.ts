import DeviceInfo from 'react-native-device-info'

export async function getUserAgent() {
  try {
    return DeviceInfo.getUserAgent()
  } catch (error) {
    console.log('🚀 ~ getUserAgent ~ error:', error)
  }
}
