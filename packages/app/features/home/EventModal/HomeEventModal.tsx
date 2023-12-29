import Icon from 'app/components/Icon'
import IconButton from 'app/components/IconButton'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'
import { ModalStackParams } from 'app/provider/modal'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { MotiPressable } from 'moti/interactions'
import React, {
  FC,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { ModalComponentProp } from 'react-native-modalfy'
import { interpolate } from 'react-native-reanimated'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import { SolitoImage } from 'solito/image'

type HomeEventModalContextValue = {
  dimension: {
    width: number
    height: number
  }
}

const HomeEventModalContext = createContext<HomeEventModalContextValue>({
  dimension: {
    width: 0,
    height: 0,
  },
})

export function useHomeEventModal() {
  return useContext(HomeEventModalContext)
}

export interface HomeEventModalData {
  tnc: () => void
  content: FC<any>
}

export default function HomeEventModal({
  modal: { closeModal, getParam, currentModal },
}: ModalComponentProp<ModalStackParams, void, 'HomeEventModal'>) {
  const { width, height } = useWindowDimensions()
  const data = getParam('data', [])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPressDisabled, setPressDisabled] = useState(false)
  const { top, bottom } = useSafeArea()
  const safeHeight = height - top - bottom
  const itemWidth = Math.min(650, width * 0.8)
  //   const itemHeight = Math.min(650, safeHeight * 0.8)
  const carouselRef = useRef<ICarouselInstance>(null)
  const currentSelection = data[activeIndex]
  //   const selectedIndex = carouselRef.current?.getCurrentIndex() ?? 0
  const centerOffset = width / 2 - itemWidth / 2

  const animationStyle = useCallback(
    (value: number) => {
      'worklet'

      const opacity = interpolate(value, [-1, 0, 1], [0.7, 1, 0.7])
      const itemGap = interpolate(value, [-1, 0, 1], [-20, 0, 20])

      const translateX =
        interpolate(value, [-1, 0, 1], [-itemWidth, 0, itemWidth]) +
        centerOffset -
        itemGap

      const scale = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [0.8, 0.85, 1, 0.85, 0.8]
      )

      return {
        opacity,
        transform: [
          {
            translateX,
          },
          { scale },
        ],
      }
    },
    [centerOffset]
  )

  const contextState = useMemo(() => {
    return {
      dimension: {
        width: itemWidth,
        height: safeHeight,
      },
    }
  }, [itemWidth, safeHeight])

  function openCurrentTnc() {
    data[activeIndex]?.tnc && data[activeIndex]?.tnc()
    closeModal()
  }

  const isModalOnBackground = currentModal !== 'HomeEventModal'

  return (
    <HomeEventModalContext.Provider value={contextState}>
      <View
        pointerEvents={isModalOnBackground ? 'none' : 'auto'}
        sx={{
          flex: 1,
          paddingTop: top,
          paddingBottom: bottom,
          justifyContent: 'center',
        }}
      >
        {/* <Row
          sx={{
            height: 100,
            width: itemWidth,
            //   bg: 'green',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          {assets.map((x, i) => {
            return (
              <TabItem
                key={i}
                src={x}
                isSelected={i === activeIndex}
                onPress={() => setActiveIndex(i)}
              />
            )
          })}
        </Row> */}

        <View
          sx={{
            width: itemWidth,
            alignSelf: 'center',
            position: 'absolute',
            zIndex: 10,
          }}
        >
          <NavigationButtons
            isFirst={activeIndex === 0}
            isLast={activeIndex === data.length - 1}
            containerWidth={itemWidth}
            carouselRef={carouselRef}
          />
          <View sx={{ marginTop: -height * 0.4 }}>
            <View sx={{ position: 'absolute', top: 0, right: 0 }}>
              <IconButton onPress={() => closeModal()} name="cross" size={30} />
            </View>
            {currentSelection && !!currentSelection.tnc && (
              <View sx={{ position: 'absolute', top: 0, left: 0 }}>
                <IconButton
                  onPress={() => openCurrentTnc()}
                  name="tnc"
                  size={30}
                />
              </View>
            )}
          </View>
        </View>
        {data.length > 0 && (
          <Carousel
            ref={carouselRef}
            width={itemWidth}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
              onBegan: () => setPressDisabled(true),
              onEnded: () => setPressDisabled(false),
            }}
            onSnapToItem={(index) => {
              setActiveIndex(index)
            }}
            style={{
              width,
              height: safeHeight,
              alignItems: 'center',
            }}
            loop={false}
            data={data}
            renderItem={({ item, index }) => {
              const Content = item.content

              return (
                <View
                  pointerEvents={
                    isModalOnBackground ||
                    activeIndex !== index ||
                    (isPressDisabled && Platform.OS === 'web')
                      ? 'none'
                      : 'auto'
                  }
                  style={{
                    width: itemWidth,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Content />
                </View>
              )
            }}
            customAnimation={animationStyle}
          />
        )}
      </View>
    </HomeEventModalContext.Provider>
  )
}

function NavigationButtons({
  carouselRef,
  containerWidth,
  isFirst,
  isLast,
}: {
  carouselRef: RefObject<ICarouselInstance>
  containerWidth: number
  isFirst: boolean
  isLast: boolean
}) {
  const navIconSize = Math.min(containerWidth * 0.12, 60)

  return (
    <AnimatePresence>
      {!isLast && (
        <NavButton
          key={'next'}
          onPress={() => {
            carouselRef.current?.next()
          }}
          style={{
            left: containerWidth,
          }}
          icon={'next'}
          size={navIconSize}
        />
      )}
      {!isFirst && (
        <NavButton
          key={'back'}
          onPress={() => carouselRef.current?.prev()}
          style={{
            right: containerWidth,
          }}
          icon={'back'}
          size={navIconSize}
        />
      )}
    </AnimatePresence>
  )
}

const NavButton = ({ icon, size, style, onPress }) => {
  return (
    <MotiPressable
      containerStyle={{
        position: 'absolute',
        transform: [{ scale: 1 }],
        zIndex: 10,
        ...style,
      }}
      transition={{ type: 'timing' }}
      from={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      onPress={onPress}
    >
      <Icon name={icon} size={size} />
    </MotiPressable>
  )
}
