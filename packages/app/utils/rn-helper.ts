import { getVersion } from 'react-native-device-info'
export interface Version {
  major: number
  minor: number
  patch: number
  iosUrl: string
  androidUrl: string
  changes: string[]
}
export function isNewVersionAvailable(remoteVersion: Version) {
  const currentVersion = getVersion()
  console.log('Remote version :', remoteVersion)
  const { major, minor, patch } = remoteVersion
  const newVersionCode = major * 10000 + minor * 100 + patch

  const [majorApp = '1', minorApp = '0', patchApp = '0'] =
    currentVersion.split('.')
  const currentVersionCode =
    parseInt(majorApp, 10) * 10000 +
    parseInt(minorApp, 10) * 100 +
    parseInt(patchApp, 10)

  return newVersionCode > currentVersionCode
}
