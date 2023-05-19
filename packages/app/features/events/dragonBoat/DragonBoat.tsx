import IconButton from 'app/components/form/IconButton'
import useAlert from 'app/hooks/useAlert'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { getErrorMessage } from 'app/utils/validation'
import { ScrollView, Text, View } from 'dripsy'
import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { ImageBackground, Platform, useWindowDimensions } from 'react-native'
import {
  useCheckTicketSpinQuery,
  useLuckyDrawMutation,
} from 'services/eventApi'
import CoinBox from './CoinBox'
import Result from './Result'
import StartNow from './StartNow'
import DragonBoatCatCard from './DragonBoatCatCard'
import useSoundController from './useSoundController'
import Image from 'app/components/common/Image'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { Action, ActionType, getAction } from 'app/utils/actionGenerator'
import { useAppSelector } from 'app/provider/redux/store'
import { Gradient } from '@dripsy/gradient'
import { useFonts } from 'expo-font'
import Background from './Background'
import AnimateBackground from './AnimateBackground'
import Title from './Title'
import TicketLeft from './TicketLeft'

const possibleResult = [0, 38000, 388000, 3888000]

const catDict = {
  0: require('../../../assets/images/events/summerCat/cat_0.png'),
  38000: require('../../../assets/images/events/summerCat/cat_88.png'),
  388000: require('../../../assets/images/events/summerCat/cat_388.png'),
  3888000: require('../../../assets/images/events/summerCat/cat_3888.png'),
}

const prizeDict = {
  0: require('../../../assets/images/events/summerCat/win0.png'),
  38000: require('../../../assets/images/events/summerCat/win38.png'),
  388000: require('../../../assets/images/events/summerCat/win388.png'),
  3888000: require('../../../assets/images/events/summerCat/win3888.png'),
}

const tncData: Action = {
  type: ActionType.INTERNAL_REDIRECT,
  payload: {
    uri: '/event/dragon-boat-event-tnc',
    params: {
      locale: 'vn',
    },
  },
}

const DragonBoat = () => {
  const { back, push } = useContextualRouter()
  const { top, bottom, left, right } = useSafeArea()
  const { height, width } = useWindowDimensions()

  const [buttonMap, setButtoMap] = useState<Array<number>>([])
  const [result, setResult] = useState<number>() || undefined
  const [flipPage, setFlipPage] = useState(true)
  const [resetCard, setResetCard] = useState(false)
  const [prizePress, setPrizePress] = useState(0)
  const [disabledButtons, setDisabledButtons] = useState<Array<number>>([])
  const [isSubmitting, setSubmitting] = useState(false)

  const soundController = useSoundController()
  const { play } = soundController
  const { showAlert } = useAlert()
  const { t } = useLocalization()
  const locale = useAppSelector((s) => s.setting.locale)

  const groupedData = _.chunk(buttonMap, 3)

  const { balance, isFetching } = useCheckTicketSpinQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: (s) => ({ ...s, balance: s.data?.data }),
  })

  const [draw] = useLuckyDrawMutation()

  const imageBackgroundref = useCallback((node) => {
    if (!node) return

    const backgroundImage = node.childNodes
    backgroundImage[0].style.backgroundPosition = 'bottom'
  }, [])

  async function getResult() {
    try {
      setSubmitting(true)
      const { data, success, message } = await draw().unwrap()

      if (success && data) {
        setResult(parseInt(data[0]?.amount))
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

  function handleSetReward() {
    if (!(result || result! >= 0)) return
    const randoms: typeof buttonMap = []
    const frequencyCounter = {}
    const filteredArray = possibleResult.filter((value) => value !== result)

    for (let i = 0; i < 6; i++) {
      let randomNum = Math.floor(Math.random() * filteredArray.length)

      while (
        frequencyCounter[filteredArray[randomNum]] &&
        frequencyCounter[filteredArray[randomNum]] >= 2
      ) {
        randomNum = Math.floor(Math.random() * filteredArray.length)
      }

      randoms.push(filteredArray[randomNum])
      frequencyCounter[filteredArray[randomNum]] =
        (frequencyCounter[filteredArray[randomNum]] || 0) + 1
    }

    for (let i = 0; i < 3; i++) {
      randoms.push(result)
    }

    return shuffle(randoms)
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  useEffect(() => {
    if (result! >= 0) {
      setButtoMap(handleSetReward)
    }
    setResetCard(false)
  }, [flipPage, result])

  useEffect(() => {
    if (prizePress === 3) {
      if (result && result > 0) {
        play('won')
      } else {
        play('lose')
      }
      setResetCard(!resetCard)

      setTimeout(() => {
        setFlipPage(false)
      }, 1600)
    }

    if (flipPage && prizePress === 3) {
      setDisabledButtons([])
      setPrizePress(0)
    }
  }, [prizePress, flipPage])

  const handleTncButton = useCallback(() => {
    const action = getAction(tncData)
    action({ push, locale })
  }, [locale])

  return (
    <View sx={{ flex: 1 }}>
      <Background />
      <AnimateBackground />
      <IconButton
        onPress={() => back()}
        name="chevleft"
        size={20}
        color={'$darkNavyBlue'}
        sx={{
          top: top + 25,
          left: left + 20,
          zIndex: 3,
          width: 30,
          height: 30,
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
      <TouchableOpacity
        onPress={() => handleTncButton()}
        disabled={Platform.OS === 'web' && result ? true : false}
        sx={{
          top: top + 25,
          right: right + 20,
          zIndex: 3,
          width: 30,
          height: 30,
          position: 'absolute',
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
      >
        <Image
          source={require('app/assets/images/events/summerCat/btnTnC.png')}
          resizeMode="contain"
          style={{ width: '100%', height: '100%', zIndex: 1 }}
        />
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: bottom,
          alignItems: 'center',
          // justifyContent: 'center',
          // marginTop: top + 80,
        }}
        sx={Platform.select({
          web: {
            height: 1, // Hacky way to make overflow works
          },
        })}
      >
        <View
          sx={{
            width: '80%',
            maxWidth: 400,
            marginTop: top + 80,
          }}
        >
          <View>
            <TicketLeft balance={balance} />
          </View>
          {flipPage ? (
            <View>
              <Title balance={balance} />
              <CoinBox title={t('event.catEvent.miniGame.matchThree')}>
                {result || result! >= 0 ? (
                  groupedData.map((group, i) => (
                    <View key={i} sx={{ flexDirection: 'row' }}>
                      {group.map((e, j) => {
                        const counter = j + i * 3
                        const isDisabled = disabledButtons.includes(counter)
                        return (
                          <DragonBoatCatCard
                            key={counter}
                            value={e}
                            img={catDict[e]}
                            prizeImg={e === result && prizeDict[e]}
                            resetCard={resetCard}
                            disabled={isDisabled}
                            flipSound={soundController}
                            onPress={() => {
                              if (result === e) {
                                setPrizePress(prizePress + 1)
                              }
                              setDisabledButtons([...disabledButtons, counter])
                            }}
                          />
                        )
                      })}
                    </View>
                  ))
                ) : (
                  <StartNow
                    disable={
                      !balance?.totalBalance || balance?.totalBalance === 0
                    }
                    isSubmitting={isSubmitting}
                    onPress={() => getResult()}
                  />
                )}
              </CoinBox>
            </View>
          ) : (
            <View>
              <Result
                result={result!}
                onPress={() => {
                  setFlipPage(true)
                  setResult(undefined)
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default DragonBoat
