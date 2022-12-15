import Image from 'app/components/common/Image'
import { PageWithBackHeader } from 'app/components/layout/Page'
import WebView from 'app/components/WebView'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ActivityIndicator, View } from 'dripsy'
import { useEffect } from 'react'
import { useLazyPlayerBalanceQuery } from 'services/walletApi'
import { createParam } from 'solito'

const { useParam } = createParam<{ gameUrl: string; title: string }>()
const GameLoaderPage = ({}) => {
  const { left, right } = useSafeArea()
  const [gameUrl] = useParam('gameUrl')
  const [title] = useParam('title')
  const url = gameUrl

  const [refreshWallet] = useLazyPlayerBalanceQuery()

  useEffect(() => {
    return () => {
      refreshWallet()
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
