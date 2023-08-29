import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import RecentlyPlayedSection from 'app/features/home/RecentlyPlayedSection'
import {
  GAME_TYPE_CODE,
  GDC_GAME_CATEGORY,
  ProviderImageCategory,
} from 'app/utils/constant'
import ProviderList from 'desktop-ext/components/game/ProviderList'
import { ActivityIndicator, Container, Row, View } from 'dripsy'
import React, { useMemo } from 'react'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { createParam } from 'solito'
import groupBy from 'lodash/groupBy'
import { SolitoImage } from 'solito/image'
import SkeletonPlaceholder from 'app/components/SkeletonPlaceholder'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'

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

  return (
    <Container>
      <View sx={{ width: '100%', aspectRatio: 1280 / 333, mb: '$3' }}>
        <SkeletonPlaceholder width={'100%'} height={'100%'}>
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/banners/livecasino/pp-live-casino.jpg`}
            alt="Dailywins"
            fill
          />
        </SkeletonPlaceholder>
      </View>
      <RecentlyPlayedSection gameTypes={[GAME_TYPE_CODE.LIVE_DEALER]} />
      {provider == null || !games || filteredGames == null ? (
        <View sx={{ height: '50vh' }}>
          <ActivityIndicator color="$primary.300" size="large" />
        </View>
      ) : (
        <Row sx={{ gap: '$3', position: 'relative' }}>
          <ProviderList
            data={providers}
            onNavigateProvider={onNavigate}
            imageCategory={ProviderImageCategory.LiveCasino}
          />
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
              gameListProps={{
                aspectRatio: 350 / 220,
                itemWidth: ['22%', '18%', '15%', '23%', '18%'],
                itemSpace: ['1.5%', '1%', '0.83%', '1%', '1%'],
              }}
            />
          </View>
        </Row>
      )}
    </Container>
  )
}
