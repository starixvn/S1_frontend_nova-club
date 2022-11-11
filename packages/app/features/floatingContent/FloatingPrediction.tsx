import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import useContextualRouting from 'app/hooks/useContextualRouting'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useRouter } from 'solito/router'

const FloatingPrediction = () => {
  const { width } = useWindowDimensions()

  const { push } = useRouter()
  const { makeContextualHref } = useContextualRouting()
  const to = makeContextualHref('wc-prediction')

  const iconSize = Math.min(110, width * 0.2)

  const launchPrediction = () => {
    push(to, '/event/wcprediction')
  }

  return (
    <TouchableOpacity onPress={launchPrediction}>
      <Image
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/wc/predict-floating.gif`,
        }}
        style={{
          width: iconSize,
          height: iconSize,
          marginBottom: 10,
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  )
}

export default FloatingPrediction
