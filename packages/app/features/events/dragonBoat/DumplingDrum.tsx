import Image from 'app/components/common/Image'
import { View } from 'dripsy'
import { useWindowDimensions } from 'react-native'

const DumplingDrum = () => {
  const { width } = useWindowDimensions()
  return (
    <View
      sx={{
        position: 'absolute',
        bottom: '0%',
        right: '-58%',
        width: '100%',
      }}
    >
      <View sx={{}}>
        <Image
          sx={{
            aspectRatio: 3 / 1,
            width: Math.min(200, width * 0.7),
          }}
          resizeMode={'contain'}
          source={require('../../../assets/images/events/dragonBoat/dumpling.png')}
        />
      </View>
      <View
        sx={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top: 45,
          left: 20,
        }}
      >
        <Image
          sx={{
            aspectRatio: 3 / 1,
            width: Math.min(120, width * 0.4),
          }}
          resizeMode={'contain'}
          source={require('../../../assets/images/events/dragonBoat/drum.png')}
        />
      </View>
    </View>
  )
}

export default DumplingDrum
