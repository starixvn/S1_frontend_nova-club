import useLocalization from 'app/provider/localization'
import { ModalStackParams } from 'app/provider/modal'
import { Text } from 'dripsy'
import React, { useEffect } from 'react'
import { ModalComponentProp } from 'react-native-modalfy'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

type AlertModalProps = ModalComponentProp<ModalStackParams, void, 'AlertModal'>
const AlertModal = ({ modal: { closeModal, getParam } }: AlertModalProps) => {
  const { t } = useLocalization()

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
    <ModalWrapper>
      <ModalContent
        title={title}
        closeModal={closeModal}
        hideCloseButton
        actions={actions}
      >
        <Text>{message}</Text>
      </ModalContent>
    </ModalWrapper>
  )
}

export default AlertModal
