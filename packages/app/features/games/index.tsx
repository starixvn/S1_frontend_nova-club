import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import SimpleGridImage from 'app/components/SimpleGridImage'
import useGameGridSize from 'app/hooks/useGameGridSize'
import useLocalization from 'app/provider/localization'
import { Currency, GAME_TYPE_CODE } from 'app/utils/constant'
import { ActivityIndicator, FlatList, Text, useSx, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import React, { memo, useState } from 'react'
import { ListRenderItem } from 'react-native'
import { useGetGameListQuery } from 'services/contentApi'
import { GameList } from 'services/contentApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import BannerSection from '../home/Section/BannerSection'
import ListSectionHeader from '../ListSectionHeader'
import MenuRow from './MenuRow'

// To prevent `ListSectionHeader` animation from triggered on each re-render
const MemoListSectionHeader = memo(ListSectionHeader)

const Games = () => {
  const { t } = useLocalization()
  const [filterGames, setFilterGames] = useState<GameList[]>([])
  const sx = useSx()
  const { contentWidth, itemSpace, containerSpace } = useGameGridSize(3)

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

  const renderSlotItem = ({
    item,
  }: Parameters<ListRenderItem<GameList>>[0]) => {
    const { gc, gpc, img } = item
    const imageUrl = `${MEDIA_DOMAIN}${CONTENT_URI}/${img}`

    return (
      <AnimatePresence>
        <MotiView
          from={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
        >
          <SimpleGridImage
            sx={{ m: itemSpace }}
            providerCode={gpc}
            gameCode={gc}
            image={{ uri: imageUrl }}
            width={contentWidth}
          />
        </MotiView>
      </AnimatePresence>
    )
  }

  return (
    <FlatList
      nestedScrollEnabled={true}
      numColumns={3}
      style={sx({ bg: '$background', flex: 1 })}
      columnWrapperStyle={{ padding: containerSpace }}
      contentContainerStyle={{ paddingBottom: 20 }}
      data={filterGames}
      keyExtractor={(_, index) => {
        return `${index}`
      }}
      renderItem={renderSlotItem}
      ListHeaderComponent={
        <>
          <MemoListSectionHeader
            title={t('game.category.games')}
            bgColor="green"
            iconName="games"
          />
          <BannerSection />
          <MenuRow
            gameList={gameList?.data?.rows}
            setFilterGames={setFilterGames}
          />
          <View sx={{ bg: '$lightNavyBlue', height: 1 }} />
        </>
      }
      ListEmptyComponent={
        <View sx={{ alignItems: 'center', mt: '$5' }}>
          {isFetchingGameList ? (
            <ActivityIndicator color={'$lightCyan'} />
          ) : (
            <Text>{t('common.noInfoAvailable')}</Text>
          )}
        </View>
      }
    />
  )
}

export default Games
