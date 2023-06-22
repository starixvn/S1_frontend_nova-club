import {
  Pressable,
  Row,
  Text,
  View,
  styled,
  useDripsyTheme,
  useResponsiveValue,
} from 'dripsy'
import union from 'lodash/union'
import React, { FC, startTransition, useEffect, useMemo, useState } from 'react'
import { Game } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'
import { DripsyGradient } from '../Gradient'

import { FONT_TOP_OFFSET } from 'app/constants/font'
import { ProviderImageMapping } from 'app/constants/gameAssets'
import { useAppSelector } from 'app/provider/redux/store'
import { ALL } from 'app/utils/constant'
import { GameToLaunchPayload } from 'app/utils/game'
import { Shadow } from 'react-native-shadow-2'
import GameCard from './GameCard'
import GameSectionByProviderItemGameListSummary from './GameSectionByProviderItemGameListSummary'

function GameSectionByProviderItem({
  gpc,
  games = [],
  // GameListComponent = GameSectionByProviderItemGameListSummary,
  bordered = false,
}: {
  bordered: boolean
  gpc: string
  games: Game[]
  // GameListComponent: FC<{ data: Game[] }>
}) {
  const [filter, setFilter] = useState(ALL)
  const count = useResponsiveValue([8, 10, 12, 999, 999])

  useEffect(() => {
    startTransition(() => setFilter(ALL))
  }, [gpc])

  const tags = useMemo(() => {
    return games.reduce(
      (distinctTags, currentGame) => union(distinctTags, currentGame.tags),
      [ALL]
    )
  }, [games])

  const filteredGame = useMemo(() => {
    return (
      filter === ALL ? games : games.filter((g) => g.tags.includes(filter))
    ).slice(0, count)
  }, [count, filter, games])

  return (
    <View nativeID={`gameSection${gpc}`}>
      <ProviderIconContainer>
        <SolitoImage
          height={20}
          width={90}
          src={ProviderImageMapping[gpc?.toUpperCase()]}
          resizeMode="contain"
          alt={gpc}
        />
      </ProviderIconContainer>
      <GameTypeFilter filters={tags} filter={filter} setFilter={setFilter} />
      <GameSectionByProviderItemGameListSummary
        data={filteredGame}
        bordered={bordered}
      />
      {/* <GameListComponent data={filteredGame} /> */}
    </View>
  )
}

const ProviderIconContainer = styled(View)({
  bg: '$primary.100',
  borderTopRightRadius: [15, 20],
  width: [120, 130],
  pr: ['2%'],
  py: ['$2'],
  alignItems: 'flex-end',
  justifyContent: 'center',
})

const GameTypeFilter = ({ filters, filter, setFilter }) => {
  const { theme } = useDripsyTheme()
  return (
    <View sx={{ borderTopWidth: 1, borderColor: '$primary.100' }}>
      <DripsyGradient
        gradient="surface"
        sx={{
          p: '$2',
          flexDirection: 'row',
          // justifyContent: 'center',
          gap: '$2',
        }}
      >
        {filters.map((f) => {
          const isActive = filter === f
          return (
            <Pressable
              onPress={() => {
                setFilter(f)
                // This must be called before `LayoutAnimation.configureNext` in order for the animation to run properly.
                // list.current?.prepareForLayoutAnimationRender()
                // After removing the item, we can start the animation.
                // LayoutAnimation.configureNext(
                //   LayoutAnimation.Presets.easeInEaseOut
                // )
              }}
              key={f}
              sx={{ flex: 1, width: '30%', maxWidth: 100, marginBottom: 2 }}
            >
              <Shadow
                safeRender
                style={{ flex: 1, borderRadius: 30, overflow: 'hidden' }}
                offset={[0, 1]}
                distance={1}
                startColor={theme.colors.$primary[100]}
                stretch
              >
                <View
                  sx={{
                    px: ['$2', '$3'],
                    py: ['$1', 6],
                    bg: '$primary.700',
                  }}
                >
                  <Text
                    numberOfLines={1}
                    sx={{
                      mt: FONT_TOP_OFFSET,
                      fontSize: 11,
                      fontWeight: '900',
                      color: isActive ? 'white' : '$tertiary',
                      textAlign: 'center',
                    }}
                  >
                    {f.toUpperCase()}
                  </Text>
                </View>
              </Shadow>
            </Pressable>
          )
        })}
      </DripsyGradient>
    </View>
  )
}

export default GameSectionByProviderItem
