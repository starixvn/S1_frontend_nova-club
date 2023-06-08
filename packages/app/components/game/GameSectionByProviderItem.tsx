import {
  Pressable,
  Row,
  ScrollView,
  Text,
  View,
  styled,
  useDripsyTheme,
  useResponsiveValue,
} from 'dripsy'
import union from 'lodash/union'
import React, { useEffect, useMemo, useState } from 'react'
import { Game } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'
import { DripsyGradient } from '../Gradient'
import ShadowButton from '../ShadowButton'

import { Shadow } from 'react-native-shadow-2'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import { ALL } from 'app/utils/constant'
import GameCard from './GameCard'
import { ProviderImageMapping } from 'app/constants/gameAssets'
import { LayoutAnimation } from 'react-native'

const MAX_SHOWN = 12

const width = ['22%', '18%', '15%']
const spaces = ['1.5%', '1%', '0.83%']
function GameSectionByProviderItem({
  gpc,
  games = [],
}: {
  gpc: string
  games: Game[]
}) {
  const [filter, setFilter] = useState(ALL)
  const count = useResponsiveValue([8, 10, MAX_SHOWN])

  const tags = useMemo(() => {
    console.log('changing tags', gpc)
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
          src={ProviderImageMapping[gpc]}
          resizeMode="contain"
          alt={gpc}
        />
      </ProviderIconContainer>
      <GameTypeFilter filters={tags} filter={filter} setFilter={setFilter} />
      <GameList data={filteredGame} />
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

const GameList = ({ data }: { data: Game[] }) => {
  return (
    <Row
      sx={{
        flexWrap: 'wrap',
        px: ['$3'],
        pt: ['$2'],
        pb: '$sectionBottomSpace',
      }}
    >
      {data.map((g, i) => (
        <GameCard
          key={i}
          image={g.img}
          width={width}
          sx={{
            m: spaces,
          }}
        />
      ))}
    </Row>
  )
}

export default GameSectionByProviderItem
