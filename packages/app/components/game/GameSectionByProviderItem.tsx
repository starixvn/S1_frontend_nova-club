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

const MAX_SHOWN = 12
function GameSectionByProviderItem({
  gpc,
  games = [],
}: {
  gpc: string
  games: Game[]
}) {
  const [filter, setFilter] = useState(ALL)
  const height = useResponsiveValue([20, 30])
  const count = useResponsiveValue([8, 10, MAX_SHOWN])

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

  useEffect(() => {
    console.log('@@@@@@@@ mounting')
  }, [])

  return (
    <View>
      <ProviderIconContainer>
        <SolitoImage
          height={height}
          width={100}
          src={require('app/assets/images/game/provider/white/arg.png')}
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
  height: [30, 40],
  width: [130, 160],
  pr: ['2%'],
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
          p: ['$2'],
          flexDirection: 'row',
          // justifyContent: 'center',
          gap: ['$2'],
        }}
      >
        {filters.map((f) => {
          const isActive = filter === f
          return (
            <Pressable
              onPress={() => {
                setFilter(f)
              }}
              key={f}
              sx={{ flex: 1, width: '30%', maxWidth: 110, marginBottom: 2 }}
            >
              <Shadow
                style={{ flex: 1, borderRadius: 30, overflow: 'hidden' }}
                offset={[0, 1]}
                distance={0.5}
                startColor={theme.colors.$primary[100]}
                stretch
              >
                <View
                  sx={{
                    px: '$3',
                    py: 6,
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

const width = ['22%', '18%', '15%']
const spaces = ['1.5%', '1%', '0.83%']
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
