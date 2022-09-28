import { MotiView, useAnimationState } from 'moti'
import Image from './common/Image'
import Frame from '../assets/images/games/games_frame.png'
import { memo, useEffect, useState } from 'react'
import SkeletonPlaceholder from './skeleton/SkeletonPlaceholder'

const GameImage = ({
  frame = false,
  skeleton = false,
  width,
  height,
  image,
}) => {
  const [loaded, setLoaded] = useState(false)
  const animationState = useAnimationState({
    from: {
      scale: 1.1,
      opacity: 0.2,
      //   translateY: Math.random() * 40 + 50,
    },
    loaded: {
      scale: 1,
      opacity: 1,
      //   translateY: 0,
    },
  })

  useEffect(() => {
    if (skeleton) setLoaded(false)
  }, [image, skeleton])

  return (
    <SkeletonPlaceholder
      show={!loaded && skeleton}
      width={width}
      height={height}
    >
      {!skeleton || loaded ? (
        <MotiView
          // delay={Math.random() * 200}
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
      ) : (
        <Image
          onLoad={() => {
            setLoaded(true)
          }}
          source={{ uri: image }}
          style={{
            width,
            height,
            opacity: 0,
          }}
        />
      )}
    </SkeletonPlaceholder>
  )
}

export default memo(GameImage)
