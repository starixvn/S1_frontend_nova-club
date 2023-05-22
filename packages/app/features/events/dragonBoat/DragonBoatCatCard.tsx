import { Image, Pressable, View } from 'dripsy'
import { MotiImage, MotiView, useAnimationState } from 'moti'
import { Platform, StyleSheet, useWindowDimensions } from 'react-native'
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

const DragonBoatCatCard = ({
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
          width: 90,
          height: 90,
        }}
      >
        <Pressable
          onPress={() => {
            if (!disabled && !resetCard) {
              flipSound.play('flip')
              closed.transitionTo('end')
              opened.transitionTo('end')
              onPress()
            }
          }}
        >
          <MotiView state={closed} style={styles.shape}>
            <Image
              style={{
                aspectRatio: Platform.OS === 'web' ? 1 : undefined,
                width: '100%',
                height: '100%',
                // width: Math.min(90, width * 0.2),
                // height: Platform.OS === 'web' ? 'auto' : 90,
              }}
              resizeMode={'contain'}
              source={COIN_IMG}
            />
          </MotiView>
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
                  aspectRatio: 1,
                  height: '100%',
                  width: '100%',
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
                  height: '100%',
                  width: '110%',
                  position: 'absolute',
                  left: -4,
                  top: Platform.OS === 'web' ? -1 : -1,
                  zIndex: -100,
                  opacity: resetCard ? 1 : 0,
                }}
                resizeMode={'contain'}
                source={prizeImg}
              />
            </View>
          </MotiView>
        </Pressable>
      </View>
    </>
  )
}

export default DragonBoatCatCard

const styles = StyleSheet.create({
  shape: {
    justifyContent: 'center',
    borderRadius: 25,
  },
  shape2: {
    position: 'absolute',
    zIndex: -100,
  },
})
