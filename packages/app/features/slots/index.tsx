import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Select from 'app/components/form/Select'
import SelectSquare from 'app/components/form/Select/SelectSquare'
import { PageSafeArea } from 'app/components/layout/Page'
import SimpleGridImage from 'app/components/SimpleGridImage'
import { ProviderImageExtension } from 'app/config/games/extension'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useGameGridSize from 'app/hooks/useGameGridSize'
import useLocalization from 'app/provider/localization'
import { Currency, GAME_TYPE_CODE } from 'app/utils/constant'
import { ActivityIndicator, Row, Text, useSx, View } from 'dripsy'
import React from 'react'
import { FlatList } from 'react-native'
import { useGetGameListQuery } from 'services/contentApi'
import { GameConfig } from 'services/contentApi.type'
import { usePlayerProfileQuery } from 'services/playerApi'
import useSlotGamesFilter from '../../hooks/game/useSlotGamesFilter'
import VerticalGameList from '../games/VerticalGameList'
import ListSectionHeader from '../ListSectionHeader'

const Slots = () => {
  const sx = useSx()
  const { t } = useLocalization()
  const { width } = useContainerDimension()

  const { contentWidth, itemSpace, containerSpace } = useGameGridSize(3)

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
    <VerticalGameList
      isLoading={isFetching}
      games={filteredGames}
      ListHeaderComponent={
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
                    size: 16,
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
                    size: 16,
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
      }
    />
  )
}

Slots.TabLayoutStyle = {
  height: '100vh',
}

export default Slots
