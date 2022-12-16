import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import useContextualRouting from 'app/hooks/useContextualRouting'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useWcTicketCountQuery } from 'services/eventApi'
import { useRouter } from 'solito/router'
import BubbleEdge from './Bubble/BubbleEdge'

const FloatingAffWinner = () => {
  const { push } = useRouter()
  const { width } = useWindowDimensions()

  const { makeContextualHref } = useContextualRouting()
  const to = makeContextualHref('wc-prediction')
  const goto = () => {
    push(to, '/event/wcprediction')
  }

  const iconSize = Math.min(110, width * 0.2)

  return (
    <TouchableOpacity onPress={goto} sx={{ alignItems: 'center' }}>
      <View
        sx={{
          mb: '$3',
          minWidth: 105,
          right: iconSize === 110 ? 0 : 4,
          zIndex: 2,
        }}
      >
        <View
          sx={{
            minHeight: 50,
            borderRadius: 100 / 2,
            px: '$3',
            bg: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>{`Tìm hiểu thêm`}</Text>
          <Text>{`thông tin`}</Text>
        </View>
        <View
          sx={{
            position: 'absolute',
            bottom: -20,
            right: 20,
          }}
        >
          <BubbleEdge size={20} />
        </View>
      </View>
      <Image
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/aff-cup/aff-cup-lucky-draw.gif`,
        }}
        style={{
          width: iconSize,
          height: iconSize,
          marginBottom: 10,
          zIndex: 1,
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  )
}

export default FloatingAffWinner
