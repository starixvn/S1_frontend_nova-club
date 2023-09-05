import React from 'react'
import { RewardGameKeyMap } from 'utils/rewards'
import SpinWinTnc from '../SpinWinTnc'
import AngpaoTnc from '../AngpaoTnc'
import GoldenCatTnc from '../GoldenCatTnc'
import FortuneCatTnc from '../FortuneCatTnc'

const TncComponent = {
  [RewardGameKeyMap.ANGPAO_HUNT]: <AngpaoTnc />,
  [RewardGameKeyMap.FORTUNE_CAT]: <FortuneCatTnc />,
  [RewardGameKeyMap.GOLDEN_CAT]: <GoldenCatTnc />,
  [RewardGameKeyMap.SPIN_N_WIN]: <SpinWinTnc />,
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
