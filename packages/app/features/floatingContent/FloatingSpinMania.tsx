import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import useContextualRouting from 'app/hooks/useContextualRouting'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { Text } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useCheckTicketSpinQuery } from 'services/eventApi'
import { useRouter } from 'solito/router'

const FloatingValentine = () => {
  const { push } = useRouter()
  const { width } = useWindowDimensions()
  const { balance } = useCheckTicketSpinQuery(undefined, {
    selectFromResult: (s) => ({ ...s, balance: s.data?.data }),
  })

  const { makeContextualHref } = useContextualRouting()
  const to = makeContextualHref('/event/spin-mania')

  const handlePress = () => {
    push(to, '/event/spin-mania')
  }

  const iconSize = Math.min(90, width * 0.18)

  return (
    <TouchableOpacity
      onPress={handlePress}
      sx={{ justifyContent: 'center', mb: 10 }}
    >
      <Image
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/spinMania/floating.gif`,
        }}
        style={{
          width: iconSize,
          height: iconSize,
        }}
        resizeMode="contain"
      />
      {
        <Text
          sx={{
            fontSize: 14,
            lineHeight: 16,
            position: 'absolute',
            top: '58%',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'white',
            zIndex: 99,
          }}
        >
          {balance ? balance.totalBalance : ''}
        </Text>
      }
    </TouchableOpacity>
  )
}

export default FloatingValentine
