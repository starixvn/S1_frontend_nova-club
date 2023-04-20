import IconButton from 'app/components/form/IconButton'
import useAlert from 'app/hooks/useAlert'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { getErrorMessage } from 'app/utils/validation'
import { ScrollView, Text, View } from 'dripsy'
import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { ImageBackground, Platform } from 'react-native'
import {
  useCheckTicketSpinQuery,
  useLuckyDrawMutation,
} from 'services/eventApi'
import CoinBox from './CoinBox'
import Result from './Result'
import StartNow from './StartNow'
import SummerCatCard from './SummerCatCard'
import useSoundController from './useSoundController'

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

const SummerCat = () => {
  const { back } = useContextualRouter()
  const { top, bottom } = useSafeArea()

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
        console.log('res', data)
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

    console.log('handle set reward result', randoms)
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
    console.log('check flip page props', result)
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

  return (
    <View sx={{ flex: 1 }}>
      <ImageBackground
        imageRef={Platform.select({ web: imageBackgroundref })}
        source={require('../../../assets/images/events/summerCat/sea_bg.jpg')}
        resizeMode={Platform.OS === 'web' ? 'cover' : 'cover'}
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
            flex: 1,
            alignItems: 'center',
            paddingBottom: bottom,
            justifyContent: 'center',
            minWidth: 400,
          }}
          sx={Platform.select({
            web: {
              height: 1, // Hacky way to make overflow works
            },
          })}
        >
          <View>
            {flipPage ? (
              <CoinBox title={t('event.catEvent.miniGame.matchThree')}>
                {result || result! >= 0 ? (
                  groupedData.map((group, i) => (
                    <View key={i} sx={{ flexDirection: 'row' }}>
                      {group.map((e, j) => {
                        const counter = j + i * 3
                        const isDisabled = disabledButtons.includes(counter)
                        return (
                          <SummerCatCard
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
                    disable={balance?.totalBalance === 0}
                    isSubmitting={isSubmitting}
                    onPress={() => getResult()}
                  />
                )}
              </CoinBox>
            ) : (
              <Result
                result={result!}
                onPress={() => {
                  setFlipPage(true)
                  setResult(undefined)
                }}
              />
            )}
            <View
              sx={{
                alignSelf: 'flex-start',
                marginTop: 20,
                bg: 'rgba(37,89,139,0.7)',
                borderRadius: 30,
                borderWidth: 6,
                borderColor: 'white',
                height: 60,
                width: 150,
              }}
            >
              <Text
                sx={{
                  textAlign: 'center',
                  fontWeight: '900',
                  fontSize: 20,
                }}
              >
                {balance ? balance.totalBalance : 0}
              </Text>
              <Text
                sx={{
                  textAlign: 'center',
                  fontWeight: '900',
                  fontSize: 10,
                }}
              >
                {t('event.catEvent.miniGame.ticketLeft')}
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

export default SummerCat
