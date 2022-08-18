import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import SimpleGridImage from 'app/components/SimpleGridImage'
import useGameGridSize from 'app/hooks/useGameGridSize'
import useLocalization from 'app/provider/localization'
import { Currency, GAME_TAGS, GAME_TYPE_CODE } from 'app/utils/constant'
import { ActivityIndicator, FlatList, Text, useSx, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import React, { memo, useRef, useState } from 'react'
import { LayoutAnimation, ListRenderItem } from 'react-native'
import { useGetGameListQuery } from 'services/contentApi'
import { Game } from 'services/contentApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import BannerSection from '../home/Section/BannerSection'
import ListSectionHeader from '../ListSectionHeader'
import MenuRow from './MenuRow'
import VerticalGameList from './VerticalGameList'

// To prevent `ListSectionHeader` animation from triggered on each re-render
const MemoListSectionHeader = memo(ListSectionHeader)

const Games = () => {
  const { t } = useLocalization()
  const [filterGames, setFilterGames] = useState<Game[]>([])
  const list = useRef<FlashList<Game> | null>(null)

  const { data: playerProfile } = usePlayerProfileQuery()
  const { currency } = playerProfile?.data || {}

  const { data: gameList, isFetching: isFetchingGameList } =
    useGetGameListQuery({
      currency: currency ?? Currency.VND,
      game_category: [
        GAME_TYPE_CODE.GAMES,
        GAME_TYPE_CODE.COCKFIGHTING,
        GAME_TYPE_CODE.FISHING,
        GAME_TYPE_CODE.LOTTERY,
      ],
      limit: 100,
      offset: 0,
    })

  return (
    <VerticalGameList
      ref={list}
      showName
      estimatedItemSize={50}
      numColumns={3}
      isLoading={isFetchingGameList}
      data={filterGames}
      extraData
      ListHeaderComponent={
        <>
          <MemoListSectionHeader
            title={t('game.category.games')}
            bgColor="green"
            iconName="games"
          />
          {/* <BannerSection /> */}
          <MenuRow
            gameList={gameList?.data?.rows}
            setFilterGames={(games) => {
              // console.log('set new list', games.length)
              setFilterGames(games)
              // if (list.current) {
              //   list.current.prepareForLayoutAnimationRender()
              //   LayoutAnimation.configureNext(
              //     LayoutAnimation.Presets.easeInEaseOut
              //   )
              // }
            }}
          />
          <View sx={{ bg: '$lightNavyBlue', height: 1, mb: '$4' }} />
        </>
      }
    />
    // <FlatList
    //   nestedScrollEnabled={true}
    //   numColumns={3}
    //   style={sx({ bg: '$background', flex: 1 })}
    //   columnWrapperStyle={{ padding: containerSpace }}
    //   contentContainerStyle={{ paddingBottom: 20 }}
    //   data={filterGames}
    //   keyExtractor={(_, index) => {
    //     return `${index}`
    //   }}
    //   renderItem={renderSlotItem}
    //   ListHeaderComponent={

    //   }
    //   ListEmptyComponent={
    //     <View sx={{ alignItems: 'center', mt: '$5' }}>
    //       {isFetchingGameList ? (
    //         <ActivityIndicator color={'$lightCyan'} />
    //       ) : (
    //         <Text>{t('common.noInfoAvailable')}</Text>
    //       )}
    //     </View>
    //   }
    // />
  )
}

export default Games
