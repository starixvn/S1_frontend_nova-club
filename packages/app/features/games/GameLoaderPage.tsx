import { useTransferAllToOneMutation } from 'app/custom_services/walletApi'
import { PageWithBackHeader } from 'app/components/layout/Page'
import WebView from 'app/components/WebView'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'
import { useEffect } from 'react'
import {
  useLazyPlayerBalanceQuery,
  usePlayerWalletDetailQuery,
} from 'services/walletApi'
import { createParam } from 'solito'

const { useParam } = createParam<{
  gameUrl: string
  title: string
  providerCode: string
}>()
const GameLoaderPage = ({}) => {
  const { left, right } = useSafeArea()
  const [gameUrl] = useParam('gameUrl')
  const [title] = useParam('title')
  const [providerCode] = useParam('providerCode')

  const { walletDetails } = usePlayerWalletDetailQuery(undefined, {
    selectFromResult: ({ data }) => ({ ...data, walletDetails: data?.data }),
  })
  const [refreshWallet] = useLazyPlayerBalanceQuery()

  const [transferAllToOne] = useTransferAllToOneMutation({
    fixedCacheKey: 'transfer-all-to-one',
  })

  const isSeamlessTransfer = () => {
    if (walletDetails) {
      console.log('walletDetails', walletDetails['12'], providerCode)
      return Object.keys(walletDetails).some((k) => {
        const wallet = walletDetails[k]
        return (
          wallet && wallet.system_code === providerCode && wallet.seamless === 1
        )
      })
    } else return false
  }

  async function transferAllToMain() {
    try {
      await transferAllToOne({
        transfer_from: 999,
        transfer_to: 0,
      }).unwrap()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    return () => {
      isSeamlessTransfer() ? refreshWallet() : transferAllToMain()
    }
  }, [])

  return (
    <View
      sx={{
        flex: 1,
        bg: 'black',
        paddingLeft: left,
        paddingRight: right,
      }}
    >
      <PageWithBackHeader header={{ title: title ?? 'Game' }} disableScrollView>
        {gameUrl && <WebView url={gameUrl.trim() ?? ''} />}
      </PageWithBackHeader>
    </View>
  )
}

export default GameLoaderPage
