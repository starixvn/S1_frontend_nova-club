import { useAppSelector } from 'app/provider/redux/store'
import { useMemo } from 'react'
import {
  usePlayerBalanceQuery,
  usePlayerWalletDetailQuery,
} from 'services/walletApi'

export default function useGameWalletSummary(providerCode?: string) {
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const { walletDetails } = usePlayerWalletDetailQuery(undefined, {
    skip: !token,
    selectFromResult: ({ data }) => ({ ...data, walletDetails: data?.data }),
  })

  const { data, ...rest } = usePlayerBalanceQuery(undefined, {
    skip: !token,
  })

  const isSeamless = useMemo(() => {
    return walletDetails && providerCode
      ? Object.keys(walletDetails).some((k) => {
          const wallet = walletDetails[k]
          return (
            wallet &&
            wallet.system_code === providerCode &&
            wallet.seamless === 1
          )
        })
      : false
  }, [walletDetails, providerCode])

  const isTransferRequired = useMemo(() => {
    if (data) {
      return data.totalBalance + data.totalReward > 0
    } else return true
  }, [])

  return {
    ...rest,
    isSeamless,
    isTransferRequired,
  }
}
