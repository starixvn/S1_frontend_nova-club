import { useNetInfo } from '@react-native-community/netinfo'
import { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'

export default function ConnectionCheck() {
  const { openModal, closeModal } = useModal()

  //reason not to use listener
  //https://github.com/react-native-netinfo/react-native-netinfo/issues/314
  const { isInternetReachable } = useNetInfo()

  useEffect(() => {
    console.log(isInternetReachable)
    if (isInternetReachable === false) {
      openModal('ConnectionModal')
    } else {
      closeModal('ConnectionModal')
    }
  }, [isInternetReachable])

  return null
}
