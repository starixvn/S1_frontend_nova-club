import { FlashList } from '@shopify/flash-list'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Currency, GAME_TYPE_CODE } from 'app/utils/constant'
import { View } from 'dripsy'
import React, { memo, useMemo, useRef, useState } from 'react'
import { LayoutAnimation, Platform } from 'react-native'
import { useGetGameListQuery } from 'services/contentApi'
import { Game } from 'services/contentApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import ListSectionHeader from '../ListSectionHeader'
import MenuRow from './MenuRow'
import VerticalGameList from './VerticalGameList'

// To prevent `ListSectionHeader` animation from triggered on each re-render
const MemoListSectionHeader = memo(ListSectionHeader)

const Games = () => {
  const { t } = useLocalization()
  const locale = useAppSelector((s) => s.setting.locale)

  const [filterGames, setFilterGames] = useState<Game[]>([])
  const list = useRef<FlashList<Game> | null>(null)

  const { data: playerProfile } = usePlayerProfileQuery()
  const { currency } = playerProfile || {}

  const {
    data: gameListByGameCategory,
    isFetching: isFetchingGameListByGameCategory,
  } = useGetGameListQuery({
    currency: currency ?? Currency.VND,
    game_category: [
      GAME_TYPE_CODE.GAMES,
      GAME_TYPE_CODE.FISHING,
      GAME_TYPE_CODE.LOTTERY,
    ],
    limit: 100,
    offset: 0,
  })

  const { data: gameListByGdc, isFetching: isFetchingGameListByGdc } =
    useGetGameListQuery({
      currency: currency ?? Currency.VND,
      game_category: [],
      limit: 100,
      offset: 0,
      gdc_game_category: ['cardgame'],
      gdc_tag: [],
    })

  const concatGameList = (lists?: (Game[] | undefined)[]) => {
    if (!lists) return []

    const concatList = lists.reduce((concatList, currentList) => {
      return (concatList || []).concat(currentList || [])
    }, [])

    return concatList
  }

  const isFetchingGameList =
    isFetchingGameListByGameCategory || isFetchingGameListByGdc

  const gameListByGameCategoryRows = gameListByGameCategory?.data?.rows
  const gameListByGdcRows = gameListByGdc?.data?.rows
  const gameList = useMemo(() => {
    if (isFetchingGameList) return []

    const gameList = concatGameList([
      gameListByGameCategoryRows,
      gameListByGdcRows,
    ])

    return gameList
  }, [gameListByGameCategoryRows, gameListByGdcRows, isFetchingGameList])

  return (
    <VerticalGameList
      ref={list}
      extraData={locale}
      showName
      // showSkeleton
      estimatedItemSize={50}
      numColumns={3}
      isLoading={isFetchingGameList}
      data={filterGames}
      ListHeaderComponent={
        <>
          <MemoListSectionHeader
            title={t('game.category.games')}
            bgColor="green"
            iconName="games"
          />
          {/* <BannerSection /> */}
          <MenuRow
            gameList={gameList}
            setFilterGames={(games) => {
              // console.log('set new list', games.length)
              setFilterGames(games)
              if (Platform.OS === 'ios') {
                if (list.current) {
                  list.current.prepareForLayoutAnimationRender()
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  )
                }
              }
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
