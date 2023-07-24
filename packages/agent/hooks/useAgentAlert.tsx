import { getErrorMessage } from 'app/utils/validation'
import { useModal } from 'react-native-modalfy'

const useAgentAlert = () => {
  const { openModal } = useModal()

  const showAlert = (data) => {
    if (typeof data === 'object' && 'persistent' in data) {
      openModal('AgentAlertModal', data)
    } else if (
      (typeof data === 'object' && 'message' in data) ||
      typeof data === 'string'
    ) {
      openModal('AgentAlertModal', { message: getErrorMessage(data) })
    } else openModal('AgentAlertModal', data)
  }

  return {
    showAlert,
  }
}

export default useAgentAlert
