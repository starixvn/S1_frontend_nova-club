import { RewardGameKeyMap } from 'utils/rewards'
import dynamic from 'next/dynamic'

const TncComponent = {
  [RewardGameKeyMap.ANGPAO_HUNT]: dynamic(() => import('../AngpaoTnc')),
  [RewardGameKeyMap.FORTUNE_CAT]: dynamic(() => import('../FortuneCatTnc')),
  [RewardGameKeyMap.GOLDEN_CAT]: dynamic(() => import('../GoldenCatTnc')),
  [RewardGameKeyMap.SPIN_N_WIN]: dynamic(() => import('../SpinWinTnc')),
  [RewardGameKeyMap.MYSTERY_DROP]: dynamic(() => import('../MysteryDropTnc')),
}

export const getTncComponent = (gameKey: string) => {
  const Component = TncComponent[gameKey]

  if (typeof Component === 'undefined') {
    console.error(
      `'getTncComponent' return undefined. Please make sure 'TncComponent' mapping is correct`
    )
    return
  }

  const dynamicImportedComponent = <Component />
  return dynamicImportedComponent
}
