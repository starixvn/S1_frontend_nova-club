import React, { ComponentProps } from 'react'
import { Pressable, SxProp } from 'dripsy'
import { NavIcon } from '../NavIcon'
import { TAB_HEIGHT } from 'app/constant/sizes'
import Text from 'agent/components/Text'

type PressableProps = ComponentProps<typeof Pressable>
export interface AgentTabBarItemProps extends PressableProps {
  renderIcon: ComponentProps<typeof NavIcon>['renderIcon']
  isActive: boolean
  label: string
  labelStyle?: SxProp
}

export default function AgentTabBarItem({
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
        height: TAB_HEIGHT,
        ...sx,
      }}
      {...rest}
    >
      <NavIcon
        activeOpacity={isActive ? 1 : 0}
        inactiveOpacity={isActive ? 0 : 1}
        activeTintColor={activeColor}
        inactiveTintColor={inactiveColor}
        renderIcon={renderIcon}
      />
      <Text
        numberOfLines={2}
        sx={{
          textAlign: 'center',
          minHeight: 18,
          fontSize: 11,
          lineHeight: 11,
          textTransform: 'none',
          color: isActive ? activeColor : inactiveColor,
          ...labelStyle,
        }}
      >
        {label}
      </Text>
    </Pressable>
  )
}
