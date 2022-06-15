import { PageWithBackHeader } from 'app/components/layout/Page'
import WebView from 'app/components/WebView'
import { View } from 'dripsy'
import { createParam } from 'solito'

const { useParam } = createParam<{ gameUrl: string }>()
const GameLoaderPage = () => {
  const [gameUrl] = useParam('gameUrl')
  const url = gameUrl && decodeURIComponent(gameUrl)

  return (
    <View sx={{ flex: 1, bg: '$background' }}>
      <PageWithBackHeader header={{ title: 'Game' }}>
        {gameUrl && <WebView url={url} />}
      </PageWithBackHeader>
    </View>
  )
}

export default GameLoaderPage
