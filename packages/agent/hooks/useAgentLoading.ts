import { useModal } from 'react-native-modalfy'

const useAgentLoading = () => {
  const { openModal, closeModal } = useModal()

  const toggleLoading = (on?: boolean) => {
    if (on) openModal('AgentLoadingModal')
    else closeModal('AgentLoadingModal')
  }

  return {
    toggleLoading,
  }
}

export default useAgentLoading
