import { Row, View } from 'dripsy'
import React from 'react'
import { Video, ResizeMode } from 'expo-av'
import { Platform } from 'react-native'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import VideoBanner from './VideoBanner'

const subs = [
  {
    label: 'Live Casino',
    video: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/livecasino.mp4`,
  },
  {
    label: 'Fishing',
    video: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/fishing.mp4`,
  },
  {
    label: 'Keno / Lottery',
    video: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/keno.mp4`,
  },
]

export default function MiddleBanner(props) {
  return (
    <View {...props}>
      <VideoBanner
        sx={{ aspectRatio: 880 / 420, bg: '$secondary.500' }}
        uri={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/sportsbook.mp4`}
        label={'Sportsbook'}
      />
      <Row sx={{ flex: 1, gap: '$3' }}>
        {subs.map((s) => {
          return (
            <VideoBanner
              stretchedLabel
              sx={{ flex: 1, position: 'relative' }}
              key={s.label}
              uri={s.video}
              label={s.label}
            />
          )
        })}
      </Row>
    </View>
  )
}
