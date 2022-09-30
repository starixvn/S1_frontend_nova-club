import { PageWithBackHeader } from 'app/components/layout/Page'
import WebView from 'app/components/WebView'
import { useTransferAllToOneMutation } from 'app/custom_services/walletApi'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'
import { useEffect } from 'react'
import {
  useLazyPlayerBalanceQuery,
  usePlayerWalletDetailQuery,
} from 'services/walletApi'
import { createParam } from 'solito'

const { useParam } = createParam<{ gameUrl: string; title: string }>()
const GameLoaderPage = () => {
  const { left, right } = useSafeArea()
  const [gameUrl] = useParam('gameUrl')
  const [title] = useParam('title')
  const url = gameUrl // && decodeURIComponent(gameUrl) // decode will cause %3d%3d in the token value to become ==
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
    // ScreenOrientation.unlockAsync()

    return () => {
      // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
      const isSeamless = isSeamlessTransfer()

      if (isSeamless) refreshWallet()
      else transferAllToMain()
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
        {gameUrl && <WebView url={url?.trim() ?? ''} />}
      </PageWithBackHeader>
    </View>
  )
}

export default GameLoaderPage
