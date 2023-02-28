import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import useContextualRouting from 'app/hooks/useContextualRouting'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { Text } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useCheckTicketSpinQuery } from 'services/eventApi'
import { useRouter } from 'solito/router'

const FloatingCny = () => {
  const { push } = useRouter()
  const { width } = useWindowDimensions()
  const { balance } = useCheckTicketSpinQuery(undefined, {
    selectFromResult: (s) => ({ ...s, balance: s.data?.data }),
  })

  const { makeContextualHref } = useContextualRouting()
  const to = makeContextualHref('/event/cny')

  const handlePress = () => {
    push(to, '/event/cny')
  }

  const iconSize = Math.min(100, width * 0.2)

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/cny/lucky-cat.gif`,
        }}
        style={{
          width: iconSize,
          height: iconSize,
          marginBottom: 10,
        }}
        resizeMode="contain"
      />
      {balance && (
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
          {balance.totalBalance}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default FloatingCny
