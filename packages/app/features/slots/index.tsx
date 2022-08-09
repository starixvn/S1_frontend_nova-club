import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Select from 'app/components/form/Select'
import SelectSquare from 'app/components/form/Select/SelectSquare'
import { PageSafeArea } from 'app/components/layout/Page'
import SimpleGridImage from 'app/components/SimpleGridImage'
import { ProviderImageExtension } from 'app/config/games/extension'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useGameGridSize from 'app/hooks/useGameGridSize'
import useLocalization from 'app/provider/localization'
import { ActivityIndicator, Row, Text, useSx, View } from 'dripsy'
import React from 'react'
import { FlatList } from 'react-native'
import { GameConfig } from 'services/contentApi.type'
import useSlotGamesFilter from '../../hooks/game/useSlotGamesFilter'
import ListSectionHeader from '../ListSectionHeader'

const Slots = () => {
  const sx = useSx()
  const { t } = useLocalization()
  const { width } = useContainerDimension()

  const { contentWidth, itemSpace, containerSpace } = useGameGridSize(3)
  const renderSlotItem = ({ item }: { item: GameConfig }) => {
    const { game_code, game_provider_code, game_name, game_type_code } = item
    const imageUrl = `${MEDIA_DOMAIN}${CONTENT_URI}/games/${game_provider_code.toLowerCase()}/${game_code.toLowerCase()}.${
      ProviderImageExtension[game_provider_code.toLowerCase()] ?? 'jpg'
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
        gameTypeCode={game_type_code}
      />
    )
  }

  const {
    providerSelection,
    slotTypeSelection,
    selectedProvider,
    filteredGames,
    selectedSlotType,
    setSelectedProvider,
    setSelectedSlotType,
    isFetching,
  } = useSlotGamesFilter()

  const isGameReady = !isFetching
  return (
    <PageSafeArea disableScrollView sx={{ bg: '$background' }}>
      <ListSectionHeader
        title={t('game.category.slots')}
        bgColor="purple"
        iconName="sl"
      >
        {isGameReady ? (
          <Row sx={{ flex: 1, justifyContent: 'flex-end' }}>
            <Select
              actionSheetProps={{ id: 'slotType' }}
              headerTitle={t('menu.tab.gameType')}
              buttonTitle={selectedSlotType?.label ?? 'Click here to open'}
              buttonProps={{
                sx: {
                  flex: 0.3,
                },
                isActive: false,
                buttonContentProps: {
                  gradient: 'plainLightBlue',
                  sx: {
                    borderRadius: 20,
                    minHeight: 40,
                  },
                },
                iconProps: {
                  size: 18,
                },
              }}
              data={slotTypeSelection}
              setSelectedValue={setSelectedSlotType}
            />
            <SelectSquare
              buttonTitle={selectedProvider.label ?? 'Click here to open'}
              buttonProps={{
                sx: {
                  mx: '$2',
                  flex: 0.45,
                },
                isActive: false,
                buttonContentProps: {
                  gradient: 'plainLightBlue',
                  sx: {
                    borderRadius: 20,
                    minHeight: 40,
                  },
                },
                iconProps: {
                  size: 18,
                },
              }}
              _dataList={{
                data: providerSelection,
                setSelectedValue: setSelectedProvider,
              }}
              _actionSheet={{
                id: 'slot provider',
                headerTitle: t('menu.tab.provider'),
              }}
            />
          </Row>
        ) : (
          <View />
        )}
      </ListSectionHeader>
      <FlatList
        numColumns={3}
        style={sx({ bg: '$background', flex: 1 })}
        contentContainerStyle={{ padding: containerSpace }}
        // onEndReached={loadMore}
        data={filteredGames}
        // extraData={displayList}
        keyExtractor={(item) => {
          // console.log('code ', item.game_code + item.game_provider_code)
          return item.game_code + item.game_provider_code + item.game_name
        }}
        renderItem={renderSlotItem}
        ListEmptyComponent={
          isFetching ? (
            <ActivityIndicator color={'$lightCyan'} />
          ) : (
            <Text sx={{ textAlign: 'center' }}>
              {t('common.noInfoAvailable')}
            </Text>
          )
        }
      />
    </PageSafeArea>
  )
}

Slots.TabLayoutStyle = {
  height: '100vh',
}

export default Slots
