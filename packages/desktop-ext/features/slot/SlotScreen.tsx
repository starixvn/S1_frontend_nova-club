import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import RecentlyPlayedSection from 'app/features/home/RecentlyPlayedSection'
import {
  useGameFilter,
  withGameFilterProvider,
} from 'app/provider/gameFilter/GameFilterProvider'
import { GAME_TYPE_CODE, ProviderImageCategory } from 'app/utils/constant'
import ProviderList from 'desktop-ext/components/game/ProviderList'
import { ActivityIndicator, Container, Pressable, Row, View } from 'dripsy'
import React, { startTransition, useEffect, useMemo, useState } from 'react'
import { useGameListMultipleQuery } from 'services/gameApi'
import { createParam } from 'solito'
import groupBy from 'lodash/groupBy'
import { Game, LatestWinnerType } from 'services/gameApi.type'
import LatestWinnerSection from 'desktop-ext/components/game/LatestWinnerSection'
import { SolitoImage } from 'solito/image'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'

type Props = {}

type Params = {
  provider?: string
}
const { useParam } = createParam<Params>()

function SlotScreen({}: Props) {
  const [provider, setProvider] = useParam('provider', {
    parse: (templateFromUrl) =>
      templateFromUrl ? templateFromUrl[0] : undefined,
    initial: undefined,
  })

  const [filteredGames, setFilteredGames] = useState<Game[]>()

  const { data: games } = useGameListMultipleQuery({
    game_category: [GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING],
  })

  const gamesByProviders = useMemo(() => {
    return groupBy(games, 'gpc')
  }, [games])

  const providers = useMemo(() => {
    return Object.keys(gamesByProviders)
  }, [gamesByProviders])

  useEffect(() => {
    startTransition(() =>
      setFilteredGames(
        provider && games
          ? games.filter((g) => g.gpc.toLowerCase() == provider)
          : games
      )
    )
  }, [provider, games])

  function onNavigate(index: number, gpc: string) {
    setProvider(gpc?.toLowerCase())
  }

  return (
    <Container>
      <Row sx={{ gap: '$3', my: '$sectionBottomSpace' }}>
        <View sx={{ flex: 0.8, minHeight: 300 }}>
          <LatestWinnerSection type={LatestWinnerType.Slot} />
        </View>
        <View sx={{ flex: 1, minHeight: 300, bg: '$secondary.500' }}></View>
        <View sx={{ flex: 1, minHeight: 300, bg: '$secondary.500' }}></View>
      </Row>
      <RecentlyPlayedSection />
      {!games || filteredGames == null ? (
        <View sx={{ height: '50vh' }}>
          <ActivityIndicator color="$primary.300" size="large" />
        </View>
      ) : (
        <Row sx={{ gap: '$3', position: 'relative' }}>
          <ProviderList
            data={providers}
            onNavigateProvider={onNavigate}
            imageCategory={ProviderImageCategory.Slot}
          >
            <Pressable
              onPress={() => setProvider(undefined)}
              sx={{
                width: [175, 175, 175, 175, 200],
                aspectRatio: 240 / 80,
              }}
            >
              <SolitoImage
                fill
                src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/game/provider/colored/all.jpg`}
                alt={'all slots'}
              />
            </Pressable>
          </ProviderList>

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

export default SlotScreen
