import { NativeModules } from 'react-native'

const RNCNetInfo = NativeModules.RNCNetInfo

export const CheckModuleExist = () => {
  let connectionCheckComponent
  try {
    if (RNCNetInfo) {
      const Files = require('./NetInfoCheckConnection').default
      connectionCheckComponent = <Files />
    }
  } catch (err) {
    console.log('Error importing NetInfoCheckConnection:', err)
  }

  return connectionCheckComponent
}
