import { FlashList } from '@shopify/flash-list'
import Select, {
  SelectButtonComponentProps,
} from 'app/components/form/Input/Select'
import SelectButton from 'app/components/form/Select/SelectButton'
import useLocalization from 'app/provider/localization'
import { Row, View } from 'dripsy'
import React, { useRef } from 'react'
import { Game } from 'services/contentApi.type'
import useSlotGamesFilter from '../../hooks/game/useSlotGamesFilter'
import VerticalGameList from '../games/VerticalGameList'
import ListSectionHeader from '../ListSectionHeader'

const Slots = () => {
  const { t } = useLocalization()
  const list = useRef<FlashList<Game> | null>(null)

  const {
    providerSelection,
    slotTypeSelection,
    selectedProvider,
    filteredGames,
    selectedSlotType,
    setSelectedProvider,
    setSelectedSlotType,
    isFetching,
  } = useSlotGamesFilter(list)

  const isGameReady = !isFetching

  return (
    <>
      <VerticalGameList
        // showName
        showScrollingTop
        ref={list}
        isLoading={isFetching}
        data={filteredGames}
        ListHeaderComponent={
          <ListSectionHeader
            title={t('game.category.slots')}
            bgColor="purple"
            iconName="sl"
          >
            {filteredGames ? (
              <Row sx={{ flex: 1, justifyContent: 'flex-end' }}>
                <Select
                  options={slotTypeSelection}
                  onSelected={setSelectedSlotType}
                  buttonComponent={(props: SelectButtonComponentProps) => (
                    <SelectButton
                      variants="slot"
                      chevelonButtonSize={15}
                      label={selectedSlotType?.label ?? ''}
                      containerStyle={{
                        flex: 0.3,
                        minWidth: 30,
                      }}
                      {...props}
                    />
                  )}
                  _actionSheet={{
                    sheetId: 'slot type',
                    headerTitle: t('menu.tab.gameType'),
                    variants: 'provider',
                  }}
                />

                <Select
                  options={providerSelection}
                  onSelected={setSelectedProvider}
                  buttonComponent={(props: SelectButtonComponentProps) => (
                    <SelectButton
                      variants="slot"
                      chevelonButtonSize={15}
                      label={selectedProvider?.label}
                      logo={selectedProvider?.icon}
                      containerStyle={{
                        mx: '$2',
                        flex: 0.45,
                      }}
                      {...props}
                    />
                  )}
                  isHorizontalActionSheet
                  _actionSheet={{
                    sheetId: 'slot provider',
                    headerTitle: t('menu.tab.provider'),
                    variants: 'provider',
                  }}
                />
              </Row>
            ) : (
              <View />
            )}
          </ListSectionHeader>
        }
      />
    </>
  )
}

Slots.TabLayoutStyle = {
  height: '100vh',
}

export default Slots
