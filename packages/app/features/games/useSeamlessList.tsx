import { useMemo } from 'react'
import { usePlayerWalletDetailQuery } from 'services/walletApi'

export default function useSeamlessList() {
  const { walletDetails } = usePlayerWalletDetailQuery(undefined, {
    selectFromResult: ({ data }) => ({ ...data, walletDetails: data?.data }),
  })

  const seamlessProviderList = useMemo(() => {
    if (walletDetails) {
      return Object.values(walletDetails).map((data, index) => {
        if (data.seamless) {
          return data.system_code
        }
      })
    }
    return []
  }, [walletDetails])

  return {
    seamlessProviderList,
  }
}
