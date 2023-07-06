import { FlashList } from '@shopify/flash-list'
import GameCard from 'app/components/game/GameCard'
import { useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import React from 'react'
import { Game } from 'services/gameApi.type'
/* DEPRECATED */

type Props = {
  data: Game[]
}

export default function GameSectionByProviderItemFlashList({ data }: Props) {
  const locale = useAppSelector((s) => s.setting.locale)

  return (
    <View
      sx={{ borderWidth: 2, borderColor: '$primary.300', p: ['$2'], flex: 1 }}
    >
      <FlashList
        style={{ flex: 1 }}
        data={data}
        numColumns={7}
        extraData={locale}
        renderItem={({ item }) => {
          return (
            <View sx={{ flex: 1, p: ['$2'] }}>
              <GameCard sx={{ flex: 1 }} {...item} />
            </View>
          )
        }}
      />
    </View>
  )
}
