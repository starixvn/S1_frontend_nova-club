import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Text, View, useDripsyTheme } from 'dripsy'
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
}: {
  tags: string[]
  size?: GAME_TAG_SIZE
  gpc?: string
}) => {
  const hasTags = tags?.includes('hot') || tags?.includes('new')
  const isNew = tags?.includes('new')
  const fs = size === GAME_TAG_SIZE.lg ? [10] : [7]
  const { theme } = useDripsyTheme()

  const isMystery = gpc === 'SABA' || gpc === 'O789'

  const MysteryIcon = useMemo(
    () => (
      <div
        className="btn-anim enlarge-anim"
        style={{
          position: 'absolute',
          right: 0,
          paddingInline: 4,
          paddingBlock: 2,
          borderRadius: 5,
          top: -8,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/ic-saba-mystery.png`}
          width={size === GAME_TAG_SIZE.lg ? 28 : 18}
          height={size === GAME_TAG_SIZE.lg ? 28 : 18}
          alt="mystery"
        />
      </div>
    ),
    [gpc]
  )

  return isMystery ? (
    <>{MysteryIcon}</>
  ) : hasTags ? (
    <div
      className="btn btn-anim enlarge-anim"
      style={{
        position: 'absolute',
        right: 0,
        backgroundColor: isNew ? theme?.colors?.$secondary?.[500] : 'red',
        paddingInline: 4,
        paddingBlock: 2,
        borderRadius: 5,
        top: -5,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
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
    </div>
  ) : null
}

export default GameTagsLabel
