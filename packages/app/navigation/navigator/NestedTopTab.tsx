import {
  // Import the creation function
  createMaterialTopTabNavigator,
  // Import the types
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs'
import AgentNestedTabBar from 'agent/navigation/components/AgentNestedTabNavigator/AgentNestedTabBar'

import { withLayoutContext } from 'expo-router'

const { Navigator } = createMaterialTopTabNavigator()

// This can be used like `<Drawer />`
export const NestedTopTab = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator
>(AgentNestedTabBar)
