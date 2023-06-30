import useContainerWidth from 'app/hooks/useContainerWidth'
import { View } from 'dripsy'
import { useRef } from 'react'
import { View as RNView } from 'react-native'
import { SolitoImage } from 'solito/image'

type AuthBannerProps = {
  bannerRatio: number
}

const AuthBanner = () => {
  const rootRef = useRef<RNView>(null)
  // const width = useContainerWidth(rootRef)
  return (
    <View ref={rootRef} sx={{ width: '100%', aspectRatio: 1536 / 400 }}>
      <SolitoImage
        src={require('app/assets/images/auth/banner.png')}
        alt="auth-banner"
        fill
        resizeMode="cover"
        //   sx={{ width, height: width / bannerRatio }}
      />
    </View>
  )
}

export default AuthBanner
