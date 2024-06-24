import EuroBottomTab from 'app/features/event/euroCup/components/EuroBottomTab'
import { Tabs, usePathname } from 'expo-router'
import { View } from 'react-native'

export default function Root() {
  const pathname = usePathname()

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        backBehavior="none"
        tabBar={() => null}
        screenOptions={{
          headerShown: false,
        }}
      />

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        {!pathname.includes('winner') && <EuroBottomTab />}
      </View>
    </View>
  )
}
