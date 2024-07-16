import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { View } from 'dripsy'
import { useRef } from 'react'
import { View as RNView } from 'react-native'
import { useAppSelector } from 'app/provider/redux/store'
import { SolitoImage } from 'solito/image'
import useDefaultParamSelector from 'app/hooks/useDefaultParamSelector'

type AuthBannerProps = {
  isAgent?: boolean
}

const AuthBanner = (props: AuthBannerProps) => {
  const { isAgent } = props
  const currency = useAppSelector((s) => s.setting.currency)

  useDefaultParamSelector()

  const BannerImage = {
    AGENT: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/banners/auth/agent-banner-en.jpg`,
    PLAYER: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/banners/auth/member-banner-en.jpg`,
  } as const

  const imageSrc = isAgent ? BannerImage.AGENT : BannerImage.PLAYER

  const rootRef = useRef<RNView>(null)

  return (
    <View ref={rootRef} sx={{ width: '100%', aspectRatio: 760 / 250 }}>
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
