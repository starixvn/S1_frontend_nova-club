import useDefaultParamSelector from 'app/hooks/useDefaultParamSelector'
import { useGetCoinRedemptionListQuery } from 'services/rewardApi'
import { RewardGameKeyMap } from 'utils/rewards'

export default function useGameConfig(
  gameKey: RewardGameKeyMap,
  balance: number | undefined
) {
  const defaultParams = useDefaultParamSelector()
  const { config } = useGetCoinRedemptionListQuery(defaultParams, {
    selectFromResult: (rest) => {
      const config = rest.data?.find((g) => g.key === gameKey)
      return {
        ...rest,
        config,
      }
    },
  })

  return {
    ...config,
    isSpinEnabled: !config || (balance != null && balance >= config.cost),
  }
}
