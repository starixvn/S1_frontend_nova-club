import dynamic from 'next/dynamic'

const LazyDesktopDepositScreen = dynamic(
  () => import('desktop-ext/features/download/DownloadPage'),
  { ssr: false }
)

export default LazyDesktopDepositScreen
