import { View } from 'dripsy'
import { useRef } from 'react'
import { View as RNView } from 'react-native'
import { SolitoImage } from 'solito/image'

type AuthBannerProps = {
  isAgent?: boolean
}

const BannerImage = {
  AGENT: require('app/assets/images/auth/agent_banner.jpg'),
  PLAYER: require('app/assets/images/auth/banner.png'),
} as const

const AuthBanner = (props: AuthBannerProps) => {
  const { isAgent } = props
  const imageSrc = isAgent ? BannerImage.AGENT : BannerImage.PLAYER

  const rootRef = useRef<RNView>(null)

  return (
    <View ref={rootRef} sx={{ width: '100%', aspectRatio: 1536 / 400 }}>
      <SolitoImage
        src={imageSrc}
        alt="auth-banner"
        fill
        resizeMode="cover"
        //   sx={{ width, height: width / bannerRatio }}
      />
    </View>
  )
}

export default AuthBanner
