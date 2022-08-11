import Select from 'app/components/form/Select'
import SelectSquare from 'app/components/form/Select/SelectSquare'
import useLocalization from 'app/provider/localization'
import { Row, View } from 'dripsy'
import React from 'react'
import useSlotGamesFilter from '../../hooks/game/useSlotGamesFilter'
import VerticalGameList from '../games/VerticalGameList'
import ListSectionHeader from '../ListSectionHeader'
const Slots = () => {
  const { t } = useLocalization()

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
      extendedState={{ isGameReady }}
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
