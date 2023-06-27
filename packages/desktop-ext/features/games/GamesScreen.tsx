import Icon from 'app/components/Icon'
import RecentlyPlayedSection from 'app/features/home/RecentlyPlayedSection'
import { withGameFilterProvider } from 'app/provider/gameFilter/GameFilterProvider'
import { GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'app/utils/constant'
import {
  ActivityIndicator,
  Container,
  Pressable,
  Row,
  Text,
  View,
} from 'dripsy'
import React, { startTransition, useEffect, useState } from 'react'
import { useGameListMultipleQuery } from 'services/gameApi'
import { Game, LatestWinnerType } from 'services/gameApi.type'
import { createParam } from 'solito'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import GameList from './GameList'
import LatestWinnerSection from 'desktop-ext/components/game/LatestWinnerSection'

type Props = {}

type Params = {
  type?: string
}
const { useParam } = createParam<Params>()

function _GamesScreen({}: Props) {
  const { data: games } = useGameListMultipleQuery({
    game_category: [
      GAME_TYPE_CODE.GAMES,
      GAME_TYPE_CODE.FISHING,
      GAME_TYPE_CODE.LOTTERY,
    ],
    gdc_game_category: [GDC_GAME_CATEGORY.CARDGAME],
  })

  const [filteredGames, setFilteredGames] = useState<Game[]>()
  const { push } = useRouter()

  const [type, setType] = useParam('type')
  const route = type ? SUB_ROUTES[type] : undefined
  if (!route) setType(SUB_ROUTES.local.route)

  useEffect(() => {
    if (route && route.filter && games) {
      const filtered = route.filter(games)
      startTransition(() => setFilteredGames(filtered))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, games])

  function onFilterClicked(r, i: number) {
    if (r.filter) setType(r.route)
    else if (r.route) {
      push(r.route)
    }
  }

  return (
    <Container>
      <Row sx={{ gap: '$3', my: '$sectionBottomSpace' }}>
        <View sx={{ flex: 0.8, minHeight: 300 }}>
          <LatestWinnerSection type={LatestWinnerType.Games} />
        </View>
        <View sx={{ flex: 1, minHeight: 300, bg: '$secondary.500' }}></View>
        <View sx={{ flex: 1, minHeight: 300, bg: '$secondary.500' }}></View>
      </Row>
      <RecentlyPlayedSection />
      {filteredGames == null ? (
        <View sx={{ height: '50vh' }}>
          <ActivityIndicator color="$primary.300" size="large" />
        </View>
      ) : (
        <Row sx={{ gap: '$3', position: 'relative' }}>
          <GameTypeFilter onFilterClicked={onFilterClicked} />
          <GameList
            sx={{ flex: 1 }}
            games={filteredGames}
            label={route.label}
          />
        </Row>
      )}
    </Container>
  )
}

const SUB_ROUTES = {
  'keno-lottery': {
    label: 'Keno / Xổ số',
    icon: 'lotto',
    route: 'keno-lottery',
    filter: (games: Game[]) => {
      return games.filter((g) => g.gtc === GAME_TYPE_CODE.LOTTERY)
    },
  },
  fishing: {
    label: 'Bắn Cá',
    icon: 'fishing',
    route: 'fishing',
    filter: (games: Game[]) => {
      return games.filter((g) => g.gtc === GAME_TYPE_CODE.FISHING)
    },
  },
  card: {
    label: 'Card Game',
    icon: 'card-game',
    route: 'card',
    filter: (games: Game[]) => {
      return games.filter((g) => g.gdc_cat === GDC_GAME_CATEGORY.CARDGAME)
    },
  },
  local: {
    label: 'Game Bài',
    icon: 'games',
    route: 'local',
    filter: (games: Game[]) => {
      return games.filter((g) => g.gtc === GAME_TYPE_CODE.GAMES)
    },
  },
}

const GAMES_FILTER = Object.keys(SUB_ROUTES).reduce(
  (acc, cur) => {
    acc.unshift(SUB_ROUTES[cur])
    return acc
  },
  [
    {
      label: 'Slots',
      icon: 'sl',
      route: '/slots',
    },
  ]
)

const GameTypeFilter = ({ onFilterClicked, ...rest }) => {
  return (
    <View sx={{ gap: '$3', width: [175, 175, 175, 175, 200] }} {...rest}>
      {GAMES_FILTER.map((r, i) => {
        return (
          <Pressable
            key={i}
            onPress={() => onFilterClicked(r, i)}
            sx={{
              width: [175, 175, 175, 175, 200],
              aspectRatio: 240 / 80,
              position: 'relative',
            }}
          >
            <SolitoImage
              style={{ position: 'absolute' }}
              fill
              src={require('app/assets/images/game/bgAllProviders.jpg')}
              alt={'bg'}
            />
            <Row sx={{ alignItems: 'center', flex: 1, px: '$2' }}>
              <View
                sx={{
                  flex: 0.9,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={40} name={r.icon} />
              </View>
              <Text
                sx={{
                  fontSize: 24,
                  lineHeight: 24,
                  fontWeight: '900',
                  flex: 1.1,
                }}
              >
                {r.label}
              </Text>
            </Row>
          </Pressable>
        )
      })}
    </View>
  )
}

const GamesScreen = withGameFilterProvider(_GamesScreen, {
  gameTypes: [
    GAME_TYPE_CODE.GAMES,
    GAME_TYPE_CODE.FISHING,
    GAME_TYPE_CODE.LOTTERY,
  ],
  gameCategories: [GDC_GAME_CATEGORY.CARDGAME],
})

export default GamesScreen
