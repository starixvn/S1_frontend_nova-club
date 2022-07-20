import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Select from 'app/components/form/Select'
import { PageSafeArea } from 'app/components/layout/Page'
import SimpleGridImage from 'app/components/SimpleGridImage'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useGameGridSize from 'app/hooks/useGameGridSize'
import { ActivityIndicator, Row, useSx, View } from 'dripsy'
import { setUseProxies } from 'immer'
import React, { useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import { GameConfig } from 'services/contentApi.type'
import ListSectionHeader from '../ListSectionHeader'
import useSlotGamesFilter from '../../hooks/game/useSlotGamesFilter'
import { ProviderImageExtension } from 'app/config/games/extension'
import useLocalization from 'app/provider/localization'
import SelectSquare from 'app/components/form/Select/SelectSquare'

const Slots = () => {
  const sx = useSx()
  const { t } = useLocalization()
  const { width } = useContainerDimension()

  const { contentWidth, itemSpace, containerSpace } = useGameGridSize(3)
  const renderSlotItem = ({ item }: { item: GameConfig }) => {
    const { game_code, game_provider_code, game_name } = item
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
  } = useSlotGamesFilter()

  return (
    <PageSafeArea disableScrollView sx={{ bg: '$background' }}>
      {filteredGames.length === 0 ? (
        <ActivityIndicator
          size={'large'}
          sx={{ mt: '$8' }}
          color={'$lightCyan'}
        />
      ) : (
        <>
          <ListSectionHeader
            title={t('game.category.slots')}
            bgColor="purple"
            iconName="sl"
          >
            <Row sx={{ flex: 1, justifyContent: 'flex-end' }}>
              <Select
                actionSheetProps={{ id: 'slotType' }}
                headerTitle={t('menu.tab.gameType')}
                buttonTitle={selectedSlotType?.label ?? 'Click here to open'}
                buttonProps={{
                  sx: {
                    flex: 0.45,
                  },
                  isActive: false,
                }}
                data={slotTypeSelection}
                setSelectedValue={setSelectedSlotType}
              />
              <SelectSquare
                buttonTitle={selectedProvider.label ?? 'Click here to open'}
                buttonProps={{
                  sx: {
                    ml: '$2',
                    flex: 0.45,
                  },
                  isActive: false,
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
          />
        </>
      )}
    </PageSafeArea>
  )
}

Slots.TabLayoutStyle = {
  height: '100vh',
}

export default Slots
