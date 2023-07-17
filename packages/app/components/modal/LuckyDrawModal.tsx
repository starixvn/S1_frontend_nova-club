import useAlert from 'app/hooks/useAlert'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useOrientation from 'app/hooks/useOrientation'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import {
  P,
  Pressable,
  ScrollView,
  Text,
  View,
  useDripsyTheme,
  useResponsiveValue,
} from 'dripsy'
import debounce from 'lodash/debounce'
import { MotiText, MotiView } from 'moti'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Linking, Platform, useWindowDimensions } from 'react-native'
import { Easing } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { useLuckySpinMutation } from 'services/playerApi'
import { useRouter } from 'solito/router'
import IconButton from '../IconButton'
import { MotifiedImage } from '../common/Image'
import AvertaStd from 'app/assets/fonts/Averta'
import { useModal } from 'react-native-modalfy'

const LuckyDrawModal = ({ modal: { closeModal } }) => {
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const { push } = useRouter()
  const { closeAllModals } = useModal()

  const { width: fullWidth, height } = useContainerDimension()
  const { width: windowWidth } = useWindowDimensions()
  const width = Math.min(450, fullWidth)

  const { showAlert } = useAlert()

  const [spinLuckyWheel] = useLuckySpinMutation()
  const luckyDrawBalance = useAppSelector((s) => s.setting.luckyDrawBalance)

  const targetIndex = useRef(0)
  const [startAnimate, setStartAnimate] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [loopCount, setLoopCount] = useState(1)
  const [isButtonPressed, setIsButtonPressed] = useState(false)
  const [startAnimateWinPrizeFrame, setStartAnimateWinPrizeFrame] =
    useState(false)

  const canSpin = true // luckyDrawBalance > 0

  const { isLandscape } = useOrientation()

  const spin = async () => {
    setLoopCount((prev) => prev + 20)
    setStartAnimate(true)
    setLoading(true)

    const { data, success, message } = await spinLuckyWheel()
      .unwrap()
      .catch((error) => {
        setLoading(false)
        showAlert(error)
        return error
      })

    if (success) {
      targetIndex.current = handleSpinMapping(data.code)
      dispatch(SettingActions.setLuckyDrawBalance(luckyDrawBalance - 1)) // this is to trigger the memoized wheel
      // setSpinBalance((prev) => prev + 1)

      setTimeout(() => {
        showAlert({
          message: data.note,
          onClose: () => {
            setTimeout(() => handleClose(), 500)
          },
          persistent: true,
        })
        // setLoading(false) // since can only spin 1 time, retain the loading until its auto closed
      }, 5500)
      setStartAnimateWinPrizeFrame(true)
    } else {
      setLoading(false)
      showAlert(message)
    }
  }

  const debounceSpin = useCallback(debounce(spin, 500), [])
  const triggerDebounceSpin = () => {
    setLoading(true)
    debounceSpin()
  }

  const handleClose = () => {
    closeAllModals()
    dispatch(SettingActions.setLuckyDrawBalance(0))
  }

  const handleNavigateTnc = () => {
    closeModal('LuckyDrawModal', () => {
      dispatch(SettingActions.setLuckyDrawBalance(1))
    })
    push('/lucky-spin-tnc')
  }

  const handleSpinMapping = (code: number) => {
    switch (code) {
      case 1:
        return 9 //8
      case 2:
        return 1 //18
      case 3:
        return 6 //38
      case 4:
        return 2 //98
      case 5:
        return 4 //188
      case 6:
        return 8 // 388
      case 7:
        return 5 // 888
      default:
        return 3 //Dummy Prize, can be 0,3,7
    }
  }

  const shinyWidth = isLandscape ? height * 0.21 : width * 0.12
  const shinyHeight = shinyWidth / (120 / 25)

  const { top, left, right } = useSafeArea()

  const MemoizedWheel = useMemo(() => {
    return (
      <MotifiedImage
        from={{ rotate: parseRotationValue(0) }}
        animate={{
          rotate: getRadianByIndex(targetIndex.current, loopCount),
        }}
        // onDidAnimate={onResultSpinned}
        transition={{
          duration: startAnimate ? 5000 : 0,
          type: 'timing',
          easing: Easing.bezier(0, 0.62, 0.19, 1.01),
        }}
        source={require('app/assets/images/luckydraw/prizes.png')}
        sx={{ width: '90%', height: '90%', zIndex: 2 }}
      />
    )
  }, [luckyDrawBalance])

  return (
    <View
      sx={{
        width: fullWidth,
        height,
        position: 'relative',
      }}
    >
      <MotifiedImage
        style={{
          width: width * useResponsiveValue([1.25, 1.8, 1.8, 1.8]),
          top: height * useResponsiveValue([0.15, 0.1, 0.1]),
          aspectRatio: 10 / 7,
          position: 'absolute',
          ...(Platform.OS !== 'web' && {
            height: width * useResponsiveValue([1, 1, 1.8, 1.8]),
            top: height * useResponsiveValue([0.25, 0.25, 0.25]),
          }),
        }}
        from={{ scale: 0 }}
        animate={{ scale: 1 }}
        // transition={{ type: 'timing' }}
        source={require('app/assets/images/luckydraw/coins.png')}
      />
      <ScrollView
        bounces={false}
        sx={{ width: '100%', height: '100%' }}
        contentContainerSx={{
          width,
          alignItems: 'center',
          pl: left,
          pr: right,
          mr: 'auto',
          ml: 'auto',
          height: '100%',
        }}
      >
        <View
          sx={{
            flex: 1,
            width: '100%',
            height: Platform.OS !== 'web' ? height : 'auto',
          }}
        >
          <View
            sx={{
              mt: top + height * 0.05,
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '20%',
            }}
          >
            <MotifiedImage
              source={require('app/assets/images/luckydraw/lucky-spin.png')}
              from={{ scale: 0 }}
              animate={{ scale: 1 }}
              delay={200}
              sx={{
                width: width * useResponsiveValue([0.5, 0.5, 0.6, 0.6, 0.6]),
                aspectRatio: 380 / 98,
              }}
            />
          </View>
          <View
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: Platform.OS === 'web' ? '100%' : 0,
            }}
          >
            <MotifiedImage
              source={require('app/assets/images/luckydraw/pin.png')}
              from={{ scale: 0 }}
              animate={{ scale: 1 }}
              delay={200}
              sx={{
                width:
                  width * useResponsiveValue([0.075, 0.075, 0.075, 0.08, 0.08]),
                aspectRatio: 23 / 26,
                zIndex: 5,
                position: 'absolute',
                top: width * useResponsiveValue([0.05, 0.04, 0.01]),
                ...(Platform.OS !== 'web' && {
                  height:
                    height *
                    useResponsiveValue([0.05, 0.045, 0.05, 0.05, 0.06]),
                  top: width * useResponsiveValue([-0.025, 0.01]),
                }),
              }}
            />

            <View
              sx={{
                width: '90%',
                aspectRatio: 1,
                position: Platform.OS === 'web' ? 'absolute' : 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                mb: '10%',
                top: Platform.OS === 'web' ? '5%' : 0,
              }}
            >
              {startAnimateWinPrizeFrame && <WinningAnimationFrame />}

              <LuckySpinLogo />

              <PurpleTableImage />

              {Platform.OS === 'web' && (
                <DownloadAppButton
                  height={height}
                  width={width}
                  windowWidth={windowWidth}
                  onPress={handleClose}
                />
              )}

              {MemoizedWheel}

              <LuckySpinWheelFrame height={height} width={width} />

              {/* Android will crash with the rotation value supplied */}
              {Platform.OS === 'ios' && (
                <MotiView
                  animate={shinyAnimationState}
                  transition={{
                    loop: true,
                    repeatReverse: false,
                  }}
                  style={{ position: 'absolute', zIndex: 10 }}
                >
                  <MotifiedImage
                    source={require('app/assets/images/luckydraw/shine-curve.png')}
                    sx={{
                      zIndex: 10,
                      width: shinyWidth,
                      height: shinyHeight,
                      transform: [
                        {
                          translateY: width * 0.42 + shinyHeight * 0.35,
                        },
                      ],
                    }}
                  />
                </MotiView>
              )}
            </View>

            {Platform.OS !== 'web' && (
              <Pressable
                onPress={() => {
                  triggerDebounceSpin()
                  setIsButtonPressed(true)
                  setTimeout(() => {
                    setIsButtonPressed(false)
                  }, 100)
                }}
                disabled={!canSpin || isLoading}
                sx={{
                  width: '25%',
                  height: '22%',
                  zIndex: 10,
                  position: 'absolute',
                  bottom: '-15%',
                }}
              >
                <MotifiedImage
                  source={require('app/assets/images/luckydraw/btnSpin.png')}
                  from={{
                    scale: 0,
                    height: [
                      {
                        value: isButtonPressed ? '60%' : '100%',
                        duration: 250,
                      },
                    ],
                  }}
                  animate={{
                    scale: 1,
                    height: isButtonPressed ? '60%' : '100%',
                  }}
                  resizeMode="contain"
                  sx={{
                    width: '100%',
                    height: '100%',
                    bottom: 0,
                    position: 'absolute',
                  }}
                />
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
      <View sx={{ position: 'absolute', top: '8%', right: '10%' }}>
        <IconButton
          onPress={handleClose}
          name="cross"
          color="white"
          sx={{
            zIndex: 10,
          }}
          size={30}
        />
      </View>
      <View sx={{ position: 'absolute', top: '8%', left: '10%' }}>
        <IconButton
          onPress={() => handleNavigateTnc()}
          name="notice"
          color="white"
          sx={{
            zIndex: 10,
          }}
          size={30}
        />
      </View>
    </View>
  )
}

