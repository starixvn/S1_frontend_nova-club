import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useWindowResize from 'app/hooks/useWindowResize'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { Text, View, styled, useResponsiveValue } from 'dripsy'
import React, { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'
import { RewardGameKeyMap } from 'utils/rewards'
import IconButton from '../IconButton'
import Image from '../common/Image'
import TouchableOpacity from '../pressable/TouchableOpacity'
dayjs.extend(isBetween)

const MysteryModal = ({ modal: { closeModal } }) => {
  const { width, height } = useWindowResize()
  const { t } = useLocalization()
  const { push } = useRouter()
  const isDesktop = useIsDesktop()
  const { openModal } = useModal()
  const lang = useAppSelector((state) => state.setting.locale)

  const handlePress = () => {
    closeModal()

    if (isDesktop) {
      setTimeout(() => {
        openModal('RewardGameModal', {
          persistent: true,
          key: RewardGameKeyMap.MYSTERY_DROP,
        })
      }, 500)
    } else {
      push({
        pathname: '/rewards/launcher',
        query: {
          key: RewardGameKeyMap.MYSTERY_DROP,
        },
      })
    }
  }

  const containerWidth = useResponsiveValue([380])
  const containerHeight = containerWidth / (800 / 1100)

  useEffect(() => {
    return () => {
      closeModal('EventPopupModal')
    }
  }, [])

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
              uri: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/board-congrats-${lang}.png`,
            }}
            sx={{ width: '100%', aspectRatio: 706 / 552, zIndex: 2 }}
            alt=""
          />
          <View>
            <Image
              source={{
                uri: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/board-body.png`,
              }}
              sx={{
                width: containerWidth * 0.9,
                aspectRatio: 1000 / 717,
                mt: -70,
              }}
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
                sx={{ width: containerWidth / 2, aspectRatio: 536 / 166 }}
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
