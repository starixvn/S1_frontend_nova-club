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
import { REFERRAL_DOMAIN } from '@env'

const LuckyDrawModal = ({ modal: { closeModal } }) => {
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const { push } = useRouter()
  const { closeModal: closeTargetModal } = useModal()

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
      // showAlert(message)
    }
  }

  const debounceSpin = useCallback(debounce(spin, 500), [])
  const triggerDebounceSpin = () => {
    setLoading(true)
    debounceSpin()
  }

  const handleClose = () => {
    closeTargetModal('LuckyDrawModal')
    // closeTargetModal('RegisterModal')
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
        sx={{
          width: Math.min(275, fullWidth * 0.9),
          height: Math.min(275, fullWidth * 0.9),
          zIndex: 2,
        }}
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
      <ScrollView
        bounces={false}
        contentContainerSx={{
          alignItems: 'center',
          pl: left,
          pr: right,
          mr: 'auto',
          ml: 'auto',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <MotifiedImage
          style={{
            width: fullWidth,
            height: fullWidth,
            position: 'absolute',
          }}
          from={{ scale: 0 }}
          animate={{ scale: 1 }}
          resizeMode="contain"
          source={require('app/assets/images/luckydraw/coins.png')}
        />
        <View
          sx={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            height: Platform.OS !== 'web' ? height : 'auto',
          }}
        >
          <View
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              sx={{
                width: Math.min(400, fullWidth),
                height: Math.min(400, fullWidth),
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MotifiedImage
                source={require('app/assets/images/luckydraw/lucky-spin.png')}
                from={{ scale: 0 }}
                animate={{ scale: 1 }}
                delay={200}
                sx={{
                  zIndex: 5,
                  position: 'absolute',
                  width: Math.min(300, fullWidth),
                  height: Math.min(50, fullWidth),
                  top: -30,
                }}
              />
              <MotifiedImage
                source={require('app/assets/images/luckydraw/pin.png')}
                from={{ scale: 0 }}
                animate={{ scale: 1 }}
                delay={200}
                sx={{
                  width: Math.min(20, fullWidth * 0.1),
                  height: Math.min(30, fullWidth * 0.18),
                  zIndex: 10,
                  position: 'absolute',
                  top: 47,
                }}
              />
              {startAnimateWinPrizeFrame && <WinningAnimationFrame />}
              <LuckySpinLogo width={fullWidth} />
              <PurpleTableImage width={fullWidth} />

              {Platform.OS === 'web' && (
                <DownloadAppButton
                  height={height}
                  width={fullWidth}
                  windowWidth={windowWidth}
                  onPress={handleClose}
                />
              )}
              {MemoizedWheel}
              <LuckySpinWheelFrame width={fullWidth} />
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
                          translateY: width * 0.33 + shinyHeight * 0.33,
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
                  width: Math.min(60, fullWidth * 0.2),
                  height: Math.min(60, fullWidth * 0.2),
                  zIndex: 10,
                  position: 'absolute',
                  bottom: -10,
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
  const { t } = useLocalization()
  return (
    <Pressable
      sx={{
        position: 'absolute',
        bottom: -5,
        zIndex: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => {
        if (windowWidth < 992) {
          Linking.openURL(REFERRAL_DOMAIN)
        } else {
          push('/download')
          onPress()
        }
      }}
    >
      <View sx={{ flexDirection: 'row', mx: 2, alignItems: 'center' }}>
        <MotiText
          from={{ scale: 0.85, backgroundColor: theme.colors?.$primary[300] }}
          animate={{ scale: 1, backgroundColor: theme.colors?.$primary[500] }}
          transition={{ type: 'timing', duration: 500, loop: true }}
          style={{
            fontWeight: 'bold',
            fontSize: 12,
            textTransform: 'uppercase',
            color: 'white',
            borderRadius: 10,
            fontFamily: AvertaStd.Regular.name,
            padding: 6,
            marginRight: 4,
          }}
        >
          {t('common.download')}
        </MotiText>
        <Text
          sx={{
            fontWeight: 'bold',
            fontSize: 12,
            textTransform: 'uppercase',
          }}
        >
          {t('event.luckyDraw.appSpin')}
        </Text>
      </View>

      <MotifiedImage
        source={require('app/assets/images/luckydraw/download.gif')}
        sx={{
          width: width * useResponsiveValue([0.03]),
          ml: '$2',
          aspectRatio: 1,
        }}
      />
    </Pressable>
  )
}

const PurpleTableImage = ({ width }) => {
  return (
    <MotifiedImage
      source={require('app/assets/images/luckydraw/table.png')}
      from={{ scale: 0 }}
      animate={{ scale: 1 }}
      delay={200}
      sx={{
        width: Math.min(250, width),
        height: Math.min(100, width),
        zIndex: 1,
        position: 'absolute',
        bottom: -20,
      }}
    />
  )
}

const LuckySpinWheelFrame = ({ width }) => {
  return (
    <MotifiedImage
      source={require('app/assets/images/luckydraw/frame.png')}
      sx={{
        zIndex: 1,
        position: 'absolute',
        width: Math.min(300, width),
        height: Math.min(300, width),
        aspectRatio: 1,
      }}
    />
  )
}

const LuckySpinLogo = ({ width }: { width: number }) => {
  return (
    <MotifiedImage
      source={require('app/assets/images/luckydraw/logo.png')}
      from={{ scale: 0 }}
      animate={{ scale: 1 }}
      delay={200}
      sx={{
        width: Math.min(60, width * 0.25),
        height: Math.min(60, width * 0.25),
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
        width: '24%',
        height: '32%',
        aspectRatio: 69 / 90,
        zIndex: 3,
        position: 'absolute',
        top: '14%',
      }}
    />
  )
}

export default LuckyDrawModal
