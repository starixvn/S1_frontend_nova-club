import { Text, useDripsyTheme } from 'dripsy'
import { MotiView } from 'moti'
import React from 'react'

export enum GAME_TAG_SIZE {
  lg = 'lg',
  sm = 'sm',
}

const GameTagsLabel = ({
  tags,
  size = GAME_TAG_SIZE.lg,
}: {
  tags: string[]
  size?: GAME_TAG_SIZE
}) => {
  const hasTags = tags?.includes('hot') || tags?.includes('new')
  const isNew = tags?.includes('new')
  const fs = size === GAME_TAG_SIZE.lg ? [10] : [7]
  const { theme } = useDripsyTheme()

  return hasTags ? (
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
