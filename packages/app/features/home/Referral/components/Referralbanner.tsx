import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import { View } from 'dripsy'
import { useWindowDimensions } from 'react-native'

const ReferralBanner = () => {
  const { height, width } = useWindowDimensions()
  const xRatio = 1920
  const yRatio = 500
  const scale = Math.max(width / xRatio, height / 10 / yRatio)
  const enlargedWidth = Math.floor(scale * xRatio)
  const enlargedHeight = Math.floor(scale * yRatio)
  return (
    <View>
      <Image
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/banners/refer.jpg`,
        }}
        alt="refer"
        sx={{ width: enlargedWidth, height: enlargedHeight }}
        resizeMode="contain"
      />
    </View>
  )
}

export default ReferralBanner
