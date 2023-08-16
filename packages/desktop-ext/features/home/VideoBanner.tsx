import { SxProp, Text, View } from 'dripsy'
import React from 'react'
import { Video, ResizeMode } from 'expo-av'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'

type Props = {
  sx?: SxProp
  label: string
  uri: string
  stretchedLabel?: boolean
}

export default function VideoBanner({ sx, label, uri, stretchedLabel }: Props) {
  return (
    <View sx={{ position: 'relative', ...sx }}>
      <View
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 1,
          backgroundColor: 'rgba(50, 50, 90, 0.7)',
          py: '$2',
          px: '$3',
          ...(stretchedLabel
            ? {
                right: 0,
                alignItems: 'center',
              }
            : {
                borderBottomRightRadius: 20,
              }),
        }}
      >
        <Text sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {label?.toUpperCase()}
        </Text>
      </View>
      <Video
        isMuted
        isLooping
        shouldPlay
        style={{ width: '100%', height: '100%' }}
        videoStyle={{
          width: '100%',
          height: '100%',
        }}
        resizeMode={ResizeMode.COVER}
        source={{
          uri,
        }}
        useNativeControls={false}
      />
    </View>
  )
}
