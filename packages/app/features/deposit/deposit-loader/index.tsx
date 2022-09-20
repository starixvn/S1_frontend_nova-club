import { PageWithBackHeader } from 'app/components/layout/Page'
import WebView from 'app/components/WebView'
import { View } from 'dripsy'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { createParam } from 'solito'

const { useParam } = createParam<{ depositUrl: string; title: string }>()
const DepositLoaderScreen = () => {
  const [depositUrl] = useParam('depositUrl', { initial: '' })
  const [title] = useParam('title')

  const url = depositUrl && decodeURIComponent(depositUrl)

  return (
    <PageWithBackHeader header={{ title: title }} disableScrollView>
      <View sx={{ flex: 1 }}>
        {Platform.OS === 'web' ? (
          <iframe src={url} height="100%" style={{ flex: 1 }} />
        ) : (
          <WebView url={url} />
        )}
      </View>
    </PageWithBackHeader>
  )
}

export default DepositLoaderScreen
