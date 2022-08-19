import useLocalization from 'app/provider/localization'
import { Text } from 'dripsy'
import React from 'react'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const AlertDialogModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()

  const message = getParam('message', '')
  const callback = getParam('callback')

  function onDismiss() {
    setTimeout(() => {
      callback && callback()
    }, 500)
    closeModal()
  }

  return (
    <ModalWrapper>
      <ModalContent
        title={t('notes.importantNotice')}
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

export default AlertDialogModal
