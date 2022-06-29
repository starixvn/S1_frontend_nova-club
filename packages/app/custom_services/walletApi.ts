import { store } from 'app/provider/redux/store'
import { WALLET } from 'app/utils/constant'
import walletApi from 'services/wallet'
import { PlayerBalanceResult } from 'services/wallet.type'

export const transferAllToMainWallet = async (
  walletLists?: PlayerBalanceResult
) => {
  try {
    if (!walletLists) return

    const MAIN_WALLET_KEY = 'main'
    const vendorWalletKeyLists = Object.keys(walletLists).filter(
      (wallet) => wallet !== MAIN_WALLET_KEY
    )

    if (!vendorWalletKeyLists.length) return

    const vendorWalletPromises: Promise<any>[] = []

    vendorWalletKeyLists.forEach((vendorName: string) => {
      const vendorWallet = walletLists[vendorName]

      if (vendorWallet) {
        const { balance } = vendorWallet

        if (Number(balance) > 0) {
          const transferWalletPromise = store.dispatch(
            walletApi.endpoints.transfer.initiate({
              amount: Number(balance),
              transfer_from: Number(vendorName),
              transfer_to: WALLET.MAIN_WALLET,
            })
          )

          vendorWalletPromises.push(transferWalletPromise)
        }
      }
    })

    return await Promise.all(vendorWalletPromises)
  } catch (error) {
    console.error(error)
    return error
  }
}

const enhancedWalletApi = walletApi.enhanceEndpoints({
  endpoints: {
    playerBalance: {
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          console.log(`on query started`)
          const { data } = await queryFulfilled

          const walletLists = data.data

          // transferAllToMainWallet(walletLists)
        } catch (error) {
          console.log(error)
        }
      },
    },
  },
})

export const { usePlayerBalanceQuery } = enhancedWalletApi
export default enhancedWalletApi
