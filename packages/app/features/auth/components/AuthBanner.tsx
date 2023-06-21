import { Image, View } from 'dripsy'
import { useWindowDimensions } from 'react-native'

type AuthBannerProps = {
  bannerRatio: number
}

const AuthBanner = ({ bannerRatio }: AuthBannerProps) => {
  const { width } = useWindowDimensions()
  return (
    <>
      <View sx={{ width: '100%' }}>
        <Image
          source={require('../../../assets/images/auth/banner.png')}
          alt="auth-banner"
          //   resizeMode="stretch"
          //   sx={{ width, height: width / bannerRatio }}
        />
      </View>
    </>
  )
}

export default AuthBanner
