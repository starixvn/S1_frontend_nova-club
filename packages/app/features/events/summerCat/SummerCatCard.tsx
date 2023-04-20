import { Pressable } from 'dripsy'
import { MotiImage, MotiView, useAnimationState } from 'moti'
import { StyleSheet } from 'react-native'
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

  console.log(prizeImg)

  return (
    <>
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
          <MotiImage style={{ height: 100, width: 100 }} source={COIN_IMG} />
          {/* <Text sx={{ textAlign: 'center' }}>Closed</Text> */}
        </MotiView>

        <MotiView state={opened} style={[styles.shape, styles.shape2]}>
          <>
            <MotiImage
              animate={{ scale: resetCard && prizeImg ? [1.2, 1] : undefined }}
              from={{ scale: 1 }}
              transition={{
                loop: resetCard && prizeImg ? true : false,
              }}
              style={{
                height: 90,
                width: 100,
              }}
              source={img}
            />
            <MotiImage
              animate={{ scale: resetCard && prizeImg ? [1.2, 1] : undefined }}
              from={{ scale: 1 }}
              transition={{
                loop: resetCard && prizeImg ? true : false,
              }}
              style={{
                height: 155,
                width: 170,
                position: 'absolute',
                top: -28,
                left: -35,
                zIndex: -100,
                opacity: resetCard ? 1 : 0,
              }}
              source={prizeImg}
            />
          </>
          {/* <Text sx={{ textAlign: 'center' }}>{value}</Text> */}
        </MotiView>
      </Pressable>
    </>
  )
}

export default SummerCatCard

const styles = StyleSheet.create({
  shape: {
    justifyContent: 'center',
    height: 100,
    width: 100,
    borderRadius: 25,
    margin: 10,
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
