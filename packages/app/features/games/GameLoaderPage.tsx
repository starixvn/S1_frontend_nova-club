import { PageWithBackHeader } from 'app/components/layout/Page'
import WebView from 'app/components/WebView'
import { View } from 'dripsy'
import { createParam } from 'solito'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect } from 'react'
import { useTransferAllToOneMutation } from 'app/custom_services/walletApi'

const { useParam } = createParam<{ gameUrl: string; title: string }>()
const GameLoaderPage = () => {
  const [gameUrl] = useParam('gameUrl')
  const [title] = useParam('title')
  const url = gameUrl && decodeURIComponent(gameUrl)

  const [transferAllToOne] = useTransferAllToOneMutation({
    fixedCacheKey: 'transfer-all-to-one',
  })

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
      transferAllToMain()
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
