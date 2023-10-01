import Image from 'app/components/common/Image'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useAppSelector } from 'app/provider/redux/store'
import { Action, ActionType, getAction } from 'app/utils/actionGenerator'
import { View } from 'dripsy'
import shuffle from 'lodash/shuffle'
import times from 'lodash/times'
import { useCallback, useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated'
import { TicketSpinResult } from 'services/eventApi.type'
import { useRouter } from 'solito/router'
import bat from '../../../assets/images/events/halloween/icons/icon-bat.png'
import pumpkin from '../../../assets/images/events/halloween/icons/icon-pumpkin.png'
import broom from '../../../assets/images/events/halloween/icons/icon-broom.png'
import grave from '../../../assets/images/events/halloween/icons/icon-grave.png'
import hat from '../../../assets/images/events/halloween/icons/icon-hat.png'
import liquid from '../../../assets/images/events/halloween/icons/icon-liquid.png'
import poison from '../../../assets/images/events/halloween/icons/icon-poison.png'
import spider from '../../../assets/images/events/halloween/icons/icon-spider.png'
import { useSoundPlayback } from './audioUtils'

const COL = [pumpkin, bat, grave, liquid, hat, poison, broom, spider]

const EXTRA_ITEM = 2

const tncData: Action = {
  type: ActionType.INTERNAL_REDIRECT,
  payload: {
    uri: '/event/halloween-tnc',
  },
}
export interface SlotMachineRollProps {
  results?: TicketSpinResult[]
  onRoundComplete: (index: number, next: (currentIndex: number) => void) => void
  onResultComplete: () => void
}

const SlotMachineRoll = ({
  results,
  onRoundComplete,
  onResultComplete,
}: SlotMachineRollProps) => {
  const [currentRound, setCurrentRound] = useState(-1)
  const [targetResults, setTargetResults] = useState<number[]>([0, 0, 0])
  const [currentRoundCompleteCount, setCurrentRoundCompleteCount] = useState(0)
  const { push } = useRouter()
  const locale = useAppSelector((s) => s.setting.locale)
  const roundPlayedRef = useRef<number>(0)
  const [hitPlayback, hitPlaybackDispose] = useSoundPlayback('hit')
  // const { makeContextualHref } = useContextualRouting()
  useEffect(() => {
    // Reset / start off when new Result passed in
    if (results && results.length > 0) {
      setCurrentRound(0)
    }

    return () => {
      hitPlaybackDispose()
    }
  }, [results])

  useEffect(() => {
    // Trigger next round
    if (results && results.length > 0) {
      const roundDetail = results[currentRound]
      if (roundDetail) {
        const { code } = roundDetail
        const codeInt = Number(code)

        let columnIndexWithCat: number[] = []
        if (!isNaN(codeInt)) {
          columnIndexWithCat = shuffle([0, 1, 2]).splice(0, codeInt - 1)
        }

        const offset =
          roundPlayedRef.current * (10 * COL.length) + COL.length * 2

        let answers = times(3, (index) =>
          columnIndexWithCat.includes(index)
            ? 0 + offset
            : Math.floor(Math.random() * (COL.length - 1) + 1) + offset
        )

        setTargetResults(answers)
      }
    }
  }, [currentRound])

  useEffect(() => {
    // On 3 columns animated
    if (currentRoundCompleteCount >= 3) {
      onRoundComplete(currentRound, () => {
        roundPlayedRef.current++

        if (results && currentRound < results.length - 1) {
          setCurrentRound((prev) => prev + 1)
        } else {
          setCurrentRound(-1)
          onResultComplete && onResultComplete()
        }
        setCurrentRoundCompleteCount(0)
      })
    }
  }, [currentRoundCompleteCount])

  const { width } = useContainerDimension()

  const wrapperWidth = Math.min(0.85 * width, 400)
  const onColumnComplete = useCallback(() => {
    setCurrentRoundCompleteCount((prev) => prev + 1)
    hitPlayback()
  }, [])

  const handleTncButton = useCallback(() => {
    const action = getAction(tncData)({ push, locale })
    // action({ push, locale, makeContextualHref })
  }, [locale])

  return (
    <View>
      <View
        // pointerEvents="none"
        style={{
          position: 'relative',
          // borderWidth: 1,
          width: wrapperWidth,
          aspectRatio: 659 / 400,
        }}
      >
        <Image
          alt="spin-frame"
          source={require('../../../assets/images/events/halloween/Spin-frame.png')}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            // right: '-3%',
            top: '-5%',
            zIndex: 3,
          }}
        />
        <Image
          alt="spin-frame"
          source={require('../../../assets/images/events/halloween/Spin-bg.png')}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            // right: '-3%',
            top: '-5%',
            zIndex: 1,
          }}
        />
        <TouchableOpacity
          onPress={() => handleTncButton()}
          style={{
            width: '30%',
            height: '30%',
            position: 'absolute',
            right: '2%',
            top: '0%',
            zIndex: 4,
          }}
        >
          <Image
            source={require('../../../assets/images/events/halloween/info-button.png')}
            resizeMode="contain"
            style={{ width: '100%', height: '100%', zIndex: 1 }}
          />
        </TouchableOpacity>
        <View
          pointerEvents="none"
          sx={{
            // borderWidth: 1,
            width: '93%',
            height: '70%',
            top: '10%',
            left: '3%',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          <SlotMachineColumn
            itemSize={wrapperWidth * 0.22}
            value={targetResults ? targetResults[0] : 0}
            style={{
              left: '11.5%',
            }}
            onComplete={onColumnComplete}
          />
          <SlotMachineColumn
            itemSize={wrapperWidth * 0.22}
            value={targetResults ? targetResults[1] : 0}
            style={{
              left: '37%',
            }}
            delay={300}
            onComplete={onColumnComplete}
          />
          <SlotMachineColumn
            itemSize={wrapperWidth * 0.22}
            value={targetResults ? targetResults[2] : 0}
            style={{
              left: '63%',
            }}
            delay={500}
            onComplete={onColumnComplete}
          />
        </View>
      </View>
    </View>
  )
}

