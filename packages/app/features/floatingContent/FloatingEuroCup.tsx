import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { View } from 'dripsy'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'

const FloatingEuroCup = () => {
  const { push } = useRouter()

  const handleOpen = () => {
    push('/euro-cup/prediction')
  }

  return (
    <TouchableWithoutFeedback onPress={handleOpen} nativeID="pressable">
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/floating-icon-shadow.png`}
        height={175}
        width={110}
        contentPosition="bottom center"
        alt=""
        style={{ position: 'absolute', bottom: 0 }}
        draggable={false}
      />
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/floating-icon.gif`}
        height={175}
        width={110}
        contentPosition="bottom center"
        alt=""
        draggable={false}
      />
    </TouchableWithoutFeedback>
  )
}

export default FloatingEuroCup
