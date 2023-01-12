import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import useContextualRouting from 'app/hooks/useContextualRouting'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import { Text } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { Game } from 'services/contentApi.type'
import { useRouter } from 'solito/router'

const FloatingCny = () => {
  const { push } = useRouter()
  const { width } = useWindowDimensions()

  const { makeContextualHref } = useContextualRouting()
  const to = makeContextualHref('/event/cny')

  const handlePress = () => {
    push(to, '/event/cny')
  }

  const iconSize = Math.min(110, width * 0.25)

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={require(`app/assets/images/events/cny/lucky-cat.gif`)}
        style={{
          width: iconSize,
          height: iconSize,
          marginBottom: 10,
        }}
        resizeMode="contain"
      />
      <Text
        sx={{
          position: 'absolute',
          bottom: 32,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'red',
        }}
      >
        12
      </Text>
    </TouchableOpacity>
  )
}

export default FloatingCny
