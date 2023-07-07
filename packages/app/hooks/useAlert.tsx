import { getErrorMessage } from 'app/utils/validation'
import { useModal } from 'react-native-modalfy'

const useAlert = () => {
  const { openModal } = useModal()

  const showAlert = (data) => {
    if (typeof data === 'object') {
      openModal('AlertModal', data)
    } else if (typeof data === 'string') {
      openModal('AlertModal', { message: getErrorMessage(data) })
    }
  }

  return {
    showAlert,
  }
}

export default useAlert
