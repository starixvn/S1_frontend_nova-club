import Select from 'app/components/form/Select'
import Page from 'app/components/layout/Page'
import SimpleGridImage from 'app/components/SimpleGridImage'
import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useGameGridSize from 'app/hooks/useGameGridSize'
import useLocalization from 'app/provider/localization'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  styled,
  Text,
  useSx,
  View,
} from 'dripsy'
import React from 'react'
import { FlatList, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ListSectionHeader from '../ListSectionHeader'
import useLiveCasinoFilter from '../../hooks/game/useLiveCasinoFilter'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { GameConfig } from 'services/contentApi.type'

const LiveCasinoImageExtensionMapping = {
  cq9: 'png',
}

const LiveCasino = () => {
  const { t } = useLocalization()
  const { width } = useContainerDimension()
  const sx = useSx()
  const space = width * HOME_PADDING

  const {
    genreSelection,
    selectedGenre,
    setSelectedGenre,
    providerSelection,
    selectedProvider,
    setSelectedProvider,
    filteredGames,
  } = useLiveCasinoFilter()

  const { containerSpace, itemSpace, contentWidth } = useGameGridSize()

  const renderItem = ({ item }: { item: GameConfig }) => {
    const { game_code, game_provider_code, game_name } = item
    const imageUrl = `${MEDIA_DOMAIN}${CONTENT_URI}/games/${game_provider_code.toLowerCase()}/${game_code.toLowerCase()}.${
      LiveCasinoImageExtensionMapping[game_provider_code.toLowerCase()] ?? 'jpg'
    }`

    return (
      <SimpleGridImage
        sx={{ m: itemSpace }}
        gameName={game_name}
        providerCode={game_provider_code}
        gameCode={game_code}
        image={imageUrl}
        title={game_name + ` (${game_code})`}
        width={contentWidth}
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
        <Select
          actionSheetProps={{ id: 'liveCasinoGenre' }}
          headerTitle={'Game Type'}
          buttonTitle={selectedGenre?.label ?? 'Click here to open'}
          buttonProps={{
            isActive: false,
            sx: { minWidth: '25%' },
          }}
          data={genreSelection}
          setSelectedValue={setSelectedGenre}
        />
      </View>
    </View>
  )

  return (
    <Page sx={{ bg: '$background' }}>
      {filteredGames.length === 0 ? (
        <ActivityIndicator
          size={'large'}
          sx={{ mt: '$8' }}
          color={'$lightCyan'}
        />
      ) : (
        <FlatList
          numColumns={3}
          ListHeaderComponent={Header}
          style={sx({ bg: '$background', flex: 1 })}
          contentContainerStyle={{ padding: containerSpace }}
          // onEndReached={loadMore}
          data={filteredGames}
          // extraData={displayList}
          keyExtractor={(item) =>
            item.game_code + item.game_provider_code + item.game_name
          }
          renderItem={renderItem}
        />
      )}
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
