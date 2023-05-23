import { Text, useDripsyTheme } from 'dripsy'
import React, { useEffect } from 'react'
import { Button } from 'react-native'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const AlertModal = ({ modal: { closeModal, getParam } }) => {
  const { theme } = useDripsyTheme()
  const TITLE = 'Important Notice'

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
        title={title}
        actions={[
          { label: 'Close', onPress: closeModal },
          { label: 'Submit', onPress: () => console.log('Submit actions') },
        ]}
      >
        <Text>Modal information here</Text>
      </ModalContent>
      <Button title="Close modal" onPress={() => closeModal()} />
    </ModalWrapper>
  )
}

export default AlertModal
