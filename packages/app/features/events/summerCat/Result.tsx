import Image from 'app/components/common/Image'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { Text, View, useDripsyTheme } from 'dripsy'
import { ImageBackground, useWindowDimensions } from 'react-native'

interface ResultProps {
  result: number
  onPress: () => void
}

const Result = ({ result, onPress }: ResultProps) => {
  const { width } = useWindowDimensions()
  const { theme } = useDripsyTheme()
  const { t } = useLocalization()
  return (
    <View sx={{ marginTop: 70 }}>
      <ImageBackground
        source={require('../../../assets/images/events/summerCat/filter-blue.png')}
        style={{}}
        imageStyle={{ borderRadius: 45 }}
      >
        <ImageBackground
          source={require('../../../assets/images/events/summerCat/frame.png')}
          style={{}}
          resizeMode={'stretch'}
        >
          <View
            sx={{
              maxHeight: 370,
              padding: 20,
              borderRadius: 33,
              // backdropFilter: 'blur',
            }}
          >
            <View>
              <View
                sx={{
                  height: 160,
                  marginTop: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 28,
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
                    fontSize: 28,
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              top: -40,
              left: 0,
              right: 0,
            }}
          >
            <Image
              sx={{
                aspectRatio: 3 / 1,
                width: Math.min(300, width * 0.7),
              }}
              resizeMode={'contain'}
              source={require('../../../assets/images/events/summerCat/lights.png')}
            />
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  )
}

export default Result
