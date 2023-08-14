import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import Image from '../common/Image'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'
import { View } from 'dripsy'

const DepositQrModal = ({ modal: { closeModal, getParam } }) => {
  const qrCode = getParam('qrCode')

  const { width } = useWindowDimensions()

  return (
    <ModalWrapper sx={{ width: Math.min(500, width * 0.9) }}>
      <ModalContent close={closeModal}>
        <View sx={{ alignItems: 'center', justifyContent: 'center', pb: '$3' }}>
          <Image
            alt={qrCode}
            source={{
              uri: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${qrCode}`,
            }}
            sx={{ width: 200, height: 200 }}
          />
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}

export default DepositQrModal
