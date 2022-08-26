import Select from 'app/components/form/Select'
import SelectButton from 'app/components/form/Select/SelectButton'
import SelectSquare from 'app/components/form/Select/SelectSquare'
import useLocalization from 'app/provider/localization'
import { Row, View } from 'dripsy'
import React, { useRef, useState } from 'react'
import ActionSheet from 'react-native-actions-sheet'
import useSlotGamesFilter from '../../hooks/game/useSlotGamesFilter'
import VerticalGameList from '../games/VerticalGameList'
import ListSectionHeader from '../ListSectionHeader'
const Slots = () => {
  const { t } = useLocalization()
  const gameTypeRef = useRef<ActionSheet>()
  const slotProviderRef = useRef<ActionSheet>()
  const [providerLogo, setProviderLogo] = useState('')

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

  const openGameTypeActionSheet = () => {
    gameTypeRef.current?.show()
  }

  const openSlotProviderActionSheet = () => {
    slotProviderRef.current?.show()
  }

  return (
    <>
      <VerticalGameList
        // showName
        isLoading={isFetching}
        data={filteredGames}
        ListHeaderComponent={
          <ListSectionHeader
            title={t('game.category.slots')}
            bgColor="purple"
            iconName="sl"
          >
            {isGameReady ? (
              <Row sx={{ flex: 1, justifyContent: 'flex-end' }}>
                <SelectButton
                  onOpen={openGameTypeActionSheet}
                  title={selectedSlotType?.label ?? 'Click here to open'}
                  isActive={false}
                  buttonContentProps={{
                    gradient: 'plainLightBlue',
                    sx: {
                      borderRadius: 20,
                      minHeight: 40,
                    },
                  }}
                  iconProps={{
                    size: 16,
                  }}
                  sx={{ flex: 0.3 }}
                />

                <SelectButton
                  onOpen={openSlotProviderActionSheet}
                  title={selectedProvider.label ?? 'Click here to open'}
                  icon={providerLogo}
                  sx={{
                    mx: '$2',
                    flex: 0.45,
                  }}
                  isActive={false}
                  buttonContentProps={{
                    gradient: 'plainLightBlue',
                    sx: {
                      borderRadius: 20,
                      minHeight: 40,
                    },
                  }}
                  iconProps={{
                    size: 16,
                  }}
                />
              </Row>
            ) : (
              <View />
            )}
          </ListSectionHeader>
        }
      />

      <Select
        ref={gameTypeRef}
        button={() => null}
        actionSheetProps={{ id: 'slotType' }}
        headerTitle={t('menu.tab.gameType')}
        data={slotTypeSelection}
        setSelectedValue={setSelectedSlotType}
      />

      <SelectSquare
        isShowButton={false}
        ref={slotProviderRef}
        setIcon={setProviderLogo}
        _dataList={{
          data: providerSelection,
          setSelectedValue: setSelectedProvider,
        }}
        _actionSheet={{
          id: 'slot provider',
          headerTitle: t('menu.tab.provider'),
        }}
        actionSheetProps={{
          actionSheetItemProps: {
            containerStyle: {
              bg: '$primary',
              p: '$2',
            },
            imageStyle: {
              bg: '$transparent',
            },
          },
        }}
      />
    </>
  )
}

Slots.TabLayoutStyle = {
  height: '100vh',
}

export default Slots
