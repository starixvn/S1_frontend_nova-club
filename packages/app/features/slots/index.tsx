import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import SimpleGridImage from 'app/components/SimpleGridImage'
import { SlotGame } from 'app/config/games/slots/slot.type'
import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { useSx, View } from 'dripsy'
import React from 'react'
import { FlatList } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import BBIN from '../../config/games/slots/bbin.json'
import ListSectionHeader from '../ListSectionHeader'

const Slots = () => {
  const sx = useSx()
  const dispatch = useDispatch()
  const { width } = useContainerDimension()
  const { openModal, closeModal } = useModal()
  const slotGames = BBIN as SlotGame[]
  const leftRightSpace = (width - 4) * HOME_PADDING * 0.5
  const renderSlotItem = ({ item }: { item: SlotGame }) => {
    const { gameCode, providerCode, gameName } = item
    const imageUrl = `${MEDIA_DOMAIN}${CONTENT_URI}/games/${providerCode.toLowerCase()}/${gameCode}.jpg`

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
  return (
    <View sx={{ bg: '$background' }}>
      <ListSectionHeader
        title={'keno/lottery'}
        bgColor="purple"
        iconName="lt"
      />
      <View
        sx={{ p: leftRightSpace, borderWidth: 2, borderColor: 'transparent' }}
      >
        <FlatList<SlotGame>
          numColumns={2}
          style={sx({ bg: '$background' })}
          keyExtractor={(item) => item.gameCode}
          renderItem={renderSlotItem}
          data={slotGames}
        />
      </View>
    </View>
  )
}

export default withContextualNav(Slots, ContextualModuleKey.Slot)