const shinyAnimationState = {
  rotate: [
    { type: 'timing', value: `${-Math.PI * 0.45}radian` },
    { type: 'timing', value: `${-Math.PI * 0.45}radian`, delay: 1000 },
    { type: 'timing', value: `${Math.PI * 2.2}radian`, duration: 2000 },
  ],
  opacity: [
    { type: 'timing', value: 0.2 },
    { type: 'timing', value: 0.9, delay: 1000 },
    { type: 'timing', value: 0, duration: 2000 },
  ],
}

function getRadianByIndex(
  index,
  loopCount = Math.floor(Math.random() * 20) + 10
) {
  const numberOfItems = 10
  const degreePerItem = 360 / numberOfItems
  //   const offset = -degreePerItem * Math.random() + degreePerItem / 2
  const deg = (loopCount - 1) * 360 + index * degreePerItem //+ offset

  const rad = -(deg * Math.PI) / 180

  return parseRotationValue(rad)
}

function parseRotationValue(radian: number = 0) {
  return `${radian}rad`
}

interface DownloadAppButtonProps {
  windowWidth: number
  onPress: () => void
  width: number
  height: number
}

const DownloadAppButton = ({
  windowWidth,
  onPress,
  width,
  height,
}: DownloadAppButtonProps) => {
  const { push } = useRouter()
  const { theme } = useDripsyTheme()
  return (
    <Pressable
      sx={{
        position: 'absolute',
        bottom: '-28%',
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => {
        if (windowWidth < 992) {
          Linking.openURL('https://s2syf.app.link/7rqfWLKDhtb')
        } else {
          push('/download')
          onPress()
        }
      }}
    >
      <View sx={{ flexDirection: 'row', mx: '$2', alignItems: 'center' }}>
        <MotiText
          from={{ scale: 0.85, backgroundColor: theme.colors?.$primary[300] }}
          animate={{ scale: 1, backgroundColor: theme.colors?.$primary[500] }}
          transition={{ type: 'timing', duration: 500, loop: true }}
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            textTransform: 'uppercase',
            color: 'white',
            borderRadius: 10,
            fontFamily: AvertaStd.Regular.name,
            padding: 8,
          }}
        >
          Download
        </MotiText>
        <Text
          sx={{
            fontWeight: 'bold',
            fontSize: 20,
            textTransform: 'uppercase',
          }}
        >
          App to Spin
        </Text>
      </View>

      <MotifiedImage
        source={require('app/assets/images/luckydraw/download.gif')}
        sx={{
          width: width * useResponsiveValue([0.04]),
          mx: '$2',
          aspectRatio: 1,
          ...(Platform.OS !== 'web' && {
            height: height * useResponsiveValue([0.3]),
          }),
        }}
      />
    </Pressable>
  )
}

