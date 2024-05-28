import SkeletonPlaceholder from 'app/components/SkeletonPlaceholder'
import BannerCarousel from 'app/components/banner/BannerCarousel'
import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import RecentlyPlayedSection from 'app/features/home/RecentlyPlayedSection'
import { useAppSelector } from 'app/provider/redux/store'
import { desktopScrollToElement } from 'app/utils'
import ProviderList from 'desktop-ext/components/game/ProviderList'
import { ActivityIndicator, Container, Row, View } from 'dripsy'
import uniqBy from 'lodash/uniqBy'
import React, { useEffect, useMemo } from 'react'
import { selectBannerByPage, useBannerQuery } from 'services/contentApi'
import { BannerPage } from 'services/contentApi.type'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { usePlayerProfileQuery } from 'services/playerApi'
import { createParam } from 'solito'
import { GAME_TYPE_CODE, ProviderImageCategory } from 'utils/constant'

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

  const currency = useAppSelector((s) => s.setting.currency)

  const { data: games } = useGetGameListByCategoryQuery({
    currency,
    categories: [GAME_TYPE_CODE.LIVE_DEALER],
  })

  const { banners } = useBannerQuery(currency, {
    selectFromResult: (s) => {
      return {
        ...s,
        banners: selectBannerByPage(s.data, BannerPage.LiveCasino),
      }
    },
  })

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

  const providers = useMemo(() => {
    if (games)
      return uniqBy(
        games.map(({ gtc, gpc }) => ({ gtc, gpc })),
        'gpc'
      )
    else return []
  }, [games])

  function onNavigate(index: number, gpc: string) {
    setProvider(gpc.toLowerCase())
    desktopScrollToElement('content')
  }

  useEffect(() => {
    desktopScrollToElement('content')
  }, [filteredGames])

  return (
    <Container>
      <View sx={{ width: '100%', aspectRatio: 1280 / 333, mb: '$3' }}>
        <SkeletonPlaceholder width={'100%'} height={'100%'}>
          <BannerCarousel data={banners} />
        </SkeletonPlaceholder>
      </View>
      <RecentlyPlayedSection gameTypes={[GAME_TYPE_CODE.LIVE_DEALER]} />
      {provider == null || !games || filteredGames == null ? (
        <View sx={{ height: '50vh' }}>
          <ActivityIndicator color="$primary.300" size="large" />
        </View>
      ) : (
        <Row sx={{ gap: '$3', position: 'relative' }} nativeID="content">
          <ProviderList
            data={providers}
            onNavigateProvider={onNavigate}
            imageCategory={ProviderImageCategory.LiveCasino}
            provider={provider}
            handleProvider={() => setProvider}
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
