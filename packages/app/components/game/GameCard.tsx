import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { LaunchGame } from 'app/features/game/GameLauncher'
import { LaunchGamePayload } from 'app/store/gameLauncher.slice'
import { ActivityIndicator, SxProp, Text, View, styled, useSx } from 'dripsy'
import { MotiPressable } from 'moti/interactions'
import React, {
  memo,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  GestureResponderEvent,
  Platform,
  PressableProps,
  StyleSheet,
} from 'react-native'
import { SolitoImage } from 'solito/image'

import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppSelector } from 'app/provider/redux/store'
import { AnimatePresence, MotiView } from 'moti'
import GameBottomRebateLabel from './GameBottomRebateLabel'
import GameCardDualVersionButton from './GameCardDualVersionButton'
import GameTagsLabel, { GAME_TAG_SIZE } from './GameTagsLabel'
import GameRebateLabel from './GameRebateLabel'

export interface GameCardProps extends PressableProps, LaunchGamePayload {
  displayName?: string
  width?: number | number[] | string | string[]
  height?: number | number[]
  sx?: SxProp
  rebateText?: string
  containerSx?: SxProp
  absoluteName?: boolean
  showRebate?: boolean
  rebateTop?: boolean
  gameTagSize?: GAME_TAG_SIZE
  isDualVersion?: boolean
  isFullCard?: boolean
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
  rebateText,
  rebateTop = false,
  showRebate = false,
  gameTagSize = GAME_TAG_SIZE.lg,
  isDualVersion = false,
  ...rest
}: GameCardProps) => {
  const lastLoadedRef = useRef(img)
  const [loaded, setLoaded] = useState(false)
  const desktopMode = useIsDesktop()
  const ss = useSx()
  const { tags, gpc, isFullCard } = rest

  const lang = useAppSelector((s) => s.setting.locale)

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

  function handleDesktopMode() {
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
      desktopMode: true,
    })
  }

  const [isRebateLoading, setIsRebateLoading] = useState(
    rebateText === undefined
  )
  useEffect(() => {
    if (rebateText) {
      setIsRebateLoading(false)
    }
  }, [rebateText])
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
          pointerEvents: 'none',
          ...containerSx,
        }}
      >
        <SolitoImage
          unoptimized
          onLoadingComplete={() => {
            startTransition(() => setLoaded(true))
          }}
          fill
          loading="lazy"
          alt={displayName ?? ''}
          contentFit="contain"
          key={imageSrc}
          src={imageSrc}
        />
        {Platform.OS !== 'android' && (
          <AnimatePresence>
            {!loaded && (
              <MotiView
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: 'rgba(150,150,255,0.3)',
                }}
              />
            )}
          </AnimatePresence>
        )}
      </View>
      <GameTagsLabel
        tags={tags ?? []}
        size={gameTagSize}
        gpc={gpc}
        isFullCard={isFullCard}
      />
      {!!displayName && (
        <Text
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            mt: '$2',
            fontSize: [12, 14],
          }}
        >
          {displayName}
        </Text>
      )}
      {showRebate && (
        <LabelContainer rebateTop={rebateTop}>
          {isRebateLoading ? (
            <ActivityIndicator color={'$primary.100'} />
          ) : (
            <GameRebateLabel key={rebateText} rebateText={rebateText} />
          )}
        </LabelContainer>
      )}
      {isDualVersion && (
        <View
          sx={{
            position: 'absolute',
            width: '100%',
            alignItems: 'flex-end',
            bottom: '$2',
            right: '$2',
          }}
        >
          <GameCardDualVersionButton
            onPressPlayNow={onClick}
            onPressDesktop={handleDesktopMode}
          />
        </View>
      )}

      {/* {showRebate && (
        <View
          sx={{
            position: 'absolute',
            width: '100%',
            backgroundColor: 'rgba(80, 80, 158, 0.7);',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            borderTopWidth: 1,
            borderColor: '$primary.100',
            bottom: 3,
          }}
        >
          {isRebateLoading ? (
            <ActivityIndicator color={'$primary.100'} />
          ) : (
            <GameBottomRebateLabel
              key={rebateText}
              rebateText={rebateText}
              sportName={lang === 'en' ? rest.name?.en : rest.name?.vi}
            />
          )}
        </View>
      )} */}
    </Root>
  )
}

export default memo(GameCard)

const Root = styled(MotiPressable)({
  position: 'relative',
  // aspectRatio: 1,
  // overflow: 'hidden',
})

const LabelContainer = styled(View)(({ rebateTop }: { rebateTop?: boolean }) =>
  rebateTop //Bad Implementation
    ? {
        py: [25, 30, 35, 35, 35],
        width: '100%',
        position: 'absolute',
        top: 0,
        right: 0,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        pr: '$2',
        alignItems: 'center',
      }
    : {
        py: [6],
        width: '100%',
        position: 'absolute',
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        pr: '$2',
        alignItems: 'center',
      }
)
