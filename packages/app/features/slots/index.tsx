import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import SimpleGridImage from 'app/components/SimpleGridImage'
import fishing from 'app/config/games/fishing'
import { SlotGame } from 'app/config/games/slots/slot.type'
import useContainerDimension from 'app/hooks/useContainerDimension'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { Image, Text, useSx, View } from 'dripsy'
import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useDispatch } from 'react-redux'
import BBIN from '../../config/games/slots/bbin.json'

const Slots = () => {
  const sx = useSx()
  const dispatch = useDispatch()
  const { width } = useContainerDimension()
  const { openModal, closeModal } = useModal()
  const slotGames = BBIN as SlotGame[]

  const renderSlotItem = ({ item }: { item: SlotGame }) => {
    const { gameCode, providerCode, gameName } = item
    const imageUrl = `${MEDIA_DOMAIN}${CONTENT_URI}/games/${providerCode.toLowerCase()}/${gameCode}.jpg`

    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(
            GameLauncherActions.launchGame({
              gameCode: item.gameCode,
              providerCode: item.providerCode,
              context: ContextualModuleKey.Slot,
            })
          )
          // openModal('PreLaunchGame')
          // launch game with provider code and game code
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: width * 0.4,
            height: (width * 0.4) / 1.032,
          }}
        />
        <Text>{gameName}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <FlatList<SlotGame>
      numColumns={2}
      style={sx({ bg: '$background' })}
      keyExtractor={(item) => item.gameCode}
      renderItem={renderSlotItem}
      data={slotGames}
    />
  )
}

export default withContextualNav(Slots, ContextualModuleKey.Slot)
