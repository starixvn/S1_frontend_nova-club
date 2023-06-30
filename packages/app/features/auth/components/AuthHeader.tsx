import IconButton from 'app/components/IconButton'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Image, Text, View } from 'dripsy'

type AuthHeaderProps = {
  headerDesc?: String
  onPress: () => void
}

const AuthHeader = ({ headerDesc, onPress }: AuthHeaderProps) => {
  const { top } = useSafeArea()
  return (
    <>
      <View
        sx={{
          bg: '$primary.500',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: top > 0 ? top : 20,
          px: 20,
        }}
      >
        <IconButton onPress={onPress} name="back" />
        <View sx={{ alignItems: 'center' }}>
          <Image
            source={require('../../../assets/images/common/logo.png')}
            alt="authentication-logo"
            sx={{ height: 40, aspectRatio: 64 / 24 }}
          />
          <Text sx={{ textTransform: 'uppercase', fontWeight: 'bold', pt: 5 }}>
            {headerDesc}
          </Text>
        </View>
        <IconButton sx={{ opacity: 0 }} name="back" />
      </View>
    </>
  )
}

export default AuthHeader
