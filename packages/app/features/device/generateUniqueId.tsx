import { getUniqueId } from 'react-native-device-info'

export default async function generateUniqueId() {
  return getUniqueId()
}
