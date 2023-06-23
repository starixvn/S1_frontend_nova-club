import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import RecentlyPlayedSection from 'app/features/home/RecentlyPlayedSection'
import { GAME_TYPE_CODE, GDC_GAME_CATEGORY } from 'app/utils/constant'
import ProviderList from 'desktop-ext/components/game/ProviderList'
import { ActivityIndicator, Container, Row, View } from 'dripsy'
import React, { useMemo } from 'react'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { createParam } from 'solito'
import groupBy from 'lodash/groupBy'

type Props = {}

type Params = {
  provider?: string
}

const { useParam } = createParam<Params>()

export default function LiveCasinoScreen({}: Props) {
  const [provider, setProvider] = useParam('provider', {
    parse: (templateFromUrl) =>
      templateFromUrl ? templateFromUrl[0] : undefined,
    initial: undefined,
  })

  const { data: games } = useGetGameListByCategoryQuery([
    GAME_TYPE_CODE.LIVE_DEALER,
  ])

  const filteredGames = useMemo(() => {
    if (games && games.length > 0) {
      if (provider) {
        return games.filter((g) => g.gpc.toLowerCase() === provider)
      } else {
        setProvider(games[0]?.gpc.toLowerCase())
      }
    }

    return null
  }, [games, provider, setProvider])

  const gamesByProviders = useMemo(() => {
    return groupBy(games, 'gpc')
  }, [games])

  const providers = useMemo(() => {
    return Object.keys(gamesByProviders)
  }, [gamesByProviders])

  function onNavigate(index: number, gpc: string) {
    setProvider(gpc.toLowerCase())
  }

  console.log('provider', provider)
  return (
    <Container>
      <Row sx={{ gap: '$3', my: '$sectionBottomSpace' }}>
        <View sx={{ flex: 3, minHeight: 300, bg: '$secondary.500' }}></View>
        <View sx={{ flex: 2, minHeight: 300, bg: '$secondary.500' }}></View>
      </Row>
      <RecentlyPlayedSection />
      {provider == null || !games || filteredGames == null ? (
        <View sx={{ height: '50vh' }}>
          <ActivityIndicator color="$primary.300" size="large" />
        </View>
      ) : (
        <Row sx={{ gap: '$3', position: 'relative' }}>
          <ProviderList data={providers} onNavigateProvider={onNavigate} />
          <View
            sx={{
              flex: 1,
              position: 'relative',
            }}
          >
            <GameSectionByProviderItem
              bordered
              gpc={provider}
              games={filteredGames}
              // GameListComponent={GameSectionByProviderItemFlashList}
            />
          </View>
        </Row>
      )}
    </Container>
  )
}
