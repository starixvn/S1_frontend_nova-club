import Image from 'app/components/common/Image'
import IconButton from 'app/components/form/IconButton'
import useAlert from 'app/hooks/useAlert'
import useOrientation from 'app/hooks/useOrientation'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { getErrorMessage } from 'app/utils/validation'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useDripsyTheme,
  View,
} from 'dripsy'
import { useCallback, useRef, useState } from 'react'
import {
  ImageBackground,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useCheckCnySpinQuery, useCnySpinMutation } from 'services/eventApi'
import { CNYRollResult } from 'services/eventApi.type'
import { useRouter } from 'solito/router'

import SlotMachineRoll from './SlotMachineRoll'
import useSoundController from './useSoundController'

const testResuls = [
  {
    code: '2',
    note: 'Congratulation! VND 0 has been added to your wallet. ',
    amount: '38000',
    formatted_amount: '38K',
    err: 'ok',
  },
  {
    code: '2',
    note: 'Congratulation! VND 0 has been added to your wallet. ',
    amount: '999000',
    formatted_amount: '999K',
    err: 'ok',
  },
  {
    code: '1',
    note: 'Congratulation! VND 0 has been added to your wallet. ',
    amount: '18000',
    formatted_amount: '18K',
    err: 'ok',
  },
]

const SlotMachine = () => {
  const { back } = useRouter()
  const { top, bottom } = useSafeArea()
  const { openModal } = useModal()
  const isLandscape = useOrientation()
  const [progressAmount, setProgressAmount] = useState(0)
  const [lastCompletedRound, setLastCompletedRound] = useState(0)
  const [isSubmitting, setSubmitting] = useState(false)
  const [isAnimating, setAnimating] = useState(false)
  const [results, setResults] = useState<CNYRollResult[]>()
  const { showAlert } = useAlert()
  const { t } = useLocalization()
  const { width: screenWidth } = useWindowDimensions()
  const soundController = useSoundController()
  const { play } = soundController

  const imageBackgroundref = useCallback((node) => {
    if (!node) return

    const backgroundImage = node.childNodes
    backgroundImage[0].style.backgroundPosition = 'top'
  }, [])

  const redeemPrizeError = useRef('')
  const { theme } = useDripsyTheme()

  const { balance, isFetching } = useCheckCnySpinQuery(undefined, {
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
      // const success = true
      // const data = testResuls
      // const message = 'test'
      const { data, success, message } = await spin().unwrap()

      if (success) {
        const validPrize = handlePrizeEmpty(data)

        if (validPrize.length) {
          setAnimating(true)
          setResults(validPrize)
          // playSpin()
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

    play('won')
    openCnySuccessModal()
  }

  function openCnySuccessModal() {
    if (results) {
      openModal(
        'SpinManiaWinModal',
        {
          amount: results.reduce((t, c) => t + Number(c.amount), 0),
        },
        () => {
          setProgressAmount(0)
        }
      )

      redeemPrizeError.current = ''
      setAnimating(false)
    }
  }

  function onRoundComplete(completedIndex, next) {
    if (results) {
      const nextIndex = completedIndex + 1
      const resultLength = results.length
      setLastCompletedRound(nextIndex)
      setProgressAmount((p) => p + Number(results[completedIndex]?.amount))
      setTimeout(() => {
        next()
      }, 1000)
    }
  }

  let ticketLabel = `0/0`
  if (balance) {
    ticketLabel = `${
      isAnimating && results
        ? results.length - lastCompletedRound
        : balance.totalBalance
    }/${balance.totalSpin}`
  }

  return (
    <View sx={{ flex: 1, bg: '$background' }}>
      <ImageBackground
        imageRef={Platform.select({ web: imageBackgroundref })}
        source={require('../../../assets/images/events/spinMania/bg.jpg')}
        style={{
          flex: 1,
        }}
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
              marginTop:
                Platform.OS === 'web'
                  ? ['35%', '18%']
                  : isLandscape
                  ? '18%'
                  : '35%',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              style={{ width: 250, aspectRatio: 2.5 }}
              source={require('app/assets/images/events/spinMania/ticketFrame.png')}
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
              />
              <View
                sx={{
                  flexBasis: '70%',
                  alignItems: 'center',
                }}
              >
                {isFetching ? (
                  <ActivityIndicator color={'white'} size="large" />
                ) : (
                  <Text
                    style={{
                      fontSize: 40,
                    }}
                  >
                    {ticketLabel}
                  </Text>
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
              soundController={soundController}
              onRoundComplete={onRoundComplete}
              onResultComplete={onResultComplete}
            />
          </View>
          <View style={{ marginBottom: 20, marginTop: 25 }}>
            <View
              sx={{
                width: 85,
                height: 85,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isSubmitting || isAnimating ? (
                <ActivityIndicator color={theme.colors.$yellowOrange} />
              ) : (
                <TouchableOpacity
                  onPress={roll}
                  disabled={
                    !(balance && balance.totalBalance > 0) || isSubmitting
                  }
                  style={{ width: '100%' }}
                >
                  <Image
                    source={require('../../../assets/images/events/spinMania/spin-btn.png')}
                    style={{ width: '100%', aspectRatio: 1 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            sx={{
              position: 'relative',
              width: Math.min(594, screenWidth * 0.8),
              aspectRatio: 594 / 256,
              alignItems: 'center',
            }}
          >
            <View
              sx={{
                zIndex: 1,
                height: '25%',
                mt: '8%',
                justifyContent: 'center',
              }}
            >
              <Text
                sx={{
                  color: 'white',
                  fontSize: [18, 25],
                  fontWeight: 'bold',
                }}
              >
                BẠN ĐÃ TRÚNG THƯỞNG
              </Text>
            </View>
            <Image
              source={require('../../../assets/images/events/spinMania/amount-bg.png')}
              style={{ width: '100%', height: '100%', position: 'absolute' }}
            />
            <View
              sx={{
                zIndex: 6,
                height: '25%',
                mt: '2.5%',
                justifyContent: 'center',
              }}
            >
              <Text
                sx={{
                  fontSize: [25, 30, 40],
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {toCurrency(progressAmount, Currency.VND, {
                  symbol: false,
                })}
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

export default SlotMachine
