// import useDefaultParamSelector from 'app/hooks/useDefaultParamSelector'
import { useAppSelector } from 'rewards/provider/redux/store'
import { useGetCoinRedemptionListQuery } from 'services/rewardApi'
import { RewardGameKeyMap } from 'utils/rewards'

export default function useGameConfig(
  gameKey: RewardGameKeyMap,
  balance: number | undefined
) {
  // rewards cannot import packages/app package
  // const defaultParams = useDefaultParamSelector()

  const currency = useAppSelector((s) => s.setting.currency)
  const locale = useAppSelector((s) => s.setting.locale)
  const { config } = useGetCoinRedemptionListQuery(
    { currency, locale },
    {
      selectFromResult: (rest) => {
        const config = rest.data?.find((g) => g.key === gameKey)
        return {
          ...rest,
          config,
        }
      },
    }
  )

  return {
    ...config,
    isSpinEnabled: !config || (balance != null && balance >= config.cost),
  }
}
