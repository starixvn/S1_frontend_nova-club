import { Text } from 'dripsy'
import React, { useEffect } from 'react'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'
import { useWindowDimensions } from 'react-native'
import Button from '../common/Button'
import useLocalization from 'app/provider/localization'

const AlertModal = ({ modal: { closeModal, getParam } }) => {
  const title = getParam('title')
  const message = getParam('message', '')
  const actions = getParam('actions')
  const onClose = getParam('onClose')
  const { t } = useLocalization()

  const { width } = useWindowDimensions()
  console.log('title', title)
  useEffect(() => {
    return () => {
      onClose && onClose()
    }
  }, [])

  return (
    <ModalWrapper sx={{ width: Math.min(500, width * 0.9) }}>
      <ModalContent
        title={title}
        disableAction
        // actions={
        //   actions
        // [
        //   { label: 'Close', onPress: closeModal },
        //   { label: 'Submit', onPress: () => console.log('Submit actions') },
        // ]
        // }
      >
        <Text sx={{ textAlign: 'center', fontSize: [14, 14, 14, 16] }}>
          {message}
        </Text>
      </ModalContent>
      <Button onPress={() => closeModal()}>{t('common.close')}</Button>
    </ModalWrapper>
  )
}

export default AlertModal
