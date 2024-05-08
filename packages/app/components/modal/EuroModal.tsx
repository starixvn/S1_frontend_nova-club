import useLocalization from 'app/provider/localization'
import { Pressable, Text, View } from 'dripsy'
import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'
import { SolitoImage } from 'solito/image'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import BouncePressable from '../pressable/BouncePressable'

const EuroModal = ({ modal: { closeModal, getParam } }) => {
  const message = getParam('message', '')

  const { width } = useWindowDimensions()
  const { t } = useLocalization()

  const modalWidth = Math.min(500, width * 0.9)
  const handleClose = () => closeModal()

  return (
    <ModalWrapper sx={{ width: modalWidth }}>
      <View sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <BouncePressable
          containerStyle={{ position: 'absolute', top: 95, right: -15 }}
          onPress={handleClose}
        >
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/close.png`}
            width={60}
            height={60}
            alt=""
          />
        </BouncePressable>
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/board-small.png`}
          width={modalWidth}
          height={modalWidth}
          alt=""
        />
        <Text
          sx={{
            position: 'absolute',
            width: '75%',
            mt: [90, 100],
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          {message}
        </Text>
      </View>
    </ModalWrapper>
  )
}

export default EuroModal
