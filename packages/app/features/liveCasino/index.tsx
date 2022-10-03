import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Page from 'app/components/layout/Page'
import SimpleGridImage from 'app/components/SimpleGridImage'
import useGameGridSize from 'app/hooks/useGameGridSize'
import useLocalization from 'app/provider/localization'
import { Currency, GAME_TYPE_CODE } from 'app/utils/constant'
import { ActivityIndicator, styled, useSx, View } from 'dripsy'
import React from 'react'
import { FlatList, Platform } from 'react-native'
import { useGetGameListQuery } from 'services/contentApi'
import { Game } from 'services/contentApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import VerticalGameList from '../games/VerticalGameList'
import ListSectionHeader from '../ListSectionHeader'

const LiveCasino = () => {
  const { t } = useLocalization()
  const sx = useSx()
  // const locale = useAppSelector((s) => s.setting.locale)
  // const actionSheetRef = useRef<ActionSheet>(null)

  const { data: playerProfile } = usePlayerProfileQuery()
  const { currency } = playerProfile || {}
  // const {
  //   genreSelection,
  //   selectedGenre,
  //   setSelectedGenre,
  //   providerSelection,
  //   selectedProvider,
  //   setSelectedProvider,
  //   filteredGames,
  // } = useLiveCasinoFilter()

  const { gameList, isFetching } = useGetGameListQuery(
    {
      currency: currency ?? Currency.VND,
      game_category: [GAME_TYPE_CODE.LIVE_DEALER],
      limit: 100,
      offset: 0,
    },
    {
      selectFromResult: ({ data }) => ({
        gameList: data?.data?.rows || [],
      }),
    }
  )

  const Header = (
    <ListSectionHeader
      title={t('game.category.liveCasino')}
      bgColor="maroon"
      iconName="lc"
    />
  )

  return (
    <VerticalGameList
      showSkeleton
      numColumns={2}
      isLoading={isFetching}
      data={gameList}
      ListHeaderComponent={Header}
    />
  )
}

const ProviderSelectItem = styled(
  View,
  {}
)(({ selected = false }) => ({
  mr: '$2',
  ml: 0,
  width: 100,
  height: 100,
  justifyContent: 'center',
  alignItems: 'center',
  opacity: selected ? 1 : 0.3,
  bg: '#102232',
  borderRadius: 20,
  borderColor: '#37558A',
  borderWidth: 1,
  elevation: selected ? 4 : 0,
  ...Platform.select({
    web: {
      boxShadow: '0px 0px 6px #6E6E6E;',
    },
    default: {
      shadowColor: '#6E6E6E',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
  }),
}))

export default LiveCasino
