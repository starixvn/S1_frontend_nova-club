import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import IconButton from 'app/components/form/IconButton'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { getErrorMessage } from 'app/utils/validation'
import { ActivityIndicator, ScrollView, Text, View } from 'dripsy'
import { useRef, useState } from 'react'
import {
  ImageBackground,
  Platform,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import { useModal } from 'react-native-modalfy'
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useCheckCnySpinQuery, useCnySpinMutation } from 'services/eventApi'
import { CNYRollResult } from 'services/eventApi.type'
import { useRouter } from 'solito/router'
import Cloud from './Cloud'
import Lantern from './Latern'

import SlotMachineRoll from './SlotMachineRoll'

Animated.addWhitelistedNativeProps({ value: true })
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
  const { width: screenWidth } = useWindowDimensions()
  const inputRef = useRef(null)
  const redeemPrizeError = useRef('')

  const { balance } = useCheckCnySpinQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: (s) => ({ ...s, balance: s.data?.data }),
  })

  const [spin] = useCnySpinMutation()

  const handlePrizeEmpty = (prizeList?: CNYRollResult[]) => {
    if (!prizeList || prizeList.length <= 0) return []

    const validPrizeList = prizeList.filter((prize) => {
      if (prize.code === '') {
        redeemPrizeError.current = prize.err

        return false
      }

      return true
    })

    return validPrizeList
  }

  async function roll() {
    try {
      setSubmitting(true)
      const { data, success, message } = await spin().unwrap()

      if (success) {
        const validPrize = handlePrizeEmpty(data)

        if (validPrize.length) {
          setAnimating(true)
          setResults(validPrize)
        } else {
          openModal('AlertModal', {
            message: getErrorMessage(redeemPrizeError.current),
            onClose: () => {
              return false
            },
          })
        }
      } else {
        showAlert(message)
      }
    } catch (e) {
      const error = getErrorMessage(e)
      showAlert(error)
    } finally {
      setSubmitting(false)
    }
  }

  function onResultComplete() {
    if (redeemPrizeError.current) {
      openModal('AlertModal', {
        message: getErrorMessage(redeemPrizeError.current),
        onClose: () => {
          openCnySuccessModal()
        },
      })

      return
    }

    openCnySuccessModal()
  }

  function openCnySuccessModal() {
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

      redeemPrizeError.current = ''
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

  const animatedProps = useAnimatedProps(() => {
    return {
      text:
        Math.round(progressAmount.value / 1000) +
        (progressAmount.value > 1000 ? 'K' : ''),
    } as any
  })

  // https://github.com/software-mansion/react-native-reanimated/issues/1808
  useAnimatedReaction(
    () => {
      return (
        Platform.OS === 'web' &&
        Math.round(progressAmount.value / 1000) +
          (progressAmount.value > 1000 ? 'K' : '')
      )
    },
    (data, prevData) => {
      if (Platform.OS === 'web' && data !== prevData && inputRef.current) {
        inputRef.current.setNativeProps({
          value: data,
        })
      }
    },
    []
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
          sx={Platform.select({
            web: {
              height: 1, // Hacky way to make overflow works
            },
          })}
        >
          <View
            sx={{
              marginTop: '18%',
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
              <View
                sx={{
                  flexBasis: '30%',
                  alignItems: 'flex-end',
                  flexGrow: 1,
                }}
              >
                <Image
                  style={{ width: 50, aspectRatio: 168 / 181 }}
                  source={require('../../../assets/images/events/cny/ticket.png')}
                />
              </View>
              <View
                sx={{
                  flexBasis: '70%',
                  alignItems: 'center',
                }}
              >
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
          <View
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
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
                  style={{ width: '100%' }}
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
              width: Math.min(230, screenWidth * 0.6),
              aspectRatio: 333 / 119,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '3%',
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
              ref={Platform.select({ web: inputRef })}
              pointerEvents={'none'}
              animatedProps={animatedProps}
              editable={false}
              style={{
                color: '#ebe9da',
                fontSize: 30,
                lineHeight: 32,
                fontWeight: 'bold',
                textAlign: 'center',
                zIndex: 2,
              }}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

export default SlotMachine
