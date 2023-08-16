import SkeletonPlaceholder from 'app/components/SkeletonPlaceholder'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
import useLocalization from 'app/provider/localization'
import { Pressable, Text, View, styled } from 'dripsy'
import { Video, ResizeMode } from 'expo-av'
import React, { useEffect, useRef, useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { SolitoImage } from 'solito/image'

export default function GameGridSectionItem({ type, src, title, ...rest }) {
  const [isFetching, setIsFetching] = useState(true)
  const [videoStatus, setVideoStatus] = useState(true)
  const { t } = useLocalization()

  const videoRef = useRef<Video>(null)

  const isFocused = useIsFocused()
  useEffect(() => {
    if (!isFocused) {
      videoRef?.current?.stopAsync()
      return
    }

    try {
      if (!videoStatus && videoRef?.current?.playAsync)
        videoRef?.current?.playAsync()
    } catch (error) {
      console.log(
        '🚀 ~ file: GridSectionItem.tsx:28 ~ useEffect ~ error:',
        error
      )
    }
  }, [videoStatus, isFocused])

  return (
    <Pressable {...rest}>
      <View sx={{ borderRadius: 10, overflow: 'hidden', height: '100%', bg: "$primary.300" }}>
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
              height: '100%',
            }}
            videoStyle={{
              position: Platform.OS === 'web' ? 'relative' : 'absolute',
            }}
            resizeMode={ResizeMode.COVER}
            source={{ uri: src }}
            useNativeControls={false}
            onPlaybackStatusUpdate={(val) =>
              videoStatus !== val?.isPlaying && setVideoStatus(val?.isPlaying)
            }
          />
        ) : (
          <SolitoImage fill src={src} contentFit="cover" alt={title} />
        )}
        {title && (
          <LabelContainer>
            <Text
              sx={{
                mt: FONT_TOP_OFFSET,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: [12, 14],
              }}
            >
              {t(title)}
            </Text>
          </LabelContainer>
        )}
      </View>
    </Pressable>
  )
}

const LabelContainer = styled(View)({
  borderTopWidth: StyleSheet.hairlineWidth,
  borderTopColor: '$primary.100',
  bg: `rgba(50, 50, 90, 0.8)`,
  position: 'absolute',
  bottom: 0,
  width: '100%',
  py: '$1',
})
