import { getErrorMessage } from 'app/utils/validation'
import { useModal } from 'react-native-modalfy'

const useAlert = () => {
  const { openModal, currentModal } = useModal()

  const showAlert = (data) => {
    if (typeof data === 'object') {
      openModal('AlertModal', data)
    } else if (typeof data === 'string') {
      openModal('AlertModal', { message: getErrorMessage(data) })
    }
  }

  return {
    showAlert,
    currentModal,
  }
}

export default useAlert
