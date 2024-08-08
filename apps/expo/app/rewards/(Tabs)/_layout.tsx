import { MaterialTopTab } from 'app/navigation/navigator/MaterialTopTab'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import React from 'react'
import RewardsTabBar from 'app/features/rewards/components/RewardsTabBar'
import RewardsHeader from 'app/features/rewards/components/RewardsHeader'
import { useSx } from 'dripsy'

type Props = {}

export default function RewardLayout({}: Props) {
  const { top } = useSafeArea()

  const sx = useSx()
  return (
    <MaterialTopTab
      initialRouteName="redeem/list"
      style={sx({ bg: '$primary.500' })}
      sceneContainerStyle={sx({ bg: '$primary.700' })}
      screenOptions={{
        lazy: true,
        // swipeEnabled: false,
        // tabBarIndicator: () => null,
        // animationEnabled: false,
      }}
      tabBar={(props) => (
        <>
          <RewardsHeader />
          <RewardsTabBar />
        </>
      )}
    >
      {/*  listing this to preserve the sequence  */}
      {/* <MaterialTopTab.Screen name="daily" /> */}
      <MaterialTopTab.Screen name="redeem/list" />
      <MaterialTopTab.Screen name="redeem/how-to-earn" />
      <MaterialTopTab.Screen name="redeem/rules" />
      <MaterialTopTab.Screen name="history" />
    </MaterialTopTab>
  )
}

// const abc = ({ state, descriptors, navigation, position }) => {
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key]
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name

//         const isFocused = state.index === index

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           })

//           if (!isFocused && !event.defaultPrevented) {
//             // The `merge: true` option makes sure that the params inside the tab screen are preserved
//             navigation.navigate({ name: route.name, merge: true })
//           }
//         }

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           })
//         }

//         const inputRange = state.routes.map((_, i) => i)
//         const opacity = position.interpolate({
//           inputRange,
//           outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
//         })

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//           >
//             <Animated.Text style={{ opacity }}>{label}</Animated.Text>
//           </TouchableOpacity>
//         )
//       })}
//     </View>
//   )
// }
