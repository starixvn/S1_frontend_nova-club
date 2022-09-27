import { getErrorMessage } from 'app/utils/validation'
import { useModal } from 'react-native-modalfy'

const useAlert = () => {
  const { openModal } = useModal()

  const showAlert = (data) => {
    if (typeof data === 'object' && 'persistent' in data) {
      openModal('AlertModal', data)
    } else if (
      (typeof data === 'object' && 'message' in data) ||
      typeof data === 'string'
    ) {
      openModal('AlertModal', { message: getErrorMessage(data) })
    } else openModal('AlertModal', data)
  }

  return {
    showAlert,
  }
}

export default useAlert
