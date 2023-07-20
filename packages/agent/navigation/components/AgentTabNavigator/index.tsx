import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import {
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  TabNavigationState,
  TabRouter,
  TabRouterOptions,
  useNavigationBuilder,
} from '@react-navigation/native'
import { useAgentLocalization } from 'app/provider/localization'
import * as React from 'react'
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import AgentShareholderTabs from './AgentShareholderTabs'
import AnnouncementSection from 'agent/components/Announcement/AnnouncementSection'

// Props accepted by the view
type TabNavigationConfig = {
  // tabBarStyle: StyleProp<ViewStyle>
  // contentStyle: StyleProp<ViewStyle>
}

// Supported screen options
type TabNavigationOptions = {
  title?: string
} & BottomTabNavigationOptions

// Map of event name and the type of data (in event.data)
//
// canPreventDefault: true adds the defaultPrevented property to the
// emitted events.
type TabNavigationEventMap = {
  tabPress: {
    data: { isAlreadyFocused: boolean }
    canPreventDefault: true
  }
}

// The props accepted by the component is a combination of 3 things
type Props = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap
> &
  TabRouterOptions &
  TabNavigationConfig

function AgentTabNavigator({
  initialRouteName,
  children,
  screenOptions,
}: Props) {
  const { t } = useAgentLocalization()
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder(TabRouter, {
      children,
      screenOptions,
      initialRouteName,
    })

  const focusedRouteKey = state.routes[state.index].key
  const [loaded, setLoaded] = React.useState([focusedRouteKey])

  if (!loaded.includes(focusedRouteKey)) {
    setLoaded([...loaded, focusedRouteKey])
  }

  return (
    <NavigationContent>
      <AgentShareholderTabs />
      <AnnouncementSection />

      <View style={[{ flex: 1 }]}>
        {state.routes.map((route, i) => {
          const isFocused = i === state.index
          const descriptor = descriptors[route.key]
          const { options } = descriptor

          const { lazy = true, unmountOnBlur } = options

          if (unmountOnBlur && !isFocused) {
            return null
          }

          if (lazy && !loaded.includes(route.key) && !isFocused) {
            // Don't render a lazy screen if we've never navigated to it
            return null
          }

          return (
            <React.Fragment key={route.key}>
              {Platform.OS === 'android' ? (
                <View key={route.key} style={[StyleSheet.absoluteFill]}>
                  <View
                    style={{
                      display: i === state.index ? 'flex' : 'none',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    {descriptor.render()}
                  </View>
                </View>
              ) : (
                <View
                  key={route.key}
                  style={[
                    StyleSheet.absoluteFill,
                    { display: i === state.index ? 'flex' : 'none' },
                  ]}
                >
                  {descriptor.render()}
                </View>
              )}
            </React.Fragment>
          )
        })}
      </View>
    </NavigationContent>
  )
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
  },
})

export const createAgentTabNavigator = createNavigatorFactory(AgentTabNavigator)
