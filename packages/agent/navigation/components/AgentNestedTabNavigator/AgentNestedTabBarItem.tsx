import Text from 'agent/components/Text'
import { Pressable, SxProp, View } from 'dripsy'
import React, { ComponentProps } from 'react'
import { NavIcon } from '../NavIcon'

type PressableProps = ComponentProps<typeof Pressable>
export interface AgentTabBarItemProps extends PressableProps {
  renderIcon: ComponentProps<typeof NavIcon>['renderIcon']
  isActive: boolean
  label: string
  labelStyle?: SxProp
}

export default function AgentNestedTabBarItem({
  renderIcon,
  isActive,
  label,
  labelStyle,
  sx,
  ...rest
}: AgentTabBarItemProps) {
  const activeColor = '#0D7DFF'
  const inactiveColor = '#8dc0ff'

  return (
    <Pressable
      sx={{
        flex: 1,
        backgroundColor: isActive ? activeColor : inactiveColor,
        minHeight: 40,
        flexDirection: 'row',
        maxWidth: 200,
        mx: 10,
        justifyContent: 'center',
        px: 10,
        borderRadius: 5,
        ...sx,
      }}
      {...rest}
    >
      {renderIcon({}) && (
        <NavIcon
          defaultSize={20}
          activeOpacity={isActive ? 1 : 0}
          inactiveOpacity={isActive ? 0 : 1}
          activeTintColor={'white'}
          inactiveTintColor={'white'}
          renderIcon={renderIcon}
          style={{ maxWidth: 30, marginRight: 5 }}
        />
      )}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text numberOfLines={2} style={[{ color: 'white' }]}>
          {label}
        </Text>
      </View>
    </Pressable>
  )
}
