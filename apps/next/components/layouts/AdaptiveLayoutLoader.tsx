import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { View } from 'dripsy'
import { StyleSheet } from 'react-native'
import { SolitoImage } from 'solito/image'

type Props = {}

export default function AdaptiveLayoutLoader({}: Props) {
  return (
    <View
      sx={{
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        bg: '$primary.700',
      }}
    >
      <SolitoImage
        priority
        width={201}
        height={72}
        alt="vui123"
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/logo.png`}
      />
    </View>
  )
}
