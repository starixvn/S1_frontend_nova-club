import { uuidv4 } from 'utils/common'

export default async function generateUniqueId() {
  let uuid = ''

  try {
    uuid = self.crypto.randomUUID()
  } catch (e) {
    uuid = uuidv4()
  }

  return uuid
}
