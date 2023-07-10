import dynamic from 'next/dynamic'

const LazyDesktopDownloadGuideScreen = dynamic(
  () => import('desktop-ext/features/download/DownloadPage'),
  { ssr: false }
)

export default LazyDesktopDownloadGuideScreen
