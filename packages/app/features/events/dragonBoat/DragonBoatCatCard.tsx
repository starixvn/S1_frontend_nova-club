import { Image, Pressable, View } from 'dripsy'
import { MotiImage, MotiView, useAnimationState } from 'moti'
import { StyleSheet } from 'react-native'
import { SoundController } from './useSoundController'

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
            }
          }}
        >
          <MotiView state={closed} style={styles.shape}>
            <Image
              style={{
                width: 90,
                height: 90,
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
                  height: 90,
                  width: 90,
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
                  height: 95,
                  width: 95,
                  position: 'absolute',
                  left: -3,
                  top: -3,
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
