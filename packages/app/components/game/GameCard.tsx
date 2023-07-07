import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import {
  Pressable,
  SxProp,
  Text,
  View,
  styled,
  useResponsiveValue,
  useSx,
} from 'dripsy'
import React, { memo, useMemo, useRef, useState, useTransition } from 'react'
import { GestureResponderEvent, PressableProps, StyleSheet } from 'react-native'
import { SolitoImage } from 'solito/image'
import SkeletonPlaceholder from '../SkeletonPlaceholder'
import { LaunchGamePayload } from 'app/store/gameLauncher.slice'
import { LaunchGame } from 'app/features/game/GameLauncher'
import { MotiPressable } from 'moti/interactions'

export interface GameCardProps extends PressableProps, LaunchGamePayload {
  displayName?: string
  width?: number | number[] | string | string[]
  height?: number | number[]
  sx?: SxProp
  containerSx?: SxProp
  absoluteName?: boolean
}

const GameCard = ({
  displayName,
  img,
  width,
  height,
  sx,
  containerSx,
  onPress,
  absoluteName,
  ...rest
}: GameCardProps) => {
  const lastLoadedRef = useRef(img)
  const [loaded, setLoaded] = useState(false)
  const [isPending, startTransition] = useTransition()
  const desktopMode = useResponsiveValue([false, false, false, true])
  const ss = useSx()

  if (lastLoadedRef.current != img) {
    lastLoadedRef.current = img
    startTransition(() => setLoaded(false))
  }
  const imageSrc =
    img?.startsWith('/_next') || img?.startsWith('http')
      ? img
      : `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${img}`

  function onClick(e: GestureResponderEvent) {
    if (onPress) onPress(e)
    else {
      LaunchGame({
        gc: rest.gc,
        gpc: rest.gpc,
        gtc: rest.gtc,
        xImg: rest.xImg,
        tags: rest.tags,
        gdc_cat: rest.gdc_cat,
        params: rest.params,
        name: rest.name,
        img,
        desktopMode,
      })
    }
  }

  return (
    <Root
      containerStyle={ss({
        width,
        ...sx,
      })}
      animate={useMemo(
        () =>
          ({ hovered, pressed }) => {
            'worklet'

            return {
              translateY: hovered ? -5 : 0,
            }
          },
        []
      )}
      onPress={onClick}
      {...rest}
    >
      <View
        sx={{
          height,
          width: '100%',
          aspectRatio: 1,
          position: 'relative',
          borderRadius: 10,
          overflow: 'hidden',
          ...containerSx,
        }}
      >
        <SolitoImage
          unoptimized
          onLoadingComplete={() => {
            startTransition(() => setLoaded(true))
          }}
          fill
          // to supporess warning, will be ignored since unoptimized is true
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          alt={displayName ?? ''}
          resizeMode="cover"
          key={imageSrc}
          src={imageSrc}
        />
        <View sx={{ ...StyleSheet.absoluteFillObject }}>
          <SkeletonPlaceholder show={!loaded} width="100%" height="100%" />
        </View>
      </View>
      {displayName && (
        <LabelContainer absolute={absoluteName}>
          <Text
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: [12, 14],
            }}
          >
            {displayName}
          </Text>
        </LabelContainer>
      )}
    </Root>
  )
}

export default memo(GameCard)

const Root = styled(MotiPressable)({
  position: 'relative',
  // aspectRatio: 1,
  overflow: 'hidden',
})
const LabelContainer = styled(View)(({ absolute }: { absolute?: boolean }) =>
  absolute
    ? {
        width: '100%',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '$primary.100',
        bg: `rgba(50, 50, 90, 0.8)`,
        position: 'absolute',
        bottom: 0,
        py: [6, '$2'],
      }
    : {
        pt: [6, '$2'],
        width: '100%',
      }
)
