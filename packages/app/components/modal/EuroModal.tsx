import useLocalization from 'app/provider/localization'
import { Pressable, Text, View, useResponsiveValue } from 'dripsy'
import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'
import { SolitoImage } from 'solito/image'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import BouncePressable from '../pressable/BouncePressable'

const EuroModal = ({ modal: { closeModal, getParam } }) => {
  const message = getParam('message', '')
  const top = useResponsiveValue(['25%', 130])

  const { width } = useWindowDimensions()
  const { t } = useLocalization()

  const modalWidth = Math.min(500, width * 0.9)
  const handleClose = () => closeModal()

  return (
    <ModalWrapper sx={{ width: modalWidth }}>
      <>
        <View sx={{ alignItems: 'center', justifyContent: 'center' }}>
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
              pt: [90, 100],
              lineHeight: 32,
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            {message}
          </Text>
        </View>

        <BouncePressable
          containerStyle={{ position: 'absolute', top: top, right: -15 }}
          onPress={handleClose}
        >
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/close.png`}
            width={60}
            height={60}
            alt=""
          />
        </BouncePressable>
      </>
    </ModalWrapper>
  )
}

export default EuroModal
