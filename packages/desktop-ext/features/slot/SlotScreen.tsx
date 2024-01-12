import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import BannerCarousel from 'app/components/banner/BannerCarousel'
import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import RecentlyPlayedSection from 'app/features/home/RecentlyPlayedSection'
import useGameCategoryTag from 'app/hooks/appState/game/useGameCategoryTag'
import { desktopScrollToElement } from 'app/utils'
import LatestWinnerSection from 'desktop-ext/components/game/LatestWinnerSection'
import ProviderList from 'desktop-ext/components/game/ProviderList'
import {
  ActivityIndicator,
  Container,
  Pressable,
  Row,
  View,
  useResponsiveValue,
} from 'dripsy'
import { ResizeMode, Video } from 'expo-av'
import uniqBy from 'lodash/uniqBy'
import React, { startTransition, useEffect, useMemo, useState } from 'react'
import { Platform } from 'react-native'
import { useBannerQuery } from 'services/contentApi'
import { useGameListMultipleQuery } from 'services/gameApi'
import { Game, LatestWinnerType } from 'services/gameApi.type'
import { createParam } from 'solito'
import { SolitoImage } from 'solito/image'
import { GAME_TYPE_CODE, ProviderImageCategory } from 'utils/constant'

type Props = {}

type Params = {
  provider?: string
}
const { useParam } = createParam<Params>()

const GameCategory = [GAME_TYPE_CODE.SLOTS]

function SlotScreen({}: Props) {
  const [provider, setProvider] = useParam('provider', {
    parse: (templateFromUrl) =>
      templateFromUrl ? templateFromUrl[0] : undefined,
    initial: undefined,
  })

  const showSlotVideo = useResponsiveValue([false, false, false, false, true])

  const [filteredGames, setFilteredGames] = useState<Game[]>()

  const { data: banner } = useBannerQuery()
  const bannerList = banner?.filter((el) => el.banner_display_page === 'slots')

  const { data: games } = useGameListMultipleQuery({
    game_category: GameCategory,
  })
  const { gameCategoryTagTranslation } = useGameCategoryTag(GameCategory)

  const providers = useMemo(() => {
    if (games)
      return uniqBy(
        games.map(({ gtc, gpc }) => ({ gtc: GAME_TYPE_CODE.SLOTS, gpc })),
        'gpc'
      )
    else return []
  }, [games])

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
    desktopScrollToElement('content')
  }

  useEffect(() => {
    desktopScrollToElement('content')
  }, [filteredGames])

  return (
    <Container>
      <Row sx={{ gap: '$3', my: '$sectionBottomSpace' }}>
        <View sx={{ flex: 1, minHeight: 320 }}>
          <LatestWinnerSection type={LatestWinnerType.Slot} />
        </View>
        <View sx={{ flexBasis: 480, minHeight: 320 }}>
          <BannerCarousel
            data={bannerList}
            bannerType="slot"
            ratio={480 / 320}
          />
        </View>
        {showSlotVideo && (
          <View sx={{ flex: 1, minHeight: 320 }}>
            <Video
              isMuted
              isLooping
              shouldPlay
              style={{
                width: '100%',
                height: '100%',
              }}
              videoStyle={{
                position: Platform.OS === 'web' ? 'relative' : 'absolute',
                height: '100%',
              }}
              source={{
                uri: `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/slot.mp4`,
              }}
              resizeMode={ResizeMode.COVER}
            />
          </View>
        )}
      </Row>
      <RecentlyPlayedSection
        gameTypes={[GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING]}
      />
      {!games || filteredGames == null ? (
        <View sx={{ height: '50vh' }}>
          <ActivityIndicator color="$primary.300" size="large" />
        </View>
      ) : (
        <Row sx={{ gap: '$3', position: 'relative' }} nativeID="content">
          <ProviderList
            data={providers}
            provider={provider}
            onNavigateProvider={onNavigate}
            imageCategory={ProviderImageCategory.Slot}
            handleProvider={() => setProvider}
          >
            <Pressable
              onPress={() => setProvider(undefined)}
              sx={{
                width: [175, 175, 175, 175],
                aspectRatio: 230 / 80,
                overflow: 'hidden',
                borderWidth: 2,
                borderColor:
                  provider === undefined ? '$secondary.200' : 'transparent',
              }}
            >
              <div
                className="btn btn-hover"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  zIndex: 1,
                }}
              />
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
              gameCategoryTagTranslation={gameCategoryTagTranslation}
              // GameListComponent={GameSectionByProviderItemFlashList}
            />
          </View>
        </Row>
      )}
    </Container>
  )
}

export default SlotScreen
