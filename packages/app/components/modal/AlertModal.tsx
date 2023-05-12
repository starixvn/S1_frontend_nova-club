import { Text, View, styled, useDripsyTheme } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import React, { useEffect } from 'react'
import ModalWrapper from './ModalWrapper'
import GradientButton from '../GradientButton'
import { Button } from 'react-native'
import Icon from '../icon'
import ModalContent from './ModalContent'

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
