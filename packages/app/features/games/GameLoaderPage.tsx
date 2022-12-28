import { useTransferAllToOneMutation } from 'app/custom_services/walletApi'
import { PageWithBackHeader } from 'app/components/layout/Page'
import WebView from 'app/components/WebView'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'
import { useEffect, useMemo } from 'react'
import {
  useLazyPlayerBalanceQuery,
  usePlayerBalanceQuery,
  usePlayerWalletDetailQuery,
} from 'services/walletApi'
import { createParam } from 'solito'
import useLoading from 'app/hooks/useLoading'
import useGameWalletSummary from './useGameWalletSummary'

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

  const { toggleLoading } = useLoading()

  const {
    refetch: refreshWallet,
    isSeamless,
    isTransferRequired,
  } = useGameWalletSummary(providerCode)

  const [transferAllToOne] = useTransferAllToOneMutation({
    fixedCacheKey: 'transfer-all-to-one',
  })

  async function transferAllToMain() {
    try {
      toggleLoading(true)
      await transferAllToOne({
        transfer_from: 999,
        transfer_to: 0,
      }).unwrap()
    } catch (error) {
      console.error(error)
    } finally {
      toggleLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      if (isSeamless) refreshWallet()
      else if (isTransferRequired) transferAllToMain()
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
