import Image from 'app/components/common/Image'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'
import { Platform, useWindowDimensions } from 'react-native'

const Background = () => {
  const { top } = useSafeArea()
  const { height, width } = useWindowDimensions()
  return (
    <View sx={{ bg: '#81C0FF', height, width, position: 'absolute' }}>
      <Image
        sx={{
          height: 200,
          width: 200,
          top: Platform.OS !== 'web' ? top : 50,
        }}
        source={require('../../../assets/images/events/dragonBoat/sun.png')}
      />

      <Image
        sx={{
          maxWidth: 240,
          height: '20%',
          width: '70%',
          aspectRatio: 328 / 231,
          position: 'absolute',
          top: '50%',
          left: '-10%',
        }}
        source={require('../../../assets/images/events/dragonBoat/cloud1.png')}
        resizeMode={'contain'}
      />

      <Image
        sx={{
          maxWidth: 280,
          height: '20%',
          width: '70%',
          aspectRatio: 340 / 215,
          position: 'absolute',
          top: '30%',
          right: '-5%',
        }}
        source={require('../../../assets/images/events/dragonBoat/cloud2.png')}
        resizeMode={'contain'}
      />

      <Image
        sx={{ height: '25%', width: '100%', position: 'absolute', bottom: 0 }}
        source={require('../../../assets/images/events/dragonBoat/mountain.png')}
        resizeMode={'stretch'}
      />
    </View>
  )
}

export default Background
