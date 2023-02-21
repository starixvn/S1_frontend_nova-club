import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import useContextualRouting from 'app/hooks/useContextualRouting'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { Text } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useCheckCnySpinQuery } from 'services/eventApi'
import { useRouter } from 'solito/router'

const FloatingValentine = () => {
  const { push } = useRouter()
  const { width } = useWindowDimensions()
  const { balance } = useCheckCnySpinQuery(undefined, {
    selectFromResult: (s) => ({ ...s, balance: s.data?.data }),
  })
  console.log(
    '🚀 ~ file: FloatingValentine.tsx:17 ~ FloatingValentine ~ balance',
    balance
  )

  const { makeContextualHref } = useContextualRouting()
  const to = makeContextualHref('/event/valentine')

  const handlePress = () => {
    push(to, '/event/valentine')
  }

  const iconSize = Math.min(120, width * 0.25)

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/valentine/floating-valentine.gif`,
        }}
        style={{
          width: iconSize,
          height: iconSize,
          marginBottom: 10,
        }}
        resizeMode="contain"
      />
      {
        <Text
          sx={{
            position: 'absolute',
            bottom: [24, 30, 30],
            left: 0,
            right: 0,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'red',
            zIndex: 99,
          }}
        >
          {balance ? balance.totalBalance : 0}
        </Text>
      }
    </TouchableOpacity>
  )
}

export default FloatingValentine
