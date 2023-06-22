import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Pressable, SxProp, Text, View, styled } from 'dripsy'
import React, { memo, useRef, useState, useTransition } from 'react'
import { GestureResponderEvent, PressableProps, StyleSheet } from 'react-native'
import { SolitoImage } from 'solito/image'
import SkeletonPlaceholder from '../SkeletonPlaceholder'
import { LaunchGamePayload } from 'app/store/gameLauncher.slice'
import { LaunchGame } from 'app/features/game/GameLauncher'

export interface GameCardProps
  extends PressableProps,
    PressableProps,
    LaunchGamePayload {
  name?: string
  width?: number | number[] | string | string[]
  height?: number | number[]
  sx?: SxProp
}

const GameCard = ({
  name,
  image,
  width,
  height,
  sx,
  onPress,
  ...rest
}: GameCardProps) => {
  const lastLoadedRef = useRef(image)
  const [loaded, setLoaded] = useState(false)
  const [isPending, startTransition] = useTransition()

  if (lastLoadedRef.current != image) {
    lastLoadedRef.current = image
    startTransition(() => setLoaded(false))
  }
  const imageSrc =
    image?.startsWith('/_next') || image?.startsWith('http')
      ? image
      : `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${image}`

  function onClick(e: GestureResponderEvent) {
    if (onPress) onPress(e)
    else {
      LaunchGame({
        gameCode: rest.gameCode,
        gameName: rest.gameName,
        gameType: rest.gameType,
        image: imageSrc,
        providerCode: rest.providerCode,
      })
    }
  }

  return (
    <Root
      sx={{
        width,
        height,
        ...sx,
      }}
      onPress={onClick}
      {...rest}
    >
      <View sx={{ width: '100%', height: '100%', position: 'relative' }}>
        <SkeletonPlaceholder show={!loaded} width={'100%'} height="100%">
          <SolitoImage
            unoptimized
            onLoadingComplete={() => {
              startTransition(() => setLoaded(true))
            }}
            fill
            // to supporess warning, will be ignored since unoptimized is true
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            alt={name ?? ''}
            resizeMode="cover"
            key={imageSrc}
            src={imageSrc}
          />
        </SkeletonPlaceholder>
      </View>
      {name && (
        <LabelContainer>
          <Text
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: [12, 14],
            }}
          >
            {name}
          </Text>
        </LabelContainer>
      )}
    </Root>
  )
}

export default memo(GameCard)

const Root = styled(Pressable)({
  borderRadius: 10,
  position: 'relative',
  aspectRatio: 1,
  overflow: 'hidden',
})
const LabelContainer = styled(View)({
  borderTopWidth: StyleSheet.hairlineWidth,
  borderTopColor: '$primary.100',
  bg: `rgba(50, 50, 90, 0.8)`,
  position: 'absolute',
  bottom: 0,
  width: '100%',
  py: [6, '$2'],
})
