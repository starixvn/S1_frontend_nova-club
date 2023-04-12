import { MotiImage, MotiView, useAnimationState } from 'moti'
import { memo, useState } from 'react'
import Frame from '../assets/images/games/games_frame.png'
import Image from './common/Image'

const GameImage = ({
  frame = false,
  skeleton = false,
  width,
  height,
  image,
  rewardIcon,
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
  const rewardIconWidth = Math.min(35, width * 0.17)
  const rewardIconHeight = Math.min(33, width * 0.15)

  // useEffect(() => {
  //   if (skeleton) setLoaded(false)
  // }, [image, skeleton])

  return (
    // <SkeletonPlaceholder
    //   show={!loaded && skeleton}
    //   width={width}
    //   height={height}
    // >
    //   {!skeleton || loaded ? (
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
      {/* {rewardIcon && (
        <MotiImage
          from={{ transform: [{ scale: 1 }] }}
          animate={{ transform: [{ scale: 1.1 }] }}
          transition={{
            loop: true,
            duration: 500,
            type: 'timing',
          }}
          resizeMode="contain"
          source={require('../assets/images/games/common/reward-icon.png')}
          style={{
            width: rewardIconWidth,
            height: rewardIconHeight,
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        />
      )} */}
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
    //   ) : (
    //     <Image
    //       onLoad={() => {
    //         setLoaded(true)
    //       }}
    //       source={{ uri: image }}
    //       style={{
    //         width,
    //         height,
    //         opacity: 0,
    //       }}
    //     />
    //   )}
    // </SkeletonPlaceholder>
  )
}

export default memo(GameImage)
