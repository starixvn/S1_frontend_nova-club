import Shadow from 'app/components/Shadow'
import { Pressable, Row, Text, View, styled, useDripsyTheme } from 'dripsy'
import { ComponentProps, memo } from 'react'
import { RewardGameKeyMap } from 'utils/rewards'
import { SolitoImage } from 'solito/image'

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
}

const RewardCard = (props: GameCardProps) => {
  const {
    src,
    cost,
    gameName,
    tag,
    containerProps,
    onOpeningGame,
    gameKey,
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
      [RewardGameTag.NEW]: colors.$selectionColor,
      [RewardGameTag.HOT]: colors.$error,
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
            src={require('app/assets/images/rewards/coin.png')}
            width={20}
            height={20}
            // fill
            contentFit="contain"
            alt=""
          />

          <Text sx={{ fontWeight: 'bold' }}>{cost}</Text>
        </Row>

        {!!tag && (
          <Shadow
            offset={[0.5, 1]}
            startColor={'rgba(0,0,0,0.2)'}
            distance={1}
            style={{
              paddingLeft: 16,
              paddingRight: 12,
              paddingVertical: 4,
              borderBottomLeftRadius: 50,
              backgroundColor: getTagColor(tag),
            }}
            containerStyle={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          >
            <Text
              sx={{
                textTransform: 'uppercase',
                textAlign: 'center',
                fontSize: '$0',
                fontWeight: 'bold',
              }}
            >
              {tag}
            </Text>
          </Shadow>
        )}
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
    </StyledContainer>
  )
}

export default memo(RewardCard)
