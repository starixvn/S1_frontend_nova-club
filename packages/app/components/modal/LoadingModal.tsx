import { ModalStackParams } from 'app/provider/modal'
import { ActivityIndicator } from 'dripsy'
import { ModalComponentProp } from 'react-native-modalfy'

type AlertModalProps = ModalComponentProp<
  ModalStackParams,
  void,
  'LoadingModal'
>
const LoadingModal = ({ modal: { closeModal, getParam } }: AlertModalProps) => {
  return <ActivityIndicator size={'large'} color="white" />
}

export default LoadingModal
