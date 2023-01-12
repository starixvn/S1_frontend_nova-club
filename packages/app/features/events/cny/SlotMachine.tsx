import Image from 'app/components/common/Image'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ScrollView, Text, View } from 'dripsy'
import { useState } from 'react'
import {
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { useModal } from 'react-native-modalfy'
import Animated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Cloud from './Cloud'
import Lantern from './Latern'

import SlotMachineRoll, { RollResult } from './SlotMachineRoll'

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const testResuls = [
  {
    code: '2',
    note: 'Congratulation! VND 0 has been added to your wallet. ',
    amount: '38000',
    formatted_amount: '0',
    err: 'ok',
  },
  {
    code: '2',
    note: 'Congratulation! VND 0 has been added to your wallet. ',
    amount: '38000',
    formatted_amount: '0',
    err: 'ok',
  },
  {
    code: '1',
    note: 'Congratulation! VND 0 has been added to your wallet. ',
    amount: '18000',
    formatted_amount: '0',
    err: 'ok',
  },
]

const SlotMachine = () => {
  const { top, bottom } = useSafeArea()
  const { openModal } = useModal()
  const progressAmount = useSharedValue(0)
  const [results, setResults] = useState<RollResult[]>()

  function onResultComplete() {
    openModal('CnyWinModal', {
      amount: results.reduce((t, c) => t + Number(c.amount), 0),
    })
  }

  function onRoundComplete(completedIndex, next) {
    progressAmount.value = withTiming(
      progressAmount.value + Number(results[completedIndex]?.amount),
      {
        duration: 500,
      },
      (completed) => {
        if (completed) {
          runOnJS(next)()
        }
      }
    )
  }

  const animatedProps = useAnimatedProps(
    () =>
      ({
        text: Math.round(progressAmount.value / 1000) + 'K',
      } as any)
  )

  return (
    <View sx={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/images/events/cny/bg.png')}
        style={{ flex: 1 }}
      >
        <Lantern />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingTop: top,
            paddingBottom: bottom,
          }}
        >
          <View
            sx={{
              marginTop: '25%',
            }}
          >
            <Image
              style={{ width: 300, aspectRatio: 2 }}
              source={require('../../../assets/images/events/cny/board-ani.gif')}
            />
          </View>
          <View
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
            }}
          >
            <SlotMachineRoll
              results={results}
              onRoundComplete={onRoundComplete}
              onResultComplete={onResultComplete}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => {
                setResults(testResuls)
              }}
            >
              <Image
                source={require('../../../assets/images/events/cny/spin-btn.png')}
                style={{ width: 75, aspectRatio: 1 }}
              />
            </TouchableOpacity>
          </View>
          <View
            sx={{
              position: 'relative',
              width: 200,
              aspectRatio: 333 / 119,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                zIndex: 1,
                color: '#ebe9da',
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              LỘC BẠN NHẬN
            </Text>
            <Image
              source={require('../../../assets/images/events/cny/amount-bg.png')}
              style={{ width: '100%', height: '100%', position: 'absolute' }}
            />
            <AnimatedTextInput
              animatedProps={animatedProps}
              style={{
                color: '#ebe9da',
                fontSize: 30,
                lineHeight: 32,
                fontWeight: 'bold',
              }}
            />
          </View>
        </ScrollView>
        <Cloud />
      </ImageBackground>
    </View>
  )
}

export default SlotMachine
