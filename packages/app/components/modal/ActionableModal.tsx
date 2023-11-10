import { Text } from 'dripsy'
import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const ActionableModal = ({ modal: { closeModal, getParam } }) => {
  const title = getParam('title')
  const message = getParam('message', '')
  const actions = getParam('actions')
  const onClose = getParam('onClose')
  const isShowHeader = getParam('isShowHeader')

  const { width } = useWindowDimensions()

  useEffect(() => {
    return () => {
      onClose && onClose()
    }
  }, [])

  return (
    <ModalWrapper sx={{ width: Math.min(500, width * 0.9) }}>
      <ModalContent
        title={title}
        isShowHeader={isShowHeader}
        actions={actions}
        close={closeModal}
        bodyStyle={{
          width: '80%',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      >
        <Text sx={{ textAlign: 'center', fontSize: [14, 14, 14, 16] }}>
          {message}
        </Text>
      </ModalContent>
    </ModalWrapper>
  )
}

export default ActionableModal
