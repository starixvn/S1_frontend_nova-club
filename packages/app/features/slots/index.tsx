import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Select from 'app/components/form/Select'
import { PageSafeArea } from 'app/components/layout/Page'
import SimpleGridImage from 'app/components/SimpleGridImage'
import { SlotGame } from 'app/config/games/slots/slot.type'
import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { useSx, View } from 'dripsy'
import { setUseProxies } from 'immer'
import React, { useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import ListSectionHeader from '../ListSectionHeader'
import useSlotGamesFilter from './useSlotGamesFilter'

const Slots = () => {
  const sx = useSx()
  const dispatch = useDispatch()
  const { width } = useContainerDimension()
  const { openModal, closeModal } = useModal()
  const leftRightSpace = (width - 4) * HOME_PADDING * 0.5
  const renderSlotItem = ({ item }: { item: SlotGame }) => {
    const { gameCode, providerCode, gameName } = item
    const imageUrl = `${MEDIA_DOMAIN}${CONTENT_URI}/games/${providerCode.toLowerCase()}/${gameCode.toLowerCase()}.jpg`
    return (
      <SimpleGridImage
        gameName={item.gameName}
        providerCode={item.providerCode}
        gameCode={item.gameCode}
        image={imageUrl}
        title={item.gameName}
        showTitle={true}
      />
      // <TouchableOpacity
      //   onPress={() => {
      //     dispatch(
      //       GameLauncherActions.launchGame({
      //         gameCode: item.gameCode,
      //         providerCode: item.providerCode,
      //         context: ContextualModuleKey.Slot,
      //       })
      //     )
      //     // openModal('PreLaunchGame')
      //     // launch game with provider code and game code
      //   }}
      // >
      //   <Image
      //     source={{ uri: imageUrl }}
      //     style={{
      //       width: width * 0.4,
      //       height: (width * 0.4) / 1.032,
      //     }}
      //   />
      //   <Text>{gameName}</Text>
      // </TouchableOpacity>
    )
  }

  const {
    providerSelection,
    slotTypeSelection,
    filteredGames,
    selectedProvider,
    selectedSlotType,
    setSelectedProvider,
    setSelectedSlotType,
  } = useSlotGamesFilter()
  return (
    <PageSafeArea disableScrollView sx={{ bg: '$background' }}>
      <View>
        <ListSectionHeader
          title={'keno/lottery'}
          bgColor="purple"
          iconName="lt"
        />
        <Select
          actionSheetProps={{ id: 'slotType' }}
          headerTitle={'Game Type'}
          buttonTitle={selectedSlotType ?? 'Click here to oopen'}
          buttonProps={{
            sx: {
              m: 10,
            },
            isActive: false,
          }}
          data={slotTypeSelection}
          setSelectedValue={setSelectedSlotType}
        />
        <Select
          actionSheetProps={{ id: 'providerSelection' }}
          headerTitle={'Providers'}
          buttonTitle={selectedProvider ?? 'Click here to oopen'}
          buttonProps={{
            sx: {
              m: 10,
            },
            isActive: false,
          }}
          value={selectedProvider}
          data={providerSelection}
          setSelectedValue={setSelectedProvider}
        />
      </View>

      <View
        sx={{
          p: leftRightSpace,
          borderWidth: 2,
          borderColor: 'transparent',
          flex: 1,
        }}
      >
        <FlatList<SlotGame>
          numColumns={2}
          style={sx({ bg: '$background' })}
          keyExtractor={(item) => item.gameCode}
          renderItem={renderSlotItem}
          data={filteredGames}
        />
      </View>
    </PageSafeArea>
  )
}

export default withContextualNav(Slots, ContextualModuleKey.Slot)
