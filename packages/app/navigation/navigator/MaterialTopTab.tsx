import {
  // Import the creation function
  createMaterialTopTabNavigator,
  // Import the types
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs'

import { withLayoutContext } from 'expo-router'

const { Navigator } = createMaterialTopTabNavigator()

// This can be used like `<Drawer />`
export const MaterialTopTab = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator
>(Navigator)
