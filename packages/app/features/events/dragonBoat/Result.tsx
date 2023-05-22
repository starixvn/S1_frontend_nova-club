import Image from 'app/components/common/Image'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { Text, View, useDripsyTheme } from 'dripsy'
import { ImageBackground, useWindowDimensions } from 'react-native'
import DumplingDrum from './DumplingDrum'

interface ResultProps {
  result: number
  onPress: () => void
}

const Result = ({ result, onPress }: ResultProps) => {
  const { width } = useWindowDimensions()
  const { theme } = useDripsyTheme()
  const { t } = useLocalization()
  return (
    <View sx={{ paddingBottom: '10%' }}>
      <View
        sx={{
          maxHeight: 370,
          padding: 20,
          borderRadius: 33,
          backgroundColor: 'rgba(0,0,0,0.7)',
          marginTop: 15,
        }}
      >
        <View
          sx={{
            height: 160,
            marginTop: 60,
            marginBottom: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              fontFamily: 'AvertaStd-ExtraBold',
            }}
          >
            {result && result > 0
              ? t('event.catEvent.miniGame.won')
              : t('event.catEvent.miniGame.lose')}
          </Text>
          <Text
            sx={{
              marginTop: 20,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              fontFamily: 'AvertaStd-ExtraBold',
            }}
          >
            {result && result > 0
              ? t('event.catEvent.miniGame.won2')
              : t('event.catEvent.miniGame.lose2')}
          </Text>
          {result && result > 0 ? (
            <Text
              sx={{
                marginTop: 30,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 30,
                color: '#FAFA7F',
                fontFamily: 'AvertaStd-ExtraBold',
              }}
            >
              {`${result / 1000}K VND`}
            </Text>
          ) : null}
          <TouchableOpacity
            sx={{
              marginTop: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onPress}
          >
            <Image
              sx={{
                height: 50,
                width: 150,
              }}
              resizeMode={'contain'}
              source={require('../../../assets/images/events/dragonBoat/title-bg.png')}
            />
            <Text
              sx={{
                color: 'black',
                fontWeight: 'bold',
                position: 'absolute',
                fontFamily: 'AvertaStd-ExtraBold',
              }}
            >
              {t('event.catEvent.miniGame.next')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <DumplingDrum />
    </View>
  )
}

export default Result
