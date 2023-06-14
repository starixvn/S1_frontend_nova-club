import { useModal } from 'react-native-modalfy'

const useLoading = () => {
  const { openModal, closeModal } = useModal()

  const toggleLoading = (on?: boolean) => {
    if (on) openModal('LoadingModal')
    else closeModal('LoadingModal')
  }

  return {
    toggleLoading,
  }
}

export default useLoading
