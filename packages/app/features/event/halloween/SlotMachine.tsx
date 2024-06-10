import Image from 'app/components/common/Image'
import useAlert from 'app/hooks/useAlert'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { getErrorMessage } from 'app/utils/validation'
import { ActivityIndicator, ScrollView, Text, View } from 'dripsy'
import { useFonts } from 'expo-font'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ImageBackground,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import {
  useCheckTicketSpinQuery,
  useTicketSpinMutation,
} from 'services/eventApi'
import { TicketSpinResult } from 'services/eventApi.type'
import { useRouter } from 'solito/router'

import { translate } from '@games/shared/translations/translationByCurrency'
import BeVietnamPro, {
  BeVietnamProUseFont,
} from 'app/assets/fonts/BeVietnamePro'
import IconButton from 'app/components/IconButton'
import { useAppSelector } from 'rewards/provider/redux/store'
import { SolitoImage } from 'solito/image'
import Eyes from './Eyes'
import Ghost from './Ghost'
import SlotMachineRoll from './SlotMachineRoll'
import { useSoundPlayback } from './audioUtils'

Animated.addWhitelistedNativeProps({ value: true })
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

function getTicketCountDisplay(count = 0) {
  return count > 99 ? '99+' : count.toString()
}

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

const textShadow = {
  textShadowColor: '#DE10B7C4',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 4,
}

