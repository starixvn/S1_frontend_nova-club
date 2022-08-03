import { PageWithBackHeader } from 'app/components/layout/Page'
import WebView from 'app/components/WebView'
import { useTransferAllToOneMutation } from 'app/custom_services/walletApi'
import { useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect } from 'react'
import {
  useLazyPlayerBalanceQuery,
  usePlayerWalletDetailQuery,
} from 'services/walletApi'
import { createParam } from 'solito'

const { useParam } = createParam<{ gameUrl: string; title: string }>()
const GameLoaderPage = () => {
  const [gameUrl] = useParam('gameUrl')
  const [title] = useParam('title')
  const url = gameUrl && decodeURIComponent(gameUrl)
  const targetProvider = useAppSelector((s) => s.gameLauncher.providerCode)

  const { data: walletDetails, isFetching } =
    usePlayerWalletDetailQuery(undefined)

  const [refreshWallet] = useLazyPlayerBalanceQuery()

  const [transferAllToOne] = useTransferAllToOneMutation({
    fixedCacheKey: 'transfer-all-to-one',
  })

  const isSeamlessTransfer = () => {
    if (walletDetails && walletDetails.data) {
      const walletDetailsList = walletDetails.data

      for (const walletKey in walletDetailsList) {
        const detail = walletDetailsList[walletKey]

        if (detail?.system_code === targetProvider) {
          if (detail?.seamless) return true
        }
      }
    }

    return false
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
    ScreenOrientation.unlockAsync()

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
      const isSeamless = isSeamlessTransfer()

      if (isSeamless) refreshWallet()
      else transferAllToMain()
    }
  }, [])

  return (
    <View sx={{ flex: 1, bg: '$background' }}>
      <PageWithBackHeader header={{ title: title ?? 'Game' }} disableScrollView>
        {gameUrl && <WebView url={url ?? ''} />}
      </PageWithBackHeader>
    </View>
  )
}

export default GameLoaderPage
