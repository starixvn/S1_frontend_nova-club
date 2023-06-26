import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import GameListSectionAsyncByTag from 'app/components/game/GameListSectionAsyncByTag'
import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import ProviderList from 'app/components/game/ProviderList'
import {
  useGameFilter,
  withGameFilterProvider,
} from 'app/provider/gameFilter/GameFilterProvider'
import useLocalization from 'app/provider/localization'
import {
  GAME_TYPE_CODE,
  ProviderImageCategory,
  SlotType,
} from 'app/utils/constant'
import React, { useMemo, useRef } from 'react'
import { Platform } from 'react-native'
import { Game } from 'services/gameApi.type'
import BannerSection from '../home/BannerSection'
import RecentlyPlayedSection from '../home/RecentlyPlayedSection'

function _SlotScreen() {
  const { t } = useLocalization()

  const { gamesByProviders } = useGameFilter()

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
          <GameListSectionAsyncByTag
            tag={SlotType.NEW}
            title={t('game.new').toUpperCase()}
            icon="star"
          />
          <GameListSectionAsyncByTag
            tag={SlotType.JACKPOT}
            title={t('game.jackpot').toUpperCase()}
            icon="jackpot"
          />
          <GameListSectionAsyncByTag
            tag={SlotType.MEGAWAY}
            title={'MEGAWAY'}
            icon="megaway"
          />
          <ProviderList
            data={providers}
            onNavigateProvider={onNavigate}
            imageCategory={ProviderImageCategory.Slot}
          />
        </>
      }
    />
  )
}

const SlotScreen = withGameFilterProvider(_SlotScreen, {
  gameTypes: [GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING],
})

export default SlotScreen
