import Image from 'app/components/common/Image'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { View } from 'dripsy'
import { useEffect, useState } from 'react'
import { Button, ScrollView } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated'
import cat from '../../../assets/images/events/cny/cat.png'
import dragon from '../../../assets/images/events/cny/dragon.png'
import snake from '../../../assets/images/events/cny/snake.png'
import tiger from '../../../assets/images/events/cny/tiger.png'
const COL = [
  cat,
  dragon,
  snake,
  tiger,
  cat,
  dragon,
  snake,
  tiger,
  cat,
  dragon,
  snake,
  tiger,
]

const EXTRA_ITEM = 2

const SlotMachineRoll = () => {
  const [dummyValue, setDummyValue] = useState(0)
  const { width } = useContainerDimension()

  const wrapperWidth = Math.min(0.9 * width, 450)

  return (
    <View style={{}}>
      <Button
        title="test121231212331233"
        onPress={() => {
          const a = Math.floor(Math.random() * COL.length + 300)
          console.log('to', a)
          setDummyValue(dummyValue + a)
        }}
        // onPress={() => setDummyValue(dummyValue + 1)}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'relative',
          borderWidth: 1,
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
            borderWidth: 1,
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
            value={dummyValue}
            style={{
              left: '13%',
            }}
          />
          <SlotMachineColumn
            itemSize={wrapperWidth * 0.16}
            value={dummyValue}
            style={{
              left: '40%',
            }}
            delay={300}
          />
          <SlotMachineColumn
            itemSize={wrapperWidth * 0.16}
            value={dummyValue}
            style={{
              left: '66%',
            }}
            delay={500}
          />
        </View>
      </View>
    </View>
  )
}

const SlotMachineItem = ({ image, animValue, positionIndex, size }) => {
  const animatedStyles = useAnimatedStyle(() => {
    const normalizeValue = animValue.value % COL.length // 0
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
          backgroundColor: 'white',
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
            height: '80%',
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
  ...rest
}) => {
  const sharedVal = useSharedValue(0)

  useEffect(() => {
    sharedVal.value = withDelay(
      delay,
      withSpring(value, {
        // damping: 7.5,
        // mass: 4,
        // stiffness: 5,
        damping: 18 + Math.random() * 10,
        mass: 6,
        stiffness: 20,
        //   duration: 10000,
        //   easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    )
  }, [value])

  return (
    <View
      style={{
        position: 'absolute',
        top: '28%',
        backgroundColor: 'white',
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
