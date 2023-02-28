import { Gradient } from '@dripsy/gradient'
import Image from 'app/components/common/Image'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { useAppSelector } from 'app/provider/redux/store'
import { Action, ActionType, getAction } from 'app/utils/actionGenerator'
import { View } from 'dripsy'
import shuffle from 'lodash/shuffle'
import times from 'lodash/times'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { CNYRollResult } from 'services/eventApi.type'
import { useRouter } from 'solito/router'
import SlotMachineFrame from './SlotMachineFrame'
import sample from 'lodash/sample'
import { SoundController } from './useSoundController'

const SPIN_ITEM_LENGTH = 10
// Please make sure COL & MULTIPLIER having the same length as SPIN_ITEM_LENGTH
const COL = [
  require('app/assets/images/events/spinMania/numbers/0.png'),
  require('app/assets/images/events/spinMania/numbers/1.png'),
  require('app/assets/images/events/spinMania/numbers/2.png'),
  require('app/assets/images/events/spinMania/numbers/3.png'),
  require('app/assets/images/events/spinMania/numbers/4.png'),
  require('app/assets/images/events/spinMania/numbers/5.png'),
  require('app/assets/images/events/spinMania/numbers/6.png'),
  require('app/assets/images/events/spinMania/numbers/7.png'),
  require('app/assets/images/events/spinMania/numbers/8.png'),
  require('app/assets/images/events/spinMania/numbers/9.png'),
]
const MULTIPLIER = [
  require('app/assets/images/events/spinMania/multiplier/gold.png'),
  require('app/assets/images/events/spinMania/multiplier/green.png'),
  require('app/assets/images/events/spinMania/multiplier/red.png'),
  require('app/assets/images/events/spinMania/multiplier/gold.png'),
  require('app/assets/images/events/spinMania/multiplier/green.png'),
  require('app/assets/images/events/spinMania/multiplier/red.png'),
  require('app/assets/images/events/spinMania/multiplier/gold.png'),
  require('app/assets/images/events/spinMania/multiplier/green.png'),
  require('app/assets/images/events/spinMania/multiplier/red.png'),
  require('app/assets/images/events/spinMania/multiplier/gold.png'),
]

const GOLD_INDEXES = [0, 3, 6, 9] // x3
const RED_INDEXES = [2, 5, 8] // x2
const GREEN_INDEXES = [1, 4, 7] // x1
const COL_POSITION = ['9%', '29%', '49.5%']
const EXTRA_ITEM = 2

const tncData: Action = {
  type: ActionType.INTERNAL_REDIRECT,
  payload: {
    uri: '/event/spin-mania-tnc',
    params: {
      locale: 'vn',
    },
  },
}
export interface SlotMachineRollProps {
  results?: CNYRollResult[]
  onRoundComplete: (index: number, next: (currentIndex: number) => void) => void
  onResultComplete: () => void
  soundController: SoundController
}

