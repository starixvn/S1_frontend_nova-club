import { Gradient } from '@dripsy/gradient'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import { ImageBackground } from 'react-native'

interface TitleProps {
  balance
}

const Title = ({ balance }: TitleProps) => {
  const { t } = useLocalization()
  return (
    <View>
      <ImageBackground
        source={require('../../../assets/images/events/dragonBoat/title-bg.png')}
        resizeMode="contain"
        style={{ zIndex: 1, top: 15 }}
      >
        <View sx={{ alignSelf: 'center', paddingX: 30, paddingY: 25 }}>
          <Text sx={{ color: 'black', fontSize: 32, fontWeight: '900' }}>
            {t('event.catEvent.miniGame.matchThree')}
          </Text>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Title