const PurpleTableImage = () => {
  return (
    <MotifiedImage
      source={require('app/assets/images/luckydraw/table.png')}
      from={{ scale: 0 }}
      animate={{ scale: 1 }}
      delay={200}
      sx={{
        width: '100%',
        height: '25%',
        aspectRatio: 600 / 320,
        zIndex: 1,
        position: 'absolute',
        bottom: '-30%',
      }}
    />
  )
}

const LuckySpinWheelFrame = ({ width, height }) => {
  return (
    <MotifiedImage
      source={require('app/assets/images/luckydraw/frame.png')}
      sx={{
        zIndex: 1,
        position: 'absolute',
        width: width * useResponsiveValue([0.89, 0.89, 0.92]),
        //   height: height * useResponsiveValue([0.41, 0.41, 0.38]),
        aspectRatio: 1,
        ...(Platform.OS !== 'web' && {
          height: height * useResponsiveValue([0.41, 0.41, 0.38]),
        }),
      }}
    />
  )
}

const LuckySpinLogo = () => {
  return (
    <MotifiedImage
      source={require('app/assets/images/luckydraw/logo.png')}
      from={{ scale: 0 }}
      animate={{ scale: 1 }}
      delay={200}
      sx={{
        width: '25%',
        height: '25%',
        aspectRatio: 1,
        zIndex: 5,
        position: 'absolute',
      }}
    />
  )
}

const WinningAnimationFrame = () => {
  return (
    <MotifiedImage
      source={require('app/assets/images/luckydraw/win_prize_frame.png')}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      delay={100}
      transition={{ type: 'timing', duration: 100, loop: true }}
      sx={{
        width: '32%',
        height: '42%',
        aspectRatio: 69 / 90,
        zIndex: 3,
        position: 'absolute',
        top: '3%',
      }}
    />
  )
}

export default LuckyDrawModal
