import { FlashList } from '@shopify/flash-list'
import GamePageHeader from 'app/components/GamePageHeader'
import IconButtonGradientGroup from 'app/components/IconButtonGradientGroup'
import IconButtonGradientToggle from 'app/components/IconButtonGradientToggle'
import GameSectionByProviderItem from 'app/components/game/GameSectionByProviderItem'
import ProviderList from 'app/components/game/ProviderList'
import {
  GAME_TYPE_CODE,
  GDC_GAME_CATEGORY,
  ProviderImageCategory,
} from 'app/utils/constant'
import groupBy from 'lodash/groupBy'
import React, { useEffect, useMemo, useRef } from 'react'
import { Platform } from 'react-native'
import { Game } from 'services/gameApi.type'
import RecentlyPlayedSection from '../home/RecentlyPlayedSection'
import TopGameSection from '../home/TopGameSection'
import { MobileGamesFilter, SUB_ROUTES } from './subroutes'
import useGameScreen from './useGameScreen'
import { View } from 'dripsy'

const GamesScreen = () => {
  const { type, filteredGames, onFilterClicked } = useGameScreen()
  console.log('type', type)
  useEffect(() => {
    if (type) {
      if (Platform.OS === 'web') {
        document
          .getElementById(`gameSectionSABA`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else
        flashListRef.current?.scrollToIndex({
          animated: true,
          index: 0,
        })
    }
  }, [type])

  const flashListRef = useRef<FlashList<Game[]>>(null)

  const gamesByProviders = useMemo(() => {
    return groupBy(filteredGames, 'gpc')
  }, [filteredGames])

  const providers = useMemo(() => {
    return Object.keys(gamesByProviders)
  }, [gamesByProviders])

  const gameGroup: Game[][] = useMemo(() => {
    return Object.values(gamesByProviders).filter((v) => v.length > 0)
  }, [gamesByProviders])

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
        <View sx={{ gap: '$3', my: '$3' }}>
          <GamePageHeader icon="games1" title="GAMES" />
          <IconButtonGradientGroup
            sx={{
              maxWidth: 550,
              alignSelf: 'center',
            }}
          >
            {MobileGamesFilter.map((r, i) => {
              return (
                <IconButtonGradientToggle
                  sx={{ flex: 1 }}
                  key={r.label}
                  active={type ? r.route.includes(type) : r.route === '/games'}
                  label={r.label}
                  size={50}
                  icon={r.icon ?? 'notice'}
                  labelProps={{ style: { fontSize: 11 }, numberOfLines: 2 }}
                  onPress={() => onFilterClicked(r, i)}
                />
              )
            })}
          </IconButtonGradientGroup>
          <RecentlyPlayedSection
            gameTypes={[
              GAME_TYPE_CODE.GAMES,
              GAME_TYPE_CODE.FISHING,
              GAME_TYPE_CODE.LOTTERY,
            ]}
            gameCategories={[GDC_GAME_CATEGORY.CARDGAME]}
          />
          <TopGameSection />

          <ProviderList
            data={providers}
            onNavigateProvider={onNavigate}
            imageCategory={ProviderImageCategory.Games}
          />
        </View>
      }
    />
  )
}

export default GamesScreen
