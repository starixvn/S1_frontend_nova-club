import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { LoginType } from 'app/features/auth/AuthLayout'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { ActivityIndicator, ScrollView, Text, View, styled } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'
import Image from '../common/Image'
import TouchableOpacity from '../pressable/TouchableOpacity'
import { SettingActions } from 'app/store/setting.slice'
import { SolitoImage } from 'solito/image'
import IconButton from '../IconButton'
import useWindowResize from 'app/hooks/useWindowResize'
import useLocalization from 'app/provider/localization'
dayjs.extend(isBetween)

const MysteryModal = ({ modal: { closeModal } }) => {
  const { width, height } = useWindowResize()
  const { t } = useLocalization()
  const { push } = useRouter()

  const handlePress = () => {
    closeModal()
    push('/rewards/mystery-drop-tnc')
  }

  const containerWidth = Math.min(380, width)
  const containerHeight = containerWidth / (800 / 1100)

  return (
    <View
      sx={{
        height: Math.min(height * 0.9, containerHeight),
      }}
    >
      <View sx={{ alignItems: 'flex-end', pr: '$4' }}>
        <IconButton name="cross" onPress={() => closeModal()} />
      </View>
      <TouchableOpacity
        onPress={handlePress}
        sx={{
          width: containerWidth,
          height: containerHeight,
          alignItems: 'center',
        }}
      >
        <View
          sx={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Image
            source={{
              uri: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/board-header.png`,
            }}
            sx={{ width: '100%', aspectRatio: 706 / 552, zIndex: 2 }}
            alt=""
          />
          <View>
            <Image
              source={{
                uri: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/board-body.png`,
              }}
              sx={{ width: width * 0.7, aspectRatio: 1000 / 717, mt: -70 }}
              alt=""
            />
            <StyledTextContainer>
              <Text sx={{ textAlign: 'center' }}>
                {t('event.mystery.winContent')}
              </Text>
            </StyledTextContainer>

            <StyledButtonContainer>
              <Image
                source={{
                  uri: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/board-button.png`,
                }}
                sx={{ width: width * 0.3, aspectRatio: 536 / 166 }}
                alt=""
              />
              <Text
                sx={{
                  position: 'absolute',
                  color: '#5C3800',
                  fontWeight: 'bold',
                }}
              >
                {t('common.open')}
              </Text>
            </StyledButtonContainer>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const StyledTextContainer = styled(View)({
  position: 'absolute',
  top: 10,
  left: 0,
  right: 0,
  alignItems: 'center',
  px: '$3',
})

const StyledButtonContainer = styled(View)({
  position: 'absolute',
  bottom: 20,
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center',
})

export default MysteryModal
