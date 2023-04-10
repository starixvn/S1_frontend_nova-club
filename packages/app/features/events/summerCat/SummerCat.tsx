import IconButton from 'app/components/form/IconButton'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ActivityIndicator, ScrollView, Text, View } from 'dripsy'
import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { ImageBackground, Platform } from 'react-native'
import CoinBox from './CoinBox'
import Result from './Result'
import SummerCatCard from './SummerCatCard'
import useSoundController from './useSoundController'
import {
  useCheckTicketSpinQuery,
  useTicketSpinMutation,
} from 'services/eventApi'
import useAlert from 'app/hooks/useAlert'
import { getErrorMessage } from 'app/utils/validation'
import useLocalization from 'app/provider/localization'

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
  const [result, setResult] = useState(
    possibleResult[Math.floor(Math.random() * possibleResult.length)]
  )
  const [flipPage, setFlipPage] = useState(true)
  const [resetCard, setResetCard] = useState(false)
  const [prizePress, setPrizePress] = useState(0)
  const [disabledButtons, setDisabledButtons] = useState<Array<Number>>([])
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

  const [spin] = useTicketSpinMutation()

  const imageBackgroundref = useCallback((node) => {
    if (!node) return

    const backgroundImage = node.childNodes
    backgroundImage[0].style.backgroundPosition = 'top'
  }, [])

  async function getResult() {
    try {
      setSubmitting(true)
      // const success = true
      // const data = testResuls
      // const message = 'test'
      const { data, success, message } = await spin().unwrap()

      if (success) {
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
      // Add result into array
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
    setButtoMap(handleSetReward)
    setResetCard(false)
  }, [flipPage])

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
      }, 5000)
    }

    if (flipPage && prizePress === 3) {
      setDisabledButtons([])
      setPrizePress(0)
      // setButtoMap(handleSetReward)
      //reset new result
      //enable all button
    }
    //onpress shall set index? disabled on which condition? need study through
  }, [prizePress, flipPage])

  return (
    <View sx={{ flex: 1 }}>
      <ImageBackground
        imageRef={Platform.select({ web: imageBackgroundref })}
        source={require('../../../assets/images/events/summerCat/sea_bg.jpg')}
        resizeMode={Platform.OS === 'web' ? 'cover' : 'cover'}
        // imageStyle={Platform.select({
        //   web: { backgroundPosition: '0px 100px' },
        // })}
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
            // paddingTop: top,
            paddingBottom: bottom,
            justifyContent: 'center',
          }}
          sx={Platform.select({
            web: {
              height: 1, // Hacky way to make overflow works
            },
          })}
        >
          <View sx={{ margin: 20 }}>
            {flipPage ? (
              <CoinBox title={t('event.catEvent.miniGame.matchThree')}>
                {groupedData.map((group, i) => (
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
                ))}
              </CoinBox>
            ) : (
              <Result
                result={result!}
                onPress={() => {
                  setFlipPage(true)
                  setResult(
                    possibleResult[
                      Math.floor(Math.random() * possibleResult.length)
                    ]
                  )
                }}
              />
            )}
            <View
              sx={{
                alignSelf: 'flex-start',
                marginTop: 20,
                bg: 'rgba(255,255,255,0.3)',
                borderRadius: 30,
                borderWidth: 6,
                borderColor: 'white',
                height: 60,
                width: 150,
              }}
            >
              {isFetching ? (
                <ActivityIndicator color={'white'} size="large" />
              ) : (
                <>
                  <Text
                    sx={{
                      textAlign: 'center',
                      fontWeight: '900',
                      fontSize: 20,
                    }}
                  >
                    {balance ? balance.totalSpin : 0}
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
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

export default SummerCat
