import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { Game } from 'services/contentApi.type'

const VGaming = () => {
  const { width } = useWindowDimensions()

  const launchVGaming = () => {
    const action = {
      type: ActionType.GAME,
      payload: {
        tags: [],
        name: {
          en: 'VGaming',
          vi: 'Fish Prawn Crab',
        },
        gc: 'Vgaming:3804',
        gpc: 'SABA',
        gtc: 'games',
        img: `${MEDIA_DOMAIN}/nvclub/nova-club/content/games/hotgames/Vgaming-FishPrawnCrabl.jpg`,
      } as Game,
    }

    getAction(action)()
  }

  const vGamingSize = Math.min(110, width * 0.2)

  return (
    <TouchableOpacity onPress={launchVGaming}>
      <Image
        source={{
          uri: `${MEDIA_DOMAIN}${CONTENT_URI}/Vgaming-icon.gif`,
        }}
        style={{
          width: vGamingSize,
          height: vGamingSize,
          marginBottom: 10,
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  )
}

export default VGaming