const SlotMachineRoll = ({
  results,
  onRoundComplete,
  onResultComplete,
  soundController,
}: SlotMachineRollProps) => {
  const [currentRound, setCurrentRound] = useState(-1)
  const [currentRoundCompleteCount, setCurrentRoundCompleteCount] = useState(0)
  const { push } = useRouter()
  const locale = useAppSelector((s) => s.setting.locale)
  const { makeContextualHref } = useContextualRouting()

  useEffect(() => {
    // Reset / start off when new Result passed in
    if (results && results.length > 0) {
      setCurrentRound(0)
    }
  }, [results])

  const targetResults = useMemo(() => {
    let answers = [0, 0, 0, 0] // 4 columns
    if (results && currentRound <= results.length - 1) {
      const roundDetail = results[currentRound]
      if (roundDetail) {
        const { amount } = roundDetail
        const amountInt = Number(amount)
        if (!isNaN(amountInt)) {
          let removeThoudsand = amountInt / 1000
          let possibleMultiplier = [1]
          if (removeThoudsand % 2 === 0) {
            possibleMultiplier.push(2)
          }

          if (removeThoudsand % 3 === 0) {
            possibleMultiplier.push(3)
          }

          const multiplier = sample(possibleMultiplier) ?? 1
          let multiplierIndex: number = 1
          switch (multiplier) {
            case 1: {
              multiplierIndex = sample(GREEN_INDEXES) ?? 1
              break
            }
            case 2: {
              multiplierIndex = sample(RED_INDEXES) ?? 1
              break
            }
            case 3: {
              multiplierIndex = sample(GOLD_INDEXES) ?? 1
              break
            }
            default: {
              multiplierIndex = 1 // default to green x1
            }
          }

          const offset = (currentRound + 1) * (12 * SPIN_ITEM_LENGTH)
          const numberSequence = Array.from(
            ('000' + removeThoudsand / multiplier).slice(-3), // enforce 3 digits
            Number
          ).map((x) => x + offset)

          soundController.play('spin')
          return [...numberSequence, multiplierIndex + offset]
        } else console.log('amount is NaN')
      }
    }

    return answers
  }, [currentRound])

  useEffect(() => {
    // On all columns finish animated
    if (currentRoundCompleteCount >= 4) {
      soundController.stop('spin')
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

  const wrapperWidth = Math.min(0.85 * width, 450)
  const colSize = wrapperWidth * 0.16

  const onColumnComplete = useCallback(() => {
    setCurrentRoundCompleteCount((prev) => prev + 1)
  }, [])

  const handleTncButton = useCallback(() => {
    const action = getAction(tncData)
    console.log(action)
    action({ push, locale, makeContextualHref })
  }, [locale])

  const yellowShading = [
    'rgba(255,255,255,0.0)',
    'rgba(251,230,96,0.8)',
    'rgba(251,230,96,0.7)',
    'rgba(251,230,96,0.3)',
    'rgba(255,255,255,0.0)',
  ]

  return (
    <View style={{}}>
      <View
        // pointerEvents="none"
        style={{
          position: 'relative',
          // borderWidth: 1,
          width: wrapperWidth,
          aspectRatio: 766 / 518,
        }}
      >
        <SlotMachineFrame />
        <TouchableOpacity
          onPress={() => handleTncButton()}
          style={{
            width: '20%',
            height: '20%',
            position: 'absolute',
            right: '10%',
            top: '18%',
            zIndex: 5,
          }}
        >
          <Image
            source={require('app/assets/images/events/spinMania/tnc-btn.png')}
            resizeMode="contain"
            style={{ width: '100%', height: '100%', zIndex: 1 }}
          />
        </TouchableOpacity>
        <View
          pointerEvents="none"
          sx={{
            // borderWidth: 1,
            width: '93%',
            height: '50%',
            top: '42%',
            left: '2%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {COL_POSITION.map((c, i) => {
            return (
              <SlotMachineColumn
                key={c}
                index={i}
                color={'#bf7101'}
                itemSize={colSize}
                value={targetResults ? targetResults[i] : 0}
                style={{
                  left: c,
                }}
                onComplete={onColumnComplete}
                shading={yellowShading}
                options={COL}
                duration={(COL_POSITION.length - i) * 1500 + 2000}
              />
            )
          })}
          <SlotMachineColumn
            index={4}
            key={'72%'}
            color={'#2a2a2a'}
            itemSize={colSize}
            value={targetResults ? targetResults[3] : 0}
            style={{
              left: '72%',
              top: '26%',
            }}
            delay={300}
            onComplete={() => {
              soundController.play('multiplier')
              onColumnComplete()
            }}
            shading={[
              'rgba(255,255,255,0.0)',
              'rgba(255,255,255,0.8)',
              'rgba(255,255,255,0.7)',
              'rgba(255,255,255,0.3)',
              'rgba(255,255,255,0.0)',
            ]}
            options={MULTIPLIER}
            duration={7500}
          />
        </View>
      </View>
    </View>
  )
}

const SlotMachineItem = ({ image, animValue, positionIndex, size, color }) => {
  const animatedStyles = useAnimatedStyle(() => {
    const normalizeValue = animValue.value % SPIN_ITEM_LENGTH
    const dif = positionIndex - normalizeValue
    const inversedUnit = SPIN_ITEM_LENGTH - positionIndex + normalizeValue
    const isInverse = normalizeValue < EXTRA_ITEM && inversedUnit <= EXTRA_ITEM

    const vector = isInverse
      ? -inversedUnit
      : dif < -EXTRA_ITEM
      ? SPIN_ITEM_LENGTH + dif
      : positionIndex - normalizeValue
    return {
      top: vector * size,
    }
  })

  return (
    <Animated.View
      style={[
        {
          backgroundColor: color,
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
        resizeMode="contain"
        source={image}
        style={[
          {
            // borderWidth: 1,
            height: '80%',
            aspectRatio: 83 / 92,
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
  color = '#bf7101',
  shading,
  options,
  duration = 4000,
  ...rest
}) => {
  const sharedVal = useSharedValue(0)

  useEffect(() => {
    console.log('value', value)
    if (value > 0)
      sharedVal.value = withDelay(
        delay,
        withTiming(
          value,
          {
            duration,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
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
        backgroundColor: color,
        width: '22%',
        height: '100%',
        ...style,
      }}
      {...rest}
    >
      <View
        style={[
          {
            borderWidth: 1,
            position: 'relative',
          },
        ]}
      >
        {shading && (
          <Gradient
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            colors={shading}
            sx={{
              marginTop: '-20%',
              height: 40,
              position: 'absolute',
              zIndex: 2,
              width: '100%',
              alignSelf: 'center',
            }}
          />
        )}
        {options.map((c, i) => {
          return (
            <SlotMachineItem
              key={i}
              image={c}
              size={itemSize}
              animValue={sharedVal}
              positionIndex={i}
              color={color}
            />
          )
        })}
      </View>
    </View>
  )
}

export default SlotMachineRoll
