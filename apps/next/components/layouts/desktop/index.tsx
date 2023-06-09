import dynamic from 'next/dynamic'
import { ActivityIndicator } from 'react-native'

export const DesktopBaseLayout = dynamic(() => import('./BaseLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})
