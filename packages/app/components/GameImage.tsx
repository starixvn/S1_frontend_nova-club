import { MotiView, useAnimationState } from 'moti'
import Image from './common/Image'
import Frame from '../assets/images/games/games_frame.png'
import { memo, useState } from 'react'
import SkeletonPlaceholder from './skeleton/SkeletonPlaceholder'

const GameImage = ({ frame = false, width, height, image }) => {
  //   const [loaded, setLoaded] = useState(false)
  const animationState = useAnimationState({
    from: {
      scale: 0.8,
      opacity: 0.2,
      //   translateY: Math.random() * 40 + 50,
    },
    loaded: {
      scale: 1,
      opacity: 1,
      //   translateY: 0,
    },
  })

  return (
    <MotiView
      delay={Math.random() * 200}
      state={animationState}
      transition={{ damping: 3, mass: 0.3 }}
    >
      <Image
        onLoad={() => {
          animationState.transitionTo('loaded')
        }}
        resizeMode={'contain'} // using cover will have JILI's frame's title covered, recommended using "cover" but must fix the jili image dimension first
        source={{ uri: image }}
        style={{
          width,
          height,
          borderRadius: 10,
        }}
      />
      {frame && (
        <Image
          source={Frame}
          resizeMode={'stretch'}
          style={{
            position: 'absolute',
            zIndex: 1,
            width,
            height,
            borderRadius: 4,
          }}
        />
      )}
    </MotiView>
  )
}

export default memo(GameImage)
