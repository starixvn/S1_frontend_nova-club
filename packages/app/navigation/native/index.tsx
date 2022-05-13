import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TestCarousel from 'app/features/TestCarousel'
import TestModal from '../../../../apps/next/pages/test-modal'

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import MainHeader from '../MainHeader'
import TabNavigation from './TabNavigation'

const Stack = createNativeStackNavigator<{
  BottomNav: undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        header: ({ navigation, route, options }) => {
          const title = route.name

          return <MainHeader navigation={navigation} title={title} />
        },
      }}
    >
      <Stack.Screen name="BottomNav" component={TabNavigation} />
    </Stack.Navigator>
  )
}
