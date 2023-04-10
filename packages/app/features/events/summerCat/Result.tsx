import Image from 'app/components/common/Image'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { Text, View, useDripsyTheme } from 'dripsy'
import { useWindowDimensions } from 'react-native'

interface ResultProps {
  result: number
  onPress: () => void
}

const Result = ({ result, onPress }: ResultProps) => {
  const { width } = useWindowDimensions()
  const { theme } = useDripsyTheme()
  const { t } = useLocalization()
  return (
    <View>
      <View
        sx={{
          height: 350,
          minWidth: 400,
          bg: 'rgba(0,0,0,0.3);',
          padding: 10,
          borderRadius: 15,
          borderWidth: 6,
          borderColor: '#888888',
          // backdropFilter: 'blur',
        }}
      >
        <View>
          <View
            sx={{
              height: 160,
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
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
                }}
              >
                {`${result / 1000}K VND`}
              </Text>
            ) : null}
          </View>
          <TouchableOpacity
            sx={{
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onPress}
          >
            <Image
              sx={{
                height: 50,
                width: 100,
              }}
              resizeMode={'contain'}
              source={require('../../../assets/images/events/summerCat/button.png')}
            />
            <Text
              sx={{
                color: 'black',
                fontWeight: 'bold',
                position: 'absolute',
              }}
            >
              {t('event.catEvent.miniGame.next')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        sx={{
          position: 'absolute',
          minWidth: 400,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top: -40,
        }}
      >
        <Image
          sx={{
            height: 100,
            width: 300,
          }}
          resizeMode={'contain'}
          source={require('../../../assets/images/events/summerCat/lights.png')}
        />
      </View>
    </View>
  )
}

export default Result
