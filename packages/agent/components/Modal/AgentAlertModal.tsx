import Text from 'agent/components/Text'
import { ModalStackParams } from 'agent/provider/agentModal'
import { useAgentLocalization } from 'app/provider/localization'
import React, { useEffect } from 'react'
import { ModalComponentProp } from 'react-native-modalfy'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

type AgentAlertModalProps = ModalComponentProp<
  ModalStackParams,
  void,
  'AgentAlertModal'
>
const AgentAlertModal = ({
  modal: { closeModal, getParam },
}: AgentAlertModalProps) => {
  const { t } = useAgentLocalization()

  const title = getParam('title', t('notes.importantNotice'))
  const message = getParam('message', '')
  const actions = getParam('actions')
  const onClose = getParam('onClose')

  useEffect(() => {
    return () => {
      onClose && onClose()
    }
  }, [])

  return (
    <ModalWrapper title={title ?? ''} onClose={closeModal}>
      <ModalContent actions={actions} closeModal={closeModal}>
        <Text sx={{ textAlign: 'center', color: 'black' }}>{message}</Text>
      </ModalContent>
    </ModalWrapper>
  )
}

export default AgentAlertModal
