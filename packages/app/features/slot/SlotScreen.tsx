import GameListByProvider from 'app/components/game/GameListByProvider'
import GameFilterProvider from 'app/provider/gameFilter/GameFilterProvider'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import React from 'react'

export default function SlotScreen() {
  return (
    <GameFilterProvider
      gameTypes={[GAME_TYPE_CODE.SLOTS, GAME_TYPE_CODE.FISHING]}
    >
      <GameListByProvider />
    </GameFilterProvider>
  )
}
