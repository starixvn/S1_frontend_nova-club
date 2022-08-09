import useLocalization from 'app/provider/localization'
import { Currency, GAME_TYPE_CODE } from 'app/utils/constant'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useGetGameListQuery } from 'services/contentApi'
import { usePlayerProfileQuery } from 'services/playerApi'
import VerticalGameList from '../games/VerticalGameList'
import ListSectionHeader from '../ListSectionHeader'

const Sportsbook = () => {
  const { width, height } = useWindowDimensions()
  const { t } = useLocalization()

  const { data: playerProfile } = usePlayerProfileQuery()
  const { currency } = playerProfile?.data || {}

  const { data: gameList, isFetching } = useGetGameListQuery({
    currency: currency ?? Currency.VND,
    game_category: [
      GAME_TYPE_CODE.SPORTS,
      GAME_TYPE_CODE.E_SPORTS,
      GAME_TYPE_CODE.VIRTUAL_SPORTS,
    ],
    limit: 100,
    offset: 0,
  })

  return (
    <VerticalGameList
      showName
      numColumns={2}
      isLoading={isFetching}
      games={gameList?.data?.rows ?? []}
      ListHeaderComponent={
        <ListSectionHeader
          title={t('game.category.sportsbook')}
          bgColor="yellow"
          iconName="sb"
        />
      }
    />
  )
}

export default Sportsbook
