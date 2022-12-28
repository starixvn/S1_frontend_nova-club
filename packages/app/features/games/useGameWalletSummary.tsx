import { useMemo } from 'react'
import {
  usePlayerBalanceQuery,
  usePlayerWalletDetailQuery,
} from 'services/walletApi'

export default function useGameWalletSummary(providerCode?: string) {
  const { walletDetails } = usePlayerWalletDetailQuery(undefined, {
    selectFromResult: ({ data }) => ({ ...data, walletDetails: data?.data }),
  })

  const { wallets, ...rest } = usePlayerBalanceQuery(undefined, {
    selectFromResult: (s) => ({
      ...s,
      wallets: s.data?.data,
    }),
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
    if (wallets) {
      const total = Object.values(wallets).reduce(
        (total, w) =>
          total + (Number(w.balance) ?? 0) + (Number(w.reward) ?? 0),
        0
      )

      return total > 0
    } else return true
  }, [wallets])

  return {
    ...rest,
    isSeamless,
    isTransferRequired,
  }
}