const SlotMachine = () => {
  const { back } = useRouter()
  const { top, bottom } = useSafeArea()
  const { openModal } = useModal()
  const progressAmount = useSharedValue(0)
  const [lastCompletedRound, setLastCompletedRound] = useState(0)
  const [isSubmitting, setSubmitting] = useState(false)
  const [isAnimating, setAnimating] = useState(false)
  const [results, setResults] = useState<TicketSpinResult[]>()
  const { showAlert } = useAlert()
  const { width: screenWidth } = useWindowDimensions()
  const currency = useAppSelector((s) => s.setting.currency)
  const inputRef = useRef(null)

  const [isFontLoaded] = useFonts(BeVietnamProUseFont)

  const [spinPlayback, spinPlaybackDispose, preloadSpinPlayback] =
    useSoundPlayback('spin')
  const [wonPlayback, wonPlaybackDispose, preloadWonPlayback] =
    useSoundPlayback('won')
  const [bgPlayback, bgPlaybackDispose] = useSoundPlayback('bg', {
    isLooping: true,
  })

  const imageBackgroundref = useCallback((node) => {
    if (!node) return

    const backgroundImage = node.childNodes
    backgroundImage[0].style.backgroundPosition = 'top'
  }, [])

  const redeemPrizeError = useRef('')

  const { balance, isFetching } = useCheckTicketSpinQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: (s) => ({ ...s, balance: s.data?.data }),
    skip: false,
  })

  const [spin] = useTicketSpinMutation()

  const handlePrizeEmpty = (prizeList?: TicketSpinResult[]) => {
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

      // await sleep(1000)
      // setAnimating(true)
      // setResults(testResuls)

      // spinPlayback()
      const { data, success, message } = await spin().unwrap()

      if (success && data) {
        const validPrize = handlePrizeEmpty(data)

        if (validPrize.length) {
          setAnimating(true)
          setResults(validPrize)
          spinPlayback()
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
          openWinModal()
        },
      })

      return
    }

    openWinModal()
  }

  function openWinModal() {
    if (results) {
      const total = results.reduce((t, c) => t + Number(c.amount), 0)
      openModal(
        'HalloweenWinModal',
        {
          amount: total,
        },
        () => {
          progressAmount.value = 0
        }
      )

      wonPlayback()

      redeemPrizeError.current = ''
      setAnimating(false)
    }
  }

  function onRoundComplete(completedIndex, next) {
    if (results) {
      const nextIndex = completedIndex + 1
      const resultLength = results.length

      setLastCompletedRound(nextIndex)
      progressAmount.value = withTiming(
        progressAmount.value + Number(results[completedIndex]?.amount),
        {
          duration: 500,
        },
        (completed) => {
          if (completed) {
            runOnJS(next)()

            if (resultLength !== nextIndex) {
              runOnJS(spinPlayback)()
            }
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
  }, [progressAmount])

  // https://github.com/software-mansion/react-native-reanimated/issues/1808
  useAnimatedReaction(
    () => {
      return Platform.OS === 'web'
        ? Math.round(progressAmount.value / 1000) +
            (progressAmount.value > 1000 ? 'K' : '')
        : ''
    },
    (data, prevData) => {
      if (Platform.OS === 'web' && data !== prevData && inputRef.current) {
        inputRef.current.setNativeProps({
          value: data,
        })
      }
    },
    [progressAmount]
  )

  let ticketLabel = `0/0`
  if (balance) {
    const remaining = getTicketCountDisplay(balance.totalBalance)
    const total = getTicketCountDisplay(balance.totalSpin)

    ticketLabel = `${remaining}/${total}`
  }

  useEffect(() => {
    if (Platform.OS !== 'web') bgPlayback()

    preloadWonPlayback()
    preloadSpinPlayback()

    return () => {
      spinPlaybackDispose()
      wonPlaybackDispose()
      bgPlaybackDispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scaledFontSize = 18 + ((Math.min(screenWidth, 700) - 350) / 350) * 10

  /* Web only can run audio after user interaction */
  function triggerAudio() {
    bgPlayback()
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => triggerAudio()}
      disabled={Platform.OS !== 'web'}
    >
      <View sx={{ flex: 1 }}>
        <ImageBackground
          imageRef={Platform.select({ web: imageBackgroundref })}
          source={require('../../../assets/images/events/halloween/bg.jpg')}
          style={{
            flex: 1,
          }}
        >
          <IconButton
            onPress={() => back()}
            name="back"
            color={'$darkNavyBlue'}
            size={20}
            sx={{
              top: top + 40,
              left: 20,
              zIndex: 3,
              paddingRight: 8,
              width: 35,
              height: 35,
              position: 'absolute',
              bg: 'white',
              borderRadius: 100,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.5,
              shadowRadius: 2.62,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 4,
            }}
          />
          <Ghost />
          <Eyes />
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
              default: {
                flex: 1,
              },
            })}
          >
            <View
              sx={{
                marginTop: '30%',
                marginBottom: '2%',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                sx={{
                  width: Math.min(0.7 * screenWidth, 380),
                  aspectRatio: 752 / 229,
                }}
              >
                <SolitoImage
                  fill
                  src={require('../../../assets/images/events/halloween/ticket-board.png')}
                  alt="tickets"
                />
              </View>
              <View
                sx={{
                  position: 'absolute',
                  left: '13%',
                  right: '8%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  sx={{
                    flexBasis: '35%',
                    aspectRatio: 150 / 112,
                    alignItems: 'flex-end',
                    flexGrow: 1,
                  }}
                >
                  <View
                    sx={{
                      width: '150%',
                      height: '150%',
                      position: 'relative',
                      top: '-26%',
                      right: Platform.OS === 'web' ? '-40%' : '-22%',
                    }}
                  >
                    <SolitoImage
                      fill
                      src={require('../../../assets/images/events/halloween/ticket.png')}
                      alt="ticket"
                    />
                  </View>
                </View>
                <View
                  sx={{
                    flexBasis: '65%',
                    alignItems: 'center',
                  }}
                >
                  {isFetching || isAnimating ? (
                    <ActivityIndicator color={'$primary.100'} size={20} />
                  ) : isFontLoaded ? (
                    <Text
                      style={[
                        {
                          fontSize: scaledFontSize,
                          fontFamily: BeVietnamPro.Black.name,
                          color: '#9B309F',
                          textShadowColor: 'white',
                          textShadowOffset: { width: -1, height: 1 },
                          textShadowRadius: 2,
                        },
                      ]}
                    >
                      {ticketLabel}
                    </Text>
                  ) : null}
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
            <View style={{ top: '-8%' }}>
              <View
                sx={{
                  width: 80,
                  height: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isSubmitting || isAnimating ? (
                  <ActivityIndicator color={'$primary.100'} />
                ) : (
                  <TouchableOpacity
                    onPress={roll}
                    disabled={
                      !(balance && balance.totalBalance > 0) || isSubmitting
                    }
                    style={{ width: '100%', aspectRatio: 146 / 158 }}
                  >
                    <SolitoImage
                      fill
                      src={require('../../../assets/images/events/halloween/spin-btn.png')}
                      alt="spin"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              sx={{
                top: '-3%',
                position: 'relative',
                width: Math.min(400, screenWidth * 0.7),
                aspectRatio: 333 / 119,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10%',
              }}
            >
              {isFontLoaded && (
                <Text
                  style={[
                    textShadow,
                    {
                      lineHeight: scaledFontSize * 2,
                      marginBottom: scaledFontSize * -0.5,
                      zIndex: 1,
                      color: '#ebe9da',
                      fontSize: scaledFontSize,
                      fontWeight: 'bold',
                      fontFamily: BeVietnamPro.Black.name,
                    },
                  ]}
                >
                  {translate(currency, 'total')}
                </Text>
              )}
              <Image
                source={require('../../../assets/images/events/halloween/amount-bg.png')}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
                alt="board"
              />
              {isFontLoaded && (
                <AnimatedTextInput
                  ref={Platform.select({ web: inputRef })}
                  pointerEvents={'none'}
                  animatedProps={animatedProps}
                  editable={false}
                  style={[
                    textShadow,
                    {
                      color: '#ebe9da',
                      fontFamily: BeVietnamPro.Black.name,
                      fontSize: Math.floor(scaledFontSize * 1.5),
                      fontWeight: 'bold',
                      textAlign: 'center',
                      zIndex: 2,
                    },
                  ]}
                />
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default SlotMachine
