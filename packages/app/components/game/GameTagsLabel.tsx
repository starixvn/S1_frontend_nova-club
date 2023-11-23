import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { useResponsiveValue } from 'dripsy'
import { Text, useDripsyTheme } from 'dripsy'
import { MotiView } from 'moti'
import React, { useMemo } from 'react'
import { SolitoImage } from 'solito/image'

export enum GAME_TAG_SIZE {
  lg = 'lg',
  sm = 'sm',
}

const GameTagsLabel = ({
  tags,
  size = GAME_TAG_SIZE.lg,
  gpc,
  isMysteryIconLower = true,
}: {
  tags: string[]
  size?: GAME_TAG_SIZE
  gpc?: string
  isMysteryIconLower?: boolean
}) => {
  const hasTags = tags?.includes('hot') || tags?.includes('new')
  const isNew = tags?.includes('new')
  const fs = size === GAME_TAG_SIZE.lg ? [10] : [7]
  const { theme } = useDripsyTheme()
  const mysteryTop = useResponsiveValue([8, 0, 0, 0, 0, 12, 18])

  const isMystery = gpc === 'SABA' || gpc === 'O789'

  const MysteryIcon = useMemo(
    () => (
      <MotiView
        style={{
          position: 'absolute',
          right: 0,
          paddingHorizontal: 4,
          paddingVertical: 2,
          borderRadius: 5,
          top: isMysteryIconLower ? mysteryTop : -8,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
        from={{
          scale: 1,
        }}
        animate={{
          scale: 1.25,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 500,
        }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/ic-saba-mystery.png`}
          width={size === GAME_TAG_SIZE.lg ? 22 : 18}
          height={size === GAME_TAG_SIZE.lg ? 22 : 18}
          alt="mystery"
        />
      </MotiView>
    ),
    [gpc]
  )

  return isMystery ? (
    <>{MysteryIcon}</>
  ) : hasTags ? (
    <MotiView
      style={{
        position: 'absolute',
        right: 0,
        backgroundColor: isNew ? theme?.colors?.$secondary?.[500] : 'red',
        paddingHorizontal: 4,
        borderRadius: 5,
        top: -5,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      from={{
        scale: 1,
      }}
      animate={{
        scale: 1.25,
      }}
      transition={{
        loop: true,
        type: 'timing',
        duration: 500,
      }}
    >
      <Text
        sx={{
          fontWeight: 'bold',
          fontSize: fs,
        }}
      >
        {isNew ? 'NEW' : 'HOT'}
      </Text>
    </MotiView>
  ) : null
}

export default GameTagsLabel
