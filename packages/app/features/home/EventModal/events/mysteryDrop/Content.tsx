import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Image, Text, View, styled } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'
import { RewardGameKeyMap } from 'utils/rewards'
import { useHomeEventModal } from '../../HomeEventModal'
import { ImageBackground } from 'react-native'

type Props = {}

export default function MysteryDropContent({}: Props) {
  const { t } = useLocalization()
  const { push } = useRouter()
  const isDesktop = useIsDesktop()
  const { openModal, closeModal } = useModal()
  const { width, height } = useHomeEventModal().dimension

  const lang = useAppSelector((state) => state.setting.locale)

  const handlePress = () => {
    closeModal()

    setTimeout(() => {
      if (isDesktop) {
        openModal('RewardGameModal', {
          persistent: true,
          key: RewardGameKeyMap.MYSTERY_DROP,
        })
      } else
        push({
          pathname: '/rewards/launcher',
          query: {
            key: RewardGameKeyMap.MYSTERY_DROP,
          },
        })
    }, 500)
  }

  const containerWidth = Math.min(350, width)

  return (
    <View
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/board-congrats-${lang}.png`,
        }}
        sx={{ width: containerWidth, aspectRatio: 706 / 552, zIndex: 2 }}
        alt=""
      />
      <View>
        <Image
          source={{
            uri: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/board-body.png`,
          }}
          sx={{
            width: containerWidth,
            aspectRatio: 1000 / 717,
            mt: -70,
          }}
          alt=""
        />
        <StyledTextContainer>
          <Text sx={{ textAlign: 'center', fontSize: 18, lineHeight: 28 }}>
            {t('event.mystery.winContent')}
          </Text>
        </StyledTextContainer>

        <StyledButtonContainer>
          <TouchableOpacity onPress={handlePress}>
            <ImageBackground
              source={{
                uri: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/board-button.png`,
              }}
              style={{
                width: containerWidth / 3,
                aspectRatio: 536 / 166,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              alt=""
            >
              <Text
                sx={{
                  position: 'absolute',
                  color: '#5C3800',
                  fontWeight: 'bold',
                }}
              >
                {t('common.open')}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </StyledButtonContainer>
      </View>
    </View>
  )
}

const StyledTextContainer = styled(View)({
  position: 'absolute',
  top: [10, 30],
  left: 0,
  right: 0,
  alignItems: 'center',
  px: '$3',
})

const StyledButtonContainer = styled(View)({
  position: 'absolute',
  bottom: 30,
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center',
})
