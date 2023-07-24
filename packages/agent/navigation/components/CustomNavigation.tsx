import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import {
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  TabActions,
  TabNavigationState,
  TabRouter,
  TabRouterOptions,
  useNavigationBuilder,
} from '@react-navigation/native'
import Text from 'agent/components/Text'
import { useAgentLocalization } from 'app/provider/localization'
import { useDripsyTheme } from 'dripsy'
import * as React from 'react'
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { NavIcon } from './NavIcon'

const TAB_HEIGHT = 70

// Props accepted by the view
type TabNavigationConfig = {
  tabBarStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
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

function TabNavigator({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
  contentStyle,
}: Props) {
  const { theme } = useDripsyTheme()
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
      <View
        style={[
          {
            flexDirection: 'row',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            zIndex: 2,
          },
          tabBarStyle,
        ]}
      >
        {state.routes.map((route, index) => {
          const isFocused = index === state.index
          const descriptor = descriptors[route.key]
          const currentRoute = descriptor
          const { options } = descriptor

          const activeTintColor =
            options.tabBarActiveTintColor === undefined
              ? theme.colors.$primaryAgent
              : options.tabBarActiveTintColor

          const inactiveTintColor =
            options.tabBarInactiveTintColor === undefined
              ? theme.colors.$dim
              : options.tabBarInactiveTintColor

          const color = isFocused
            ? options.tabBarActiveTintColor
            : options.tabBarInactiveTintColor

          const activeOpacity = isFocused ? 1 : 0
          const inactiveOpacity = isFocused ? 0 : 1

          if (options.tabBarButton) return options.tabBarButton

          return (
            <Pressable
              key={route.key}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                })

                if (!event.defaultPrevented) {
                  navigation.dispatch({
                    ...TabActions.jumpTo(route.name),
                    target: state.key,
                  })
                }
              }}
              style={[
                {
                  flex: 1,
                  height: TAB_HEIGHT,
                },
                options.tabBarItemStyle,
              ]}
            >
              <NavIcon
                route={route}
                activeOpacity={activeOpacity}
                inactiveOpacity={inactiveOpacity}
                activeTintColor={activeTintColor}
                inactiveTintColor={inactiveTintColor}
                renderIcon={options.tabBarIcon}
              />
              <Text
                numberOfLines={2}
                style={[
                  {
                    color,
                  },
                  styles.label,
                  currentRoute?.options.tabBarLabelStyle,
                ]}
              >
                {t(currentRoute?.options.title ?? route.name)}
              </Text>
            </Pressable>
          )
        })}
      </View>
      <View style={[{ flex: 1 }, contentStyle]}>
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

export const createMyNavigator = createNavigatorFactory(TabNavigator)
