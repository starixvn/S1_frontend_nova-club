import { Pressable, Row, SxProp, View } from 'dripsy'
import React, { ComponentProps } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { Platform, ViewProps } from 'react-native'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import VideoBanner from './VideoBanner'
import { useRouter } from 'solito/router'

const subs = [
  {
    label: 'Live Casino',
    video: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/livecasino.mp4`,
    onPress: '/games/livecasino',
  },
  {
    label: 'Fishing',
    video: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/fishing.mp4`,
    onPress: '/games/fishing',
  },
  {
    label: 'Keno / Lottery',
    video: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/keno.mp4`,
    onPress: '/games/keno-lottery',
  },
]

type MiddleBannerProps = ComponentProps<typeof View>

const MiddleBanner = (props: MiddleBannerProps) => {
  const { push } = useRouter()
  return (
    <View {...props}>
      <VideoBanner
        sx={{ aspectRatio: 880 / 420, bg: '$secondary.500' }}
        uri={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/sportsbook.mp4`}
        label={'Sportsbook'}
      />
      <Row sx={{ flex: 1, gap: '$3', minHeight: 300 }}>
        {subs.map((s) => {
          return (
            <Pressable
              key={s.label}
              sx={{ flex: 1, position: 'relative' }}
              onPress={() => push(s.onPress)}
            >
              <VideoBanner
                stretchedLabel
                sx={{ flex: 1, position: 'relative' }}
                uri={s.video}
                label={s.label}
              />
            </Pressable>
          )
        })}
      </Row>
    </View>
  )
}
export default MiddleBanner
