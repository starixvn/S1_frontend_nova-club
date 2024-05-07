import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import DisabledOverlay from 'app/components/DisabledOverlay'
import GameTagsLabel, { GAME_TAG_SIZE } from 'app/components/game/GameTagsLabel'
import useLocalization from 'app/provider/localization'
import { Pressable, Row, Text, View, styled, useDripsyTheme } from 'dripsy'
import { ComponentProps, memo } from 'react'
import { SolitoImage } from 'solito/image'
import { RewardGameKeyMap } from 'utils/rewards'

const StyledContainer = styled(View)({
  flexGrow: 0,
  flexShrink: 1,
  flexBasis: ['30%'],
})

const StyledPressable = styled(Pressable)({
  borderRadius: 20,
  overflow: 'hidden',
})

export enum RewardGameTag {
  NEW = 'new',
  HOT = 'hot',
}

interface GameCardProps extends ComponentProps<typeof Pressable> {
  src: string
  cost: number
  gameName: string
  gameKey: RewardGameKeyMap
  tag?: string
  containerProps?: ComponentProps<typeof View>
  onOpeningGame: (key: RewardGameKeyMap) => void
  disabled?: boolean
}

const RewardCard = (props: GameCardProps) => {
  const { t } = useLocalization()
  const {
    src,
    cost,
    gameName,
    tag,
    containerProps,
    onOpeningGame,
    gameKey,
    disabled = false,
    ...pressableProps
  } = props

  const {
    theme: { colors },
  } = useDripsyTheme()

  const getTagColor = (tag: string) => {
    if (!colors) {
      return '#000000'
    }

    const color = {
      [RewardGameTag.NEW]: '$secondary.500',
      [RewardGameTag.HOT]: '$error',
    }

    return color[tag] ?? color[RewardGameTag.NEW]
  }

  return (
    <StyledContainer {...containerProps}>
      <StyledPressable
        sx={{ width: '100%', aspectRatio: 1 }}
        style={({ pressed }) => ({
          opacity: pressed ? 0.7 : 1,
        })}
        onPress={() => {
          onOpeningGame(gameKey)
        }}
        disabled={disabled}
        {...pressableProps}
      >
        <SolitoImage src={src} fill contentFit="cover" alt="" />
        <Row
          sx={{
            mt: 'auto',
            backgroundColor: '$error',
            py: [3, '$1'],
            alignItems: 'center',
            justifyContent: 'center',
            gap: '$2',
          }}
        >
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/coin.png`}
            width={20}
            height={20}
            // fill
            contentFit="contain"
            alt=""
          />

          <Text sx={{ fontWeight: 'bold' }}>{cost}</Text>
        </Row>

        {disabled && <DisabledOverlay />}
      </StyledPressable>

      <Text
        sx={{
          textTransform: 'uppercase',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: [12, 14, 16],
          pt: '$2',
        }}
      >
        {gameName}
      </Text>
      <GameTagsLabel tags={tag} size={GAME_TAG_SIZE.lg} />
    </StyledContainer>
  )
}

export default memo(RewardCard)
