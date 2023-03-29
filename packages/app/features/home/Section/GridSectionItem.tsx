import Image from 'app/components/common/Image'
import SkeletonPlaceholder from 'app/components/skeleton/SkeletonPlaceholder'
import BouncePressable from 'app/pressable/BouncePressable'
import { styled, Text, View } from 'dripsy'
import { Video } from 'expo-av'
import React, { useEffect, useRef, useState } from 'react'

const GridSectionItem = ({
  rowHeight,
  itemSpace,
  type,
  itemSource,
  title,
  width,
  action,
}) => {
  const [isFetching, setIsFetching] = useState(true)
  const [videoStatus, setVideoStatus] = useState(true)

  const videoRef = useRef()

  useEffect(() => {
    try {
      if (!videoStatus) videoRef?.current?.playAsync()
    } catch (error) {
      console.log(
        '🚀 ~ file: GridSectionItem.tsx:28 ~ useEffect ~ error:',
        error
      )
    }
  }, [videoStatus])

  return (
    <BouncePressable onPress={action}>
      <View
        sx={{
          p: itemSpace,
          width,
          position: 'relative',
          height: rowHeight,
        }}
      >
        <SkeletonPlaceholder show={isFetching} radius={10}>
          <>
            {type === 'video' ? (
              <Video
                ref={videoRef}
                onReadyForDisplay={(e) => {
                  setIsFetching(false)
                }}
                isMuted
                isLooping
                shouldPlay
                style={{
                  width: '100%',
                  height: rowHeight - itemSpace * 2,
                  borderRadius: 10,
                  // marginHorizontal: itemSpace,
                }}
                source={itemSource}
                resizeMode="cover"
                useNativeControls={false}
                onPlaybackStatusUpdate={(val) =>
                  videoStatus !== val?.isPlaying &&
                  setVideoStatus(val?.isPlaying)
                }
              />
            ) : (
              <Image
                sx={{
                  width: '100%',
                  height: rowHeight - itemSpace * 2,
                  borderRadius: 10,
                }}
                source={itemSource}
                resizeMode="cover"
              />
            )}
            {title && (
              <StyledTextContainer
                sx={{
                  bottom: 0,
                  left: 0,
                  right: 0,
                  // mx: itemSpace,
                }}
              >
                <Text
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: [14, 16],
                    py: ['$1', '$2'],
                    textAlign: 'center',
                  }}
                >
                  {title}
                </Text>
              </StyledTextContainer>
            )}
          </>
        </SkeletonPlaceholder>
      </View>
    </BouncePressable>
  )
}

const StyledTextContainer = styled(View)({
  position: 'absolute',
  bg: '$secondary',
  alignItems: 'center',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
})

export default GridSectionItem
