import { Pressable, View } from 'dripsy'
import { MotiImage, MotiView, useAnimationState } from 'moti'
import { StyleSheet, useWindowDimensions } from 'react-native'
import useSoundController, { SoundController } from './useSoundController'

const COIN_IMG = require('../../../assets/images/events/summerCat/coin.png')

interface SummerCatCardProps {
  value: number
  img: any
  prizeImg?: any
  resetCard: boolean
  disabled: boolean
  flipSound: SoundController
  onPress: () => void
}

const SummerCatCard = ({
  value,
  img,
  prizeImg,
  resetCard,
  disabled,
  flipSound,
  onPress,
}: SummerCatCardProps) => {
  const { height, width } = useWindowDimensions()
  const closed = useAnimationState({
    from: {
      opacity: 1,
      rotateY: '360deg',
    },
    end: {
      opacity: 0,
      rotateY: '180deg',
    },
  })

  const opened = useAnimationState({
    from: {
      opacity: 0,
    },
    end: {
      opacity: 1,
    },
  })

  return (
    <>
      <View
        sx={{
          padding: 10,
        }}
      >
        <Pressable
          onPress={() => {
            if (!disabled && !resetCard) {
              flipSound.play('flip')
              closed.transitionTo('end')
              opened.transitionTo('end')
              onPress()
              // setAnimate(true)
            }
          }}
        >
          <MotiView state={closed} style={styles.shape}>
            <MotiImage
              style={{ aspectRatio: 1, width: Math.min(90, width * 0.2) }}
              resizeMode={'contain'}
              source={COIN_IMG}
            />
            {/* <Text sx={{ textAlign: 'center' }}>Closed</Text> */}
          </MotiView>
        </Pressable>

        <MotiView state={opened} style={[styles.shape, styles.shape2]}>
          <View>
            <MotiImage
              animate={{
                scale: resetCard && prizeImg ? [1.2, 1] : undefined,
              }}
              from={{ scale: 1 }}
              transition={{
                loop: resetCard && prizeImg ? true : false,
              }}
              style={{
                aspectRatio: 10 / 9,
                width: Math.min(90, width * 0.2),
              }}
              resizeMode={'contain'}
              source={img}
            />
            <MotiImage
              animate={{
                scale: resetCard && prizeImg ? [1.8, 1.55] : undefined,
              }}
              from={{ scale: 1.55 }}
              transition={{
                loop: resetCard && prizeImg ? true : false,
              }}
              style={{
                aspectRatio: 25 / 22,
                width: Math.min(100, width * 0.225),
                position: 'absolute',
                left: -5,
                top: -4,
                zIndex: -100,
                opacity: resetCard ? 1 : 0,
              }}
              resizeMode={'contain'}
              source={prizeImg}
            />
          </View>
          {/* <Text sx={{ textAlign: 'center' }}>{value}</Text> */}
        </MotiView>
      </View>
    </>
  )
}

export default SummerCatCard

const styles = StyleSheet.create({
  shape: {
    justifyContent: 'center',
    borderRadius: 25,
  },
  shape2: {
    position: 'absolute',
    zIndex: -100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'cyan',
  },
})
