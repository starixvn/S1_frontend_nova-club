import { ModalStackParams } from 'agent/provider/agentModal'
import { ActivityIndicator } from 'dripsy'
import { ModalComponentProp } from 'react-native-modalfy'

type AlertModalProps = ModalComponentProp<
  ModalStackParams,
  void,
  'AgentLoadingModal'
>
const AgentLoadingModal = ({
  modal: { closeModal, getParam },
}: AlertModalProps) => {
  return <ActivityIndicator size={'large'} color="white" />
}

export default AgentLoadingModal
