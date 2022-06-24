import { PageWithBackHeader } from 'app/components/layout/Page'
import WebView from 'app/components/WebView'
import { View } from 'dripsy'
import { createParam } from 'solito'

const { useParam } = createParam<{ depositUrl: string }>()
const DepositLoaderScreen = () => {
  const [depositUrl] = useParam('depositUrl')
  const url = depositUrl && decodeURIComponent(depositUrl)

  return (
    <View sx={{ flex: 1, bg: '$background' }}>
      <PageWithBackHeader header={{ title: 'menu.deposit' }}>
        {depositUrl && <WebView url={url} />}
      </PageWithBackHeader>
    </View>
  )
}

export default DepositLoaderScreen
