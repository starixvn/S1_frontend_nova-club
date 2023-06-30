import { getErrorMessage } from 'app/utils/validation'
import { useCallback } from 'react'
import { useModal } from 'react-native-modalfy'

const useAlert = () => {
  const { openModal } = useModal()

  const showAlert = useCallback(
    (data) => {
      if (typeof data === 'object' && 'persistent' in data) {
        openModal('AlertModal', data)
      } else if (
        (typeof data === 'object' && 'message' in data) ||
        typeof data === 'string'
      ) {
        openModal('AlertModal', { message: getErrorMessage(data) })
      } else openModal('AlertModal', data)
    },
    [openModal]
  )

  return {
    showAlert,
  }
}

export default useAlert
