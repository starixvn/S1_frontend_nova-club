import { PageWithBackHeader } from 'app/components/layout/Page'
import WebView from 'app/components/WebView'
import { View } from 'dripsy'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { createParam } from 'solito'

const { useParam } = createParam<{ depositUrl: string; title: string }>()
const DepositLoaderScreen = () => {
  const [depositUrl, setDepositUrl] = useParam('depositUrl', { initial: '' })
  const [title] = useParam('title')
  console.log(
    '🚀 ~ file: index.tsx ~ line 11 ~ DepositLoaderScreen ~ title',
    title
  )
  const url = depositUrl && decodeURIComponent(depositUrl)
  console.log('🚀 ~ file: index.tsx ~ line 12 ~ DepositLoaderScreen ~ url', url)
  useEffect(() => {
    console.log('depositUrl', depositUrl)
    console.log('title', title)
    console.log('url', url)
  }, [depositUrl])

  return (
    <View sx={{ flex: 1 }}>
      <PageWithBackHeader header={{ title: title }} disableScrollView>
        {depositUrl && Platform.OS === 'web' ? (
          <iframe src={url} height="100%" />
        ) : (
          <WebView url={url} />
        )}
      </PageWithBackHeader>
    </View>
  )
}

export default DepositLoaderScreen
