import React from 'react'
import ModalWrapper from './ModalWrapper'
import ModalContent from './ModalContent'
import { Text } from 'dripsy'
import useLocalization from 'app/provider/localization'
import { useWindowDimensions } from 'react-native'

const ConnectionModal = ({ modal: { getParam } }) => {
  const title = getParam('title')

  const { width } = useWindowDimensions()
  const { t } = useLocalization()
  return (
    <ModalWrapper sx={{ width: Math.min(500, width * 0.9) }}>
      <ModalContent title={title} disableAction={true}>
        <Text sx={{ textAlign: 'center', fontSize: [14, 14, 14, 16] }}>
          {t('common.disconnected')}
        </Text>
      </ModalContent>
    </ModalWrapper>
  )
}

export default ConnectionModal
