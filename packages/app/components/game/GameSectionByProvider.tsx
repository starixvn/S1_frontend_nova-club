import { View } from 'dripsy'
import React from 'react'
import GameSectionByProviderItem from './GameSectionByProviderItem'

export default function GameSectionByProvider({ data }) {
  return (
    <View>
      {Object.keys(data).map((gpc) => {
        return (
          <GameSectionByProviderItem gpc={gpc} games={data[gpc]} key={gpc} />
        )
      })}
    </View>
  )
}
