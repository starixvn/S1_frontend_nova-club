import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Text, useDripsyTheme, useResponsiveValue } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import GameTagIconAnimation from './GameTagIconAnimation'
import useLocalization from 'app/provider/localization'

export enum GAME_TAG_SIZE {
  lg = 'lg',
  sm = 'sm',
}

const GameTagsLabel = ({
  tags,
  size = GAME_TAG_SIZE.lg,
  gpc,
  isFullCard = false,
}: {
  tags: string[]
  size?: GAME_TAG_SIZE
  gpc?: string
  isFullCard?: boolean
}) => {
  const { t } = useLocalization()
  const hasTags = tags?.includes('hot') || tags?.includes('new')
  const isNew = tags?.includes('new')
  const fs = size === GAME_TAG_SIZE.lg ? [10] : [7]
  const { theme } = useDripsyTheme()
  const mysteryTop = useResponsiveValue([8, 0, 0, 0, 0, 12, 18])

  const isMystery = gpc === 'SABA' || gpc === 'O789'

  return hasTags || isMystery ? (
    <GameTagIconAnimation
      sx={{
        backgroundColor: isMystery
          ? 'transparent'
          : isNew
          ? theme?.colors?.$secondary?.[500]
          : 'red',
        top: isMystery ? (isFullCard ? -8 : mysteryTop) : -5,
      }}
    >
      {isMystery ? (
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/ic-saba-mystery.png`}
          width={size === GAME_TAG_SIZE.lg ? 22 : 18}
          height={size === GAME_TAG_SIZE.lg ? 22 : 18}
          alt="mystery"
        />
      ) : (
        <Text
          sx={{
            fontWeight: 'bold',
            fontSize: fs,
          }}
        >
          {isNew ? t('game.new').toUpperCase() : 'HOT'}
        </Text>
      )}
    </GameTagIconAnimation>
  ) : null
}

export default GameTagsLabel
