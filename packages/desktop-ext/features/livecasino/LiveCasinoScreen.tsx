import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import SkeletonPlaceholder from 'app/components/SkeletonPlaceholder'
import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import RecentlyPlayedSection from 'app/features/home/RecentlyPlayedSection'
import {
  CONTENT_FROM_TOP,
  CONTENT_FROM_TOP_2,
  GAME_TYPE_CODE,
  HEADER_HEIGHT_OFFSET,
  ProviderImageCategory,
  SCROLL_OFFSET_TOP,
} from 'app/utils/constant'
import ProviderList from 'desktop-ext/components/game/ProviderList'
import { ActivityIndicator, Container, Row, View } from 'dripsy'
import uniqBy from 'lodash/uniqBy'
import React, { useMemo } from 'react'
import { useGetGameListByCategoryQuery } from 'services/gameApi'
import { createParam } from 'solito'
import { SolitoImage } from 'solito/image'

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
    const element = document.getElementById('content')
    if (element) {
      const elementTop = element.getBoundingClientRect().top

      // If the element is within the desired range, return early
      if (elementTop > CONTENT_FROM_TOP && elementTop < CONTENT_FROM_TOP_2) {
        return
      }

      // Scroll the element into view smoothly
      element.scrollIntoView({ behavior: 'smooth' })

      // Adjust the window scroll position if necessary
      if (elementTop < SCROLL_OFFSET_TOP || elementTop > CONTENT_FROM_TOP) {
        window.scrollBy(0, elementTop - HEADER_HEIGHT_OFFSET)
      }
    }
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
