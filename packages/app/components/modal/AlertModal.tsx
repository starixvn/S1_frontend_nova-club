import { Text } from 'dripsy'
import React, { useEffect } from 'react'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const AlertModal = ({ modal: { closeModal, getParam } }) => {
  const title = getParam('title')
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
        footer={true}
        // actions={[
        //   { label: 'Close', onPress: closeModal },
        //   { label: 'Submit', onPress: () => console.log('Submit actions') },
        // ]}
      >
        <Text sx={{ textAlign: 'center' }}>{message}</Text>
      </ModalContent>
      {/* <Button title="Close modal" onPress={() => closeModal()} /> */}
    </ModalWrapper>
  )
}

export default AlertModal
