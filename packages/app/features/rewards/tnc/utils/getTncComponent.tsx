import React from 'react'
import { RewardGameKeyMap } from 'utils/rewards'
import AngpaoTnc from '../AngpaoTnc'
import FortuneCatTnc from '../FortuneCatTnc'
import GoldenCatTnc from '../GoldenCatTnc'
import MysteryDropTnc from '../MysteryDropTnc'
import ScratchCardTnc from '../ScratchCardTnc'
import SpinWinTnc from '../SpinWinTnc'

const TncComponent = {
  [RewardGameKeyMap.ANGPAO_HUNT]: <AngpaoTnc />,
  [RewardGameKeyMap.FORTUNE_CAT]: <FortuneCatTnc />,
  [RewardGameKeyMap.GOLDEN_CAT]: <GoldenCatTnc />,
  [RewardGameKeyMap.SPIN_N_WIN]: <SpinWinTnc />,
  [RewardGameKeyMap.MYSTERY_DROP]: <MysteryDropTnc />,
  [RewardGameKeyMap.SCRATCH_CARD]: <ScratchCardTnc />,
}

export const getTncComponent = (gameKey: string) => {
  const component = TncComponent[gameKey]

  if (typeof component === 'undefined') {
    console.error(
      `'getTncComponent' return undefined. Please make sure 'TncComponent' mapping is correct`
    )
    return
  }

  return component
}
