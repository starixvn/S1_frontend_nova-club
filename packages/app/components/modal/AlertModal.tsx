import useLocalization from 'app/provider/localization'
import { Text } from 'dripsy'
import React from 'react'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const AlertModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()

  const title = getParam('title', t('notes.importantNotice'))
  const message = getParam('message', '')
  const onClose = getParam('onClose')

  function onDismiss() {
    closeModal()
    setTimeout(() => {
      onClose && onClose()
    }, 500)
  }

  return (
    <ModalWrapper>
      <ModalContent
        title={title}
        closeModal={closeModal}
        hideCloseButton
        actions={[
          {
            label: t('common.close'),
            onPress: onDismiss,
          },
        ]}
      >
        <Text>{message}</Text>
      </ModalContent>
    </ModalWrapper>
  )
}

export default AlertModal
