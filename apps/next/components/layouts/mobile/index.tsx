import dynamic from 'next/dynamic'
import { ActivityIndicator, View } from 'react-native'

export const MobileBaseLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <View>{children}</View>
}

export const MobileTabLayout = dynamic(() => import('./TabLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})
