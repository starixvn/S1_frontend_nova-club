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
        resizeMode="stretch"
        style={{
          width: 400,
        }}
        imageStyle={{ borderRadius: 35 }}
      >
        <ImageBackground
          source={require('../../../assets/images/events/summerCat/frame.png')}
          style={{}}
        >
          <View
            sx={{
              height: 400,
              padding: 20,
              borderRadius: 33,
              // backdropFilter: 'blur',
            }}
          >
            <View>
              <View
                sx={{
                  height: 160,
                  marginTop: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 30,
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
                    fontSize: 30,
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
        </ImageBackground>
      </ImageBackground>
    </View>
  )
}

export default Result
