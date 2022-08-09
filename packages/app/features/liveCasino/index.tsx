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
import ListSectionHeader from '../ListSectionHeader'

const LiveCasino = () => {
  const { t } = useLocalization()
  const sx = useSx()
  // const locale = useAppSelector((s) => s.setting.locale)
  // const actionSheetRef = useRef<ActionSheet>(null)

  const { data: playerProfile } = usePlayerProfileQuery()
  const { currency } = playerProfile?.data || {}
  // const {
  //   genreSelection,
  //   selectedGenre,
  //   setSelectedGenre,
  //   providerSelection,
  //   selectedProvider,
  //   setSelectedProvider,
  //   filteredGames,
  // } = useLiveCasinoFilter()

  const { gameList, isFetching: isFetchingGameList } = useGetGameListQuery(
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

  const { containerSpace, itemSpace, contentWidth } = useGameGridSize(2)

  // const openActionSheet = () => {
  //   actionSheetRef.current?.show()
  // }

  const renderItem = ({ item }: { item: Game }) => {
    const { gc, gpc, gtc, img, name } = item
    const imageUrl = `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${img}`
    return (
      <SimpleGridImage
        sx={{ m: itemSpace }}
        providerCode={gpc}
        gameCode={gc}
        image={imageUrl}
        width={contentWidth}
        gameTypeCode={gtc}
      />
    )
  }

  const Header = (
    <View sx={{ m: -containerSpace }}>
      <ListSectionHeader
        title={t('game.category.liveCasino')}
        bgColor="maroon"
        iconName="lc"
      />
      {/* {gameList?.length > 0 && (
        <ScrollView
          horizontal
          sx={{
            flexGrow: 0,
            borderBottomColor: '$lightNavyBlue',
            borderBottomWidth: 1,
          }}
          contentContainerStyle={{
            paddingHorizontal: space,
            paddingBottom: space,
            paddingTop: 2, // for the shadow
          }}
        >
          {providerSelection.map((p) => {
            const selected = p.value === selectedProvider.value
            return (
              <TouchableOpacity
                style={{ marginRight: space * 0.5 }}
                key={p.value}
                onPress={() => setSelectedProvider(p)}
              >
                <ProviderSelectItem selected={selected}>
                  <Text>{p.label}</Text>
                </ProviderSelectItem>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      )}
      <View
        sx={{
          py: space,
          px: space,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text sx={{ fontSize: [15, 20] }}>{selectedProvider.label}</Text>
        <SelectButton
          onOpen={openActionSheet}
          title={selectedGenre?.label ?? 'Click here to open'}
          isActive={false}
          sx={{ minWidth: '25%' }}
        />
      </View> */}
    </View>
  )

  return (
    <Page sx={{ bg: '$background' }}>
      <FlatList
        numColumns={2}
        ListHeaderComponent={Header}
        style={sx({ bg: '$background', flex: 1 })}
        contentContainerStyle={{ padding: containerSpace }}
        // onEndReached={loadMore}
        data={gameList}
        // extraData={displayList}
        keyExtractor={(item) => item.gc + item.gpc + item.gtc}
        renderItem={renderItem}
        ListEmptyComponent={<ActivityIndicator color={'$lightCyan'} />}
      />
      {/* <View sx={{ p: containerSpace, flexDirection: 'row', flexWrap: 'wrap' }}>
        {filteredGames.map((item, rindex) => {
          return (
            <SimpleGridImage
              key={item.gameCode}
              sx={{ m: itemSpace }}
              gameName={item.gameName}
              providerCode={item.providerCode}
              gameCode={item.gameCode}
              image={require('../../assets/images/games/AG01.png')}
              title={item.gameName}
              width={contentWidth}
              height={contentWidth / (325 / 265)}
            />
          )
        })}
      </View>
      <SimpleWrap data={filteredGames} /> */}

      {/* `ActionSheet` cannot be shown if put inside `Flatlist` header */}
      {/* <Select
        ref={actionSheetRef}
        headerTitle={t('menu.tab.gameType')}
        button={() => null}
        data={genreSelection}
        setSelectedValue={setSelectedGenre}
      /> */}
    </Page>
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
