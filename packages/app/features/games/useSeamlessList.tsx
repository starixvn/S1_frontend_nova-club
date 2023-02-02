import { useAppSelector } from 'app/provider/redux/store'
import { useMemo } from 'react'
import { usePlayerWalletDetailQuery } from 'services/walletApi'

export default function useSeamlessList() {
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const { walletDetails } = usePlayerWalletDetailQuery(undefined, {
    skip: !token,
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