const SlotMachineItem = ({ image, animValue, positionIndex, size }) => {
  const animatedStyles = useAnimatedStyle(() => {
    const normalizeValue = animValue.value % COL.length
    const dif = positionIndex - normalizeValue
    const inversedUnit = COL.length - positionIndex + normalizeValue
    const isInverse = normalizeValue < EXTRA_ITEM && inversedUnit <= EXTRA_ITEM

    const vector = isInverse
      ? -inversedUnit
      : dif < -EXTRA_ITEM
      ? COL.length + dif
      : positionIndex - normalizeValue
    return {
      top: vector * size,
    }
  }, [animValue])

  return (
    <Animated.View
      style={[
        {
          // backgroundColor: '#ebe9da',
          position: 'absolute',
          height: size,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
        animatedStyles,
      ]}
    >
      <Image
        source={image}
        style={[
          {
            //   borderWidth: 1,
            height: '75%',
            aspectRatio: 1,
            //   transform: [
            //     // {
            //     //   translateY: i === 9 ? 30 : i === 11 ? -30 : 0,
            //     // },
            //     {
            //       rotateX: `${i == 11 || i == 9 ? Math.PI * 0.25 : 0}rad`,
            //     },
            //   ],
          },
        ]}
      />
    </Animated.View>
  )
}

const SlotMachineColumn = ({
  value = 0,
  style,
  delay = 0,
  itemSize,
  onComplete,
  ...rest
}) => {
  const sharedVal = useSharedValue(0)

  useEffect(() => {
    if (value > 0) {
      console.log('vluiee', value)

      sharedVal.value = withDelay(
        delay,
        withSpring(
          value,
          {
            // damping: 7.5,
            // mass: 4,
            // stiffness: 5,
            damping: 18 + Math.random() * 10,
            mass: 6,
            stiffness: 20,
            //   duration: 10000,
            //   easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          },
          (completed, b) => {
            if (completed) {
              runOnJS(onComplete)()
            }
          }
        )
      )
    }
  }, [value])

  return (
    <View
      style={{
        position: 'absolute',
        top: '23%',
        // backgroundColor: '#ebe9da',
        width: '26%',
        height: '100%',
        ...style,
      }}
      {...rest}
    >
      <View
        style={[
          {
            position: 'relative',
          },
        ]}
      >
        {COL.map((c, i) => {
          return (
            <SlotMachineItem
              key={i}
              image={c}
              size={itemSize}
              animValue={sharedVal}
              positionIndex={i}
            />
          )
        })}
      </View>
    </View>
  )
}

export default SlotMachineRoll
