import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import { Text, View, useDripsyTheme } from 'dripsy'
import { ImageBackground, useWindowDimensions } from 'react-native'

interface CoinBoxProps {
  title: string
  children: React.ReactNode
}

const CoinBox = ({ title, children }: CoinBoxProps) => {
  const { width } = useWindowDimensions()
  const { theme } = useDripsyTheme()
  return (
    <>
      <View sx={{ alignSelf: 'center', marginBottom: 20 }}>
        <Text sx={{ fontSize: 36, fontWeight: '900' }}>{title}</Text>
      </View>

      <ImageBackground
        source={require('../../../assets/images/events/summerCat/filter-blue.png')}
        style={{}}
        imageStyle={{ borderRadius: 30 }}
      >
        <View
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          {children}
        </View>
      </ImageBackground>
    </>
  )
}
export default CoinBox
