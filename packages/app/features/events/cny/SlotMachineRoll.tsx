import Image from 'app/components/common/Image'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { View } from 'dripsy'
import shuffle from 'lodash/shuffle'
import times from 'lodash/times'
import { useCallback, useEffect, useState } from 'react'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated'
import { CNYRollResult } from 'services/eventApi.type'
import cat from '../../../assets/images/events/cny/zodiac/cat.png'
import dragon from '../../../assets/images/events/cny/zodiac/dragon.png'
import snake from '../../../assets/images/events/cny/zodiac/snake.png'
import tiger from '../../../assets/images/events/cny/zodiac/tiger.png'
const COL = [
  cat,
  dragon,
  snake,
  tiger,
  snake,
  dragon,
  snake,
  tiger,
  snake,
  dragon,
  snake,
  tiger,
]

const EXTRA_ITEM = 2

export interface SlotMachineRollProps {
  results?: CNYRollResult[]
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

  useEffect(() => {
    // Reset / start off when new Result passed in
    if (results && results.length > 0) {
      setCurrentRound(0)
    }
  }, [results])

  useEffect(() => {
    // Trigger next round
    if (results && currentRound <= results.length - 1) {
      const roundDetail = results[currentRound]
      if (roundDetail) {
        const { code } = roundDetail
        const codeInt = Number(code)
        let columnIndexWithCat: number[] = []
        if (!isNaN(codeInt) && codeInt > 0 && codeInt < 4) {
          columnIndexWithCat = shuffle([0, 1, 2]).splice(0, codeInt)
        }

        const offset = currentRound * (10 * COL.length) + COL.length * 2

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
        if (results && currentRound < results.length - 1) {
          setCurrentRound((prev) => prev + 1)
        } else {
          onResultComplete && onResultComplete()
        }
        setCurrentRoundCompleteCount(0)
      })
    }
  }, [currentRoundCompleteCount])

  const { width } = useContainerDimension()

  const wrapperWidth = Math.min(0.9 * width, 450)
  const onColumnComplete = useCallback(() => {
    setCurrentRoundCompleteCount((prev) => prev + 1)
  }, [])

  return (
    <View style={{}}>
      <View
        pointerEvents="none"
        style={{
          position: 'relative',
          // borderWidth: 1,
          width: wrapperWidth,
          aspectRatio: 659 / 386,
        }}
      >
        <Image
          source={require('../../../assets/images/events/cny/slot-machine.png')}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            right: '-3%',
            top: '-22%',
            zIndex: 1,
          }}
        />
        <View
          pointerEvents="none"
          sx={{
            // borderWidth: 1,
            width: '93%',
            height: '69%',
            top: '8%',
            left: '3%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <SlotMachineColumn
            itemSize={wrapperWidth * 0.16}
            value={targetResults ? targetResults[0] : 0}
            style={{
              left: '12.5%',
            }}
            onComplete={onColumnComplete}
          />
          <SlotMachineColumn
            itemSize={wrapperWidth * 0.16}
            value={targetResults ? targetResults[1] : 0}
            style={{
              left: '39%',
            }}
            delay={300}
            onComplete={onColumnComplete}
          />
          <SlotMachineColumn
            itemSize={wrapperWidth * 0.16}
            value={targetResults ? targetResults[2] : 0}
            style={{
              left: '66%',
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
  })

  return (
    <Animated.View
      style={[
        {
          backgroundColor: '#ebe9da',
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
            height: '90%',
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
    if (value > 0)
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
  }, [value])

  return (
    <View
      style={{
        position: 'absolute',
        top: '28%',
        backgroundColor: '#ebe9da',
        width: '22%',
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
