import React, { ComponentProps } from 'react'
import { Pressable, SxProp, View } from 'dripsy'
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
        height: TAB_HEIGHT * 1.25,
        alignItems: 'center',
        py: 5,
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
        defaultSize={28}
      />
      <View
        sx={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          numberOfLines={2}
          sx={{
            textAlign: 'center',
            fontSize: 11,
            lineHeight: 15,
            textTransform: 'none',
            fontWeight: isActive ? 'bold' : '300',
            color: isActive ? activeColor : inactiveColor,
            ...labelStyle,
            maxWidth: 100,
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  )
}
