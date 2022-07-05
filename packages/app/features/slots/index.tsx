import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Select from 'app/components/form/Select'
import { PageSafeArea } from 'app/components/layout/Page'
import SimpleGridImage from 'app/components/SimpleGridImage'
import { GameConfig } from 'app/global'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useGameGridSize from 'app/hooks/useGameGridSize'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { Row, useSx, View } from 'dripsy'
import { setUseProxies } from 'immer'
import React, { useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import ListSectionHeader from '../ListSectionHeader'
import useSlotGamesFilter from './useSlotGamesFilter'
const SlotImageExtensionMapping = {
  cq9: 'png',
}

const Slots = withContextualNav(() => {
  const sx = useSx()
  const { width } = useContainerDimension()

  const { contentWidth, itemSpace, containerSpace } = useGameGridSize(3)
  const renderSlotItem = ({ item }: { item: GameConfig }) => {
    const { gameCode, providerCode, gameName } = item
    const imageUrl = `${MEDIA_DOMAIN}${CONTENT_URI}/games/${providerCode.toLowerCase()}/${gameCode.toLowerCase()}.${
      SlotImageExtensionMapping[providerCode.toLowerCase()] ?? 'jpg'
    }`

    return (
      <SimpleGridImage
        sx={{ m: itemSpace }}
        gameName={item.gameName}
        providerCode={item.providerCode}
        gameCode={item.gameCode}
        image={imageUrl}
        title={item.vi ?? item.gameName}
        context={ContextualModuleKey.Slot}
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
      <ListSectionHeader title={'Slots'} bgColor="purple" iconName="lt">
        <Row sx={{ flex: 1, justifyContent: 'flex-end' }}>
          <Select
            actionSheetProps={{ id: 'slotType' }}
            headerTitle={'Game Type'}
            buttonTitle={selectedSlotType?.label ?? 'Click here to open'}
            buttonProps={{
              sx: {
                flex: 0.4,
              },
              isActive: false,
            }}
            data={slotTypeSelection}
            setSelectedValue={setSelectedSlotType}
          />
          <Select
            actionSheetProps={{ id: 'providerSelection' }}
            headerTitle={'Providers'}
            buttonTitle={selectedProvider.label ?? 'Click here to open'}
            buttonProps={{
              sx: {
                ml: '$2',
                flex: 0.4,
              },
              isActive: false,
            }}
            data={providerSelection}
            setSelectedValue={setSelectedProvider}
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
        keyExtractor={(item) => item.gameCode}
        renderItem={renderSlotItem}
      />
    </PageSafeArea>
  )
}, ContextualModuleKey.Slot)

Slots.TabLayoutStyle = {
  height: '100vh',
}

export default Slots
