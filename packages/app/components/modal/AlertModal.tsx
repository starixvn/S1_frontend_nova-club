import useLocalization from 'app/provider/localization'
import { Text } from 'dripsy'
import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const AlertModal = ({ modal: { closeModal, getParam } }) => {
  const title = getParam('title')
  const message = getParam('message', '')
  const actions = getParam('actions')
  const onClose = getParam('onClose')
  const disableAutoTranslation = getParam('disableAutoTranslation', false)

  const { width } = useWindowDimensions()
  const { t } = useLocalization()

  useEffect(() => {
    return () => {
      onClose && onClose()
    }
  }, [])

  return (
    <ModalWrapper sx={{ width: Math.min(500, width * 0.9) }}>
      <ModalContent title={title} actions={actions} close={closeModal}>
        <Text sx={{ textAlign: 'center', fontSize: [14, 14, 14, 16] }}>
          {disableAutoTranslation ? message : t(message)}
        </Text>
      </ModalContent>
    </ModalWrapper>
  )
}

export default AlertModal
