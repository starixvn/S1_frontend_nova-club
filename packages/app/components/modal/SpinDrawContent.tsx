import useOrientation from 'app/hooks/useOrientation'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Pressable, View, useDripsyTheme } from 'dripsy'
import debounce from 'lodash/debounce'
import { MotiText, MotiView } from 'moti'
import { useCallback, useMemo, useState } from 'react'
import { Platform } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { Easing } from 'react-native-reanimated'
import { useRouter } from 'solito/router'
import IconButton from '../IconButton'
import { MotifiedImage } from '../common/Image'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Montserrat from 'app/assets/fonts/Montserrat'

const SpinDrawContent = ({
  balance,
  srcPrize,
  targetIndex,
  startAnimate,
  loopCount,
  startAnimateWinPrizeFrame,
  isLoading,
  setLoading,
  onSpin,
  onClose,
  onTnc,
  dimension,
  showActions = false,
}) => {
  const { t } = useLocalization()
  const { isLandscape } = useOrientation()
  const token = useAppSelector((s) => s.auth.info?.token)
  const { width = 0, height = 0 } = dimension

  const [isButtonPressed, setIsButtonPressed] = useState(false)

  const canSpin = balance > 0

  const debounceSpin = useCallback(debounce(onSpin, 500), [])

  const triggerDebounceSpin = () => {
    setLoading(true)
    debounceSpin()
  }

  const handleClose = () => {
    onClose()
  }

  const handleNavigateTnc = () => {
    onTnc()
  }

  const shinyWidth = isLandscape ? height * 0.21 : width * 0.12
  const shinyHeight = shinyWidth / (120 / 25)

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
        source={{ uri: srcPrize }}
        sx={{
          width: Math.min(275, width * 0.9),
          height: Math.min(275, width * 0.9),
          zIndex: 2,
        }}
      />
    )
  }, [balance, width])

  return (
    <View
      sx={{
        width,
        height,
        position: 'relative',
        borderRadius: 30,
      }}
    >
      <MotifiedImage
        style={{
          minWidth: Math.min(width * 1.3, 650),
          alignSelf: 'center',
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        from={{ scale: 0 }}
        animate={{ scale: 1 }}
        resizeMode="contain"
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/luckydraw/coins.png`,
        }}
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
            height: 400,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            sx={{
              height: 400,
              width: Math.min(400, width),
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MotifiedImage
              source={{
                uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/luckydraw/lucky-spin.png`,
              }}
              from={{ scale: 0 }}
              animate={{ scale: 1 }}
              delay={200}
              sx={{
                zIndex: 5,
                position: 'absolute',
                width: Math.min(300, width),
                height: 50,
                top: height * -0.05,
              }}
            />
            <MotifiedImage
              source={{
                uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/luckydraw/pin.png`,
              }}
              from={{ scale: 0 }}
              animate={{ scale: 1 }}
              delay={200}
              sx={{
                width: Math.min(20, width * 0.1),
                height: Math.min(30, width * 0.18),
                zIndex: 10,
                position: 'absolute',
                top: 40,
              }}
            />
            {startAnimateWinPrizeFrame && <WinningAnimationFrame />}
            <LuckySpinLogo width={width} />
            <PurpleTableImage width={width} />

            {/* {Platform.OS === 'web' && (
                <RegisterToSpinButton
                  height={height}
                  width={fullWidth}
                  windowWidth={windowWidth}
                  onPress={handleClose}
                />
              )} */}
            {MemoizedWheel}
            <LuckySpinWheelFrame width={width} />
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
                  source={{
                    uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/luckydraw/shine-curve.png`,
                  }}
                  sx={{
                    zIndex: 10,
                    width: shinyWidth,
                    height: shinyHeight,
                    transform: [
                      {
                        translateY: width * 0.41 + shinyHeight * 0.5,
                      },
                    ],
                  }}
                />
              </MotiView>
            )}
          </View>

          {token && canSpin && (
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
                width: Math.min(60, width * 0.2),
                height: Math.min(60, width * 0.2),
                zIndex: 10,
                position: 'absolute',
                bottom: -10,
              }}
            >
              <MotifiedImage
                source={{
                  uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/luckydraw/btnSpin.png`,
                }}
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
          {!token && (
            <HintButton
              height={height}
              width={width}
              windowWidth={width}
              onPress={handleClose}
              hintText={t('event.luckyDraw.registerSpin')}
            />
          )}
        </View>
      </View>
      {showActions && (
        <>
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
        </>
      )}
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

interface HintButtonProps {
  windowWidth: number
  onPress: () => void
  width: number
  height: number
  hintText: string
}

const HintButton = ({
  windowWidth,
  onPress,
  width,
  height,
  hintText,
}: HintButtonProps) => {
  const { push } = useRouter()
  const { theme } = useDripsyTheme()
  const { t } = useLocalization()
  const { openModal } = useModal()
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
        // closeModal('RegisterModal')
        // if (windowWidth < 992) {
        //   push('/auth/register/?t=member')
        //   onPress()
        // } else {
        //   openModal('RegisterModal')
        //   onPress()
        // }
      }}
    >
      <View sx={{ flexDirection: 'row', mx: 2, alignItems: 'center' }}>
        <MotiText
          from={{ scale: 0.85, backgroundColor: theme.colors?.$primary[300] }}
          animate={{ scale: 1, backgroundColor: theme.colors?.$primary[500] }}
          transition={{ type: 'timing', duration: 500, loop: true }}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            textTransform: 'uppercase',
            color: 'white',
            borderRadius: 10,
            fontFamily: Montserrat.Regular.name,
            padding: 6,
            marginRight: 4,
          }}
        >
          {hintText}
        </MotiText>
      </View>
    </Pressable>
  )
}

const PurpleTableImage = ({ width }) => {
  return (
    <MotifiedImage
      source={{
        uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/luckydraw/table.png`,
      }}
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
      source={{
        uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/luckydraw/frame.png`,
      }}
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
      source={{
        uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/luckydraw/logo.png`,
      }}
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
      source={{
        uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/luckydraw/win_prize_frame.png`,
      }}
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

export default SpinDrawContent
