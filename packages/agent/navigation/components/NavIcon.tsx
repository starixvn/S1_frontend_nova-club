import React from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'

type Props = {
  defaultSize?: number
  activeOpacity: number
  inactiveOpacity: number
  activeTintColor: string
  inactiveTintColor: string
  renderIcon: (props: {
    focused: boolean
    color: string
    size: number
  }) => React.ReactNode
  style?: StyleProp<ViewStyle>
}

export function NavIcon({
  activeOpacity,
  inactiveOpacity,
  activeTintColor,
  inactiveTintColor,
  renderIcon,
  defaultSize = 24,
  style,
}: Props) {
  // We render the icon twice at the same position on top of each other:
  // active and inactive one, so we can fade between them.
  return (
    <View style={[styles.iconVertical, style]}>
      <View style={[styles.icon, { opacity: activeOpacity }]}>
        {renderIcon({
          focused: true,
          size: defaultSize,
          color: activeTintColor,
        })}
      </View>
      <View style={[styles.icon, { opacity: inactiveOpacity }]}>
        {renderIcon({
          focused: false,
          size: defaultSize,
          color: inactiveTintColor,
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them:
    // Cover the whole iconContainer:
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    // Workaround for react-native >= 0.54 layout bug
    minWidth: 25,
  },
  iconVertical: {
    flex: 1,
  },
})
