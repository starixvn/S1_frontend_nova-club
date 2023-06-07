import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import GameListByProvider from 'app/components/game/GameListByProvider'
import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import GameFilterProvider, {
  useGameFilter,
  withGameFilterProvider,
} from 'app/provider/gameFilter/GameFilterProvider'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import React, { useMemo, useRef } from 'react'
import { Game } from 'services/gameApi.type'
import BannerSection from '../home/BannerSection'
import RecentlyPlayedSection from '../home/RecentlyPlayedSection'
import TopGameSection from '../home/TopGameSection'
import JackpotGameSection from '../home/JackpotGameSection'
import ProviderList from 'app/components/game/ProviderList'
import { Platform } from 'react-native'

function _SlotScreen() {
  const { games, gamesByProviders, filterKey, setFilteredGames } =
    useGameFilter()

  const providers = useMemo(() => {
    return Object.keys(gamesByProviders)
  }, [gamesByProviders])

  const gameGroup: Game[][] = useMemo(() => {
    return Object.values(gamesByProviders).filter((v) => v.length > 0)
  }, [gamesByProviders])

  const flashListRef = useRef<FlashList<Game[]>>(null)

  function onNavigate(index: number, gpc: string) {
    if (Platform.OS === 'web') {
      document
        .getElementById(`gameSection${gpc}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      flashListRef.current?.scrollToIndex({
        animated: true,
        index,
      })
    }
  }
  return (
    <FlashList
      ref={flashListRef}
      estimatedItemSize={273}
      data={gameGroup}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
      renderItem={({ item }) => {
        if (item && item[0])
          return <GameSectionByProviderItem gpc={item[0].gpc} games={item} />
        else return null
      }}
      ListHeaderComponent={
        <>
          <GamePageHeader icon="sl" title="SLOTS" />
          <BannerSection />
          <RecentlyPlayedSection />
          <TopGameSection />
          <JackpotGameSection />
          <JackpotGameSection />
          <JackpotGameSection />
          <ProviderList data={providers} onNavigateProvider={onNavigate} />
        </>
      }
    />
  )
}

const SlotScreen = withGameFilterProvider(_SlotScreen, {
  gameTypes: [GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING],
})

export default SlotScreen
