import { PageWithBackHeader } from 'app/components/layout/Page'
import WebView from 'app/components/WebView'
import { View } from 'dripsy'
import { createParam } from 'solito'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect } from 'react'

const { useParam } = createParam<{ gameUrl: string; title: string }>()
const GameLoaderPage = () => {
  const [gameUrl] = useParam('gameUrl')
  const [title] = useParam('title')
  const url = gameUrl && decodeURIComponent(gameUrl)

  useEffect(() => {
    ScreenOrientation.unlockAsync()

    return () =>
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }, [])

  return (
    <View sx={{ flex: 1, bg: '$background' }}>
      <PageWithBackHeader header={{ title: title ?? 'Game' }} disableScrollView>
        {gameUrl && <WebView url={url} />}
      </PageWithBackHeader>
    </View>
  )
}

export default GameLoaderPage
