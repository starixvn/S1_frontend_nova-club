import useAlert from 'app/hooks/useAlert'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useOrientation from 'app/hooks/useOrientation'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ScrollView, View } from 'dripsy'
import { MotiView } from 'moti'
import { useCallback, useMemo, useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { Easing } from 'react-native-reanimated'
import { useLuckySpinMutation, usePlayerProfileQuery } from 'services/playerApi'
import { MotifiedImage } from '../common/Image'
import { Button } from '../form/Button'
import IconButton from '../form/IconButton'

const LuckyDrawModal = ({ modal: { getParam } }) => {
  const { closeModal } = useModal()
  const { t } = useLocalization()
  const { data } = usePlayerProfileQuery()
  const totalSpin = getParam('totalSpin', 0)

  const { width, height } = useContainerDimension()

  const { showAlert } = useAlert()

  const [spinLuckyWheel] = useLuckySpinMutation()

  const [targetIndex, setTargetIndex] = useState(0)
  const [spinBalance, setSpinBalance] = useState(0)
  const [startAnimate, setStartAnimate] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [loopCount, setLoopCount] = useState(1)

  const canSpin = totalSpin > spinBalance

  const { isLandscape } = useOrientation()

  const spin = async () => {
    setLoopCount((prev) => prev + 20)
    setStartAnimate(true)
    setLoading(true)

    const { data, success } = await spinLuckyWheel()
      .unwrap()
      .catch((error) => {
        setLoading(false)
        showAlert(error)
        return error
      })

    if (success) {
      setTargetIndex(handleSpinMapping(data.code))
      setSpinBalance((prev) => prev + 1)

      setTimeout(() => {
        showAlert({
          message: data.note,
          onClose: handleClose,
          persistent: true,
        })
        setLoading(false)
      }, 5500)
    }
  }

  const handleClose = () => {
    if (totalSpin - (spinBalance + 1) === 0) closeModal('LuckyDrawModal')
  }

  const handleSpinMapping = (code: number) => {
    switch (code) {
      case 1:
        return 3
      case 2:
        return 1
      case 3:
        return 5
      default:
        return 3
    }
  }

  function onResultSpinned() {}

  const shinyWidth = isLandscape ? height * 0.21 : width * 0.21
  const shinyHeight = shinyWidth / (130 / 35)

  const { top } = useSafeArea()

  const MemoizedWheel = useMemo(() => {
    return (
      <MotifiedImage
        from={{ rotate: 0 }}
        animate={{
          rotate: getRadianByIndex(targetIndex, loopCount),
        }}
        onDidAnimate={onResultSpinned}
        transition={{
          duration: startAnimate ? 5000 : 0,
          type: 'timing',
          easing: Easing.bezier(0, 0.62, 0.19, 1.01),
        }}
        source={require('app/assets/images/luckydraw/prizes.png')}
        sx={{ width: '90%', height: '90%' }}
      />
    )
  }, [spinBalance])

  return (
    <View
      sx={{
        bg: 'rgba(18, 55, 88, 0.6)',
        width,
        height,
        position: 'relative',
        top: 0,
      }}
    >
      <MotifiedImage
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        from={{ scale: 0 }}
        animate={{ scale: 1 }}
        // transition={{ type: 'timing' }}
        source={require('app/assets/images/luckydraw/coins.png')}
      />
      <ScrollView
        bounces={false}
        sx={{ width: '100%', height: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <View
          sx={{
            flexDirection: isLandscape ? 'row' : 'column',
            flex: 1,
            width: '100%',
          }}
        >
          <View
            sx={{
              mt: top + height * 0.05,
              flex: isLandscape ? 0.45 : 0,
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '20%',
            }}
          >
            <MotifiedImage
              source={require('app/assets/images/luckydraw/lucky-spin.png')}
              from={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              delay={200}
              sx={{
                width: '50%',
                aspectRatio: 447 / 210,
                // mt: isLandscape ? 0 : '30%',
              }}
            />
            {isLandscape && (
              <Button
                onPress={spin}
                loading={isLoading}
                disabled={!canSpin}
                sx={{ mt: '10%' }}
              >
                <Button.Label>SPIN NOW</Button.Label>
              </Button>
            )}
          </View>
          <View
            sx={{
              flex: isLandscape ? 0.55 : 0,
              alignItems: isLandscape ? 'flex-start' : 'center',
              justifyContent: Platform.OS === 'web' ? 'flex-start' : 'center',
              paddingTop: Platform.OS === 'web' ? '100%' : 0,
            }}
          >
            <View
              sx={{
                width: isLandscape ? 'auto' : '90%',
                height: isLandscape ? '90%' : 'auto',
                aspectRatio: 1,
                position: Platform.OS === 'web' ? 'absolute' : 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                mb: isLandscape ? 0 : '10%',
                top: 0,
              }}
            >
              {/* <MotifiedImage
                from={{ rotate: 0 }}
                animate={{
                  rotate: getRadianByIndex(targetIndex),
                }}
                onDidAnimate={onResultSpinned}
                transition={{
                  duration: startAnimate ? 5000 : 0,
                  type: 'timing',
                  easing: Easing.bezier(0, 0.62, 0.19, 1.01),
                }}
                source={require('app/assets/images/luckydraw/prizes.png')}
                sx={{ width: '90%', height: '90%' }}
              /> */}
              {MemoizedWheel}
              <MotifiedImage
                source={require('app/assets/images/luckydraw/frame.png')}
                sx={{ ...StyleSheet.absoluteFillObject }}
              />
              {Platform.OS !== 'web' && (
                <MotiView
                  animate={shinyAnimationState}
                  transition={{
                    loop: true,
                    repeatReverse: false,
                  }}
                  style={{ position: 'absolute' }}
                >
                  <MotifiedImage
                    source={require('app/assets/images/luckydraw/shine-curve.png')}
                    sx={{
                      width: shinyWidth,
                      height: shinyHeight,
                      transform: [
                        {
                          translateY:
                            (isLandscape ? height * -0.45 : width * -0.4) +
                            shinyHeight * 0.5,
                        },
                      ],
                    }}
                  />
                </MotiView>
              )}
            </View>
            {!isLandscape && (
              <Button
                sx={{ mb: '$10' }}
                onPress={spin}
                loading={isLoading}
                disabled={!canSpin}
              >
                <Button.Label>{t('common.spin')}</Button.Label>
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
      <View sx={{ position: 'absolute', top: '8%', right: '10%' }}>
        <IconButton
          onPress={() => {
            closeModal('LuckyDrawModal')
          }}
          name="cross"
          color="white"
          sx={{
            right: 0,
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
    { type: 'timing', value: -Math.PI * 0.45 },
    { type: 'timing', value: -Math.PI * 0.45, delay: 1000 },
    { type: 'timing', value: Math.PI * 2.2, duration: 2000 },
  ],
  opacity: [
    { type: 'timing', value: 0 },
    { type: 'timing', value: 0.9, delay: 1000 },
    { type: 'timing', value: 0, duration: 2000 },
  ],
}

function getRadianByIndex(
  index,
  loopCount = Math.floor(Math.random() * 20) + 10
) {
  const numberOfItems = 6
  const degreePerItem = 360 / numberOfItems
  const offset = -degreePerItem * Math.random() + degreePerItem / 2
  const deg = (loopCount - 1) * 360 + index * degreePerItem + offset
  const rad = -(deg * Math.PI) / 180
  return Platform.OS === 'web' ? `${rad}rad` : rad
}

export default LuckyDrawModal
