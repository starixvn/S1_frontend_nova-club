import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import { ImageBackground } from 'react-native'

interface TitleProps {
  balance
}

const Title = ({ balance }: TitleProps) => {
  const { t } = useLocalization()
  return (
    <View sx={{ opacity: 1, height: 100 }}>
      <ImageBackground
        source={require('../../../assets/images/events/dragonBoat/title-bg.png')}
        resizeMode="contain"
        style={{ zIndex: 1, top: 15 }}
      >
        <View sx={{ alignSelf: 'center', paddingY: 30 }}>
          <Text
            sx={{
              color: 'black',
              lineHeight: 40,
              fontSize: 30,
              fontWeight: '900',
              fontFamily: 'AvertaStd-ExtraBold',
            }}
          >
            {t('event.catEvent.miniGame.matchThree')}
          </Text>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Title
