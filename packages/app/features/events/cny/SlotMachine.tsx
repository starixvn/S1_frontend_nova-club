import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import IconButton from 'app/components/form/IconButton'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { useAppDispatch } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ActivityIndicator, ScrollView, Text, View } from 'dripsy'
import { useState } from 'react'
import { ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import { useModal } from 'react-native-modalfy'
import Animated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {
  eventApi,
  useCheckCnySpinQuery,
  useCnySpinMutation,
} from 'services/eventApi'
import { CNYRollResult } from 'services/eventApi.type'
import { useRouter } from 'solito/router'
import Cloud from './Cloud'
import Lantern from './Latern'

import SlotMachineRoll from './SlotMachineRoll'

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

// const testResuls = [
//   {
//     code: '2',
//     note: 'Congratulation! VND 0 has been added to your wallet. ',
//     amount: '38000',
//     formatted_amount: '0',
//     err: 'ok',
//   },
//   {
//     code: '2',
//     note: 'Congratulation! VND 0 has been added to your wallet. ',
//     amount: '38000',
//     formatted_amount: '0',
//     err: 'ok',
//   },
//   {
//     code: '1',
//     note: 'Congratulation! VND 0 has been added to your wallet. ',
//     amount: '18000',
//     formatted_amount: '0',
//     err: 'ok',
//   },
// ]

const SlotMachine = () => {
  const dispatch = useAppDispatch()
  const { back } = useRouter()
  const { top, bottom } = useSafeArea()
  const { openModal } = useModal()
  const progressAmount = useSharedValue(0)
  const [lastCompletedRound, setLastCompletedRound] = useState(0)
  const [isSubmitting, setSubmitting] = useState(false)
  const [isAnimating, setAnimating] = useState(false)
  const [results, setResults] = useState<CNYRollResult[]>()
  const { showAlert } = useAlert()
  const { t } = useLocalization()

  const { balance } = useCheckCnySpinQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: (s) => ({ ...s, balance: s.data?.data }),
  })

  const [spin] = useCnySpinMutation()

  async function roll() {
    try {
      setSubmitting(true)
      const { data, success, message } = await spin().unwrap()

      if (success) {
        setAnimating(true)
        setResults(data)
      } else {
        showAlert(message)
      }
    } catch (e) {
      showAlert(t('status.systemError'))
    } finally {
      setSubmitting(false)
    }
  }

  function onResultComplete() {
    if (results) {
      openModal(
        'CnyWinModal',
        {
          amount: results.reduce((t, c) => t + Number(c.amount), 0),
        },
        () => {
          progressAmount.value = 0
        }
      )

      dispatch(
        eventApi.util.updateQueryData(
          'checkCnySpin',
          undefined,
          (draftPosts) => {
            if (draftPosts.data) draftPosts.data.totalBalance = 0
          }
        )
      )

      setAnimating(false)
    }
  }

  function onRoundComplete(completedIndex, next) {
    if (results) {
      setLastCompletedRound(completedIndex + 1)
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
  }

  const animatedProps = useAnimatedProps(
    () =>
      ({
        text:
          Math.round(progressAmount.value / 1000) +
          (progressAmount.value > 1000 ? 'K' : ''),
      } as any)
  )

  return (
    <View sx={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/images/events/cny/bg.png')}
        style={{ flex: 1 }}
      >
        <IconButton
          onPress={() => back()}
          name="chevleft"
          size={20}
          color={'$darkNavyBlue'}
          sx={{
            top: top + 50,
            left: 20,
            zIndex: 3,
            width: 40,
            height: 40,
            position: 'absolute',
            bg: 'white',
            borderRadius: 100,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
          }}
        />
        <Lantern />
        <Cloud />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingTop: top,
            paddingBottom: bottom,
          }}
        >
          {
            <View
              sx={{
                marginTop: '15%',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                style={{ width: 300, aspectRatio: 2 }}
                source={{
                  uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/cny/board-ani.gif`,
                }}
              />
              <View
                sx={{
                  position: 'absolute',
                  left: '5%',
                  right: '5%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View sx={{ flex: 1, alignItems: 'center' }}>
                  <Image
                    style={{ width: 50, aspectRatio: 168 / 181 }}
                    source={require('../../../assets/images/events/cny/ticket.png')}
                  />
                </View>
                <View sx={{ flex: 1, alignItems: 'center' }}>
                  {balance ? (
                    <Text
                      style={{
                        fontSize: 40,
                      }}
                    >
                      {`${
                        isAnimating && results
                          ? results.length - lastCompletedRound
                          : balance.totalBalance
                      }/${balance.totalSpin}`}
                    </Text>
                  ) : (
                    <ActivityIndicator />
                  )}
                </View>
              </View>
            </View>
          }
          <View
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              // borderWidth: 1,
            }}
          >
            <SlotMachineRoll
              results={results}
              onRoundComplete={onRoundComplete}
              onResultComplete={onResultComplete}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <View
              sx={{
                width: 75,
                height: 75,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isSubmitting || isAnimating ? (
                <ActivityIndicator />
              ) : (
                <TouchableOpacity
                  onPress={roll}
                  disabled={
                    !(balance && balance.totalBalance > 0) || isSubmitting
                  }
                >
                  <Image
                    source={require('../../../assets/images/events/cny/spin-btn.png')}
                    style={{ width: '100%', aspectRatio: 1 }}
                  />
                </TouchableOpacity>
              )}
            </View>
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
      </ImageBackground>
    </View>
  )
}

export default SlotMachine
