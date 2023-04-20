import Image from 'app/components/common/Image'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { ActivityIndicator, Text, View } from 'dripsy'
import { Platform } from 'react-native'

const COIN_IMG = require('../../../assets/images/events/summerCat/coin.png')

interface StartNowProps {
  disable: boolean
  isSubmitting: boolean
  onPress: () => void
}

const StartNow = ({ disable, isSubmitting, onPress }: StartNowProps) => {
  function renderCoinLoop() {
    const coinElement: React.ReactNode[] = []
    for (let i = 0; i < 3; i++) {
      coinElement.push(
        <View
          key={i}
          style={{
            justifyContent: 'center',
            height: 100,
            width: 100,
            borderRadius: 25,
            margin: 10,
          }}
        >
          <Image
            style={{
              height: 100,
              width: 100,
            }}
            source={COIN_IMG}
          />
          {/* <Text sx={{ textAlign: 'center' }}>Closed</Text> */}
        </View>
      )
    }

    return coinElement
  }

  function renderCoinLoopContainer() {
    const coinLoopContainers: React.ReactNode[] = []

    for (let i = 0; i < 3; i++) {
      coinLoopContainers.push(
        <View key={i} sx={{ flexDirection: 'row' }}>
          {renderCoinLoop()}
        </View>
      )
    }

    return coinLoopContainers
  }

  return (
    <>
      {renderCoinLoopContainer()}
      <View
        sx={{
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.3);',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <TouchableOpacity
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          disabled={disable ?? true}
          onPress={onPress}
        >
          {isSubmitting ? (
            <>
              <ActivityIndicator color={'white'} size="large" />
            </>
          ) : (
            <>
              <Image
                sx={{
                  height: 65,
                  width: 200,
                }}
                resizeMode={'contain'}
                source={require('../../../assets/images/events/summerCat/startBtn.png')}
              />
              <Text
                sx={{
                  position: 'absolute',
                  fontWeight: 'bold',
                  fontSize: 30,
                  textShadow:
                    Platform.OS === 'web'
                      ? '0 1px 0 rgba(0,0,0,.3)'
                      : undefined,
                }}
              >
                START
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </>
  )
}

export default StartNow
