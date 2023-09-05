import { useDripsyTheme } from 'dripsy'
import { MotiPressable } from 'moti/interactions'
import React, { ComponentProps, ReactNode } from 'react'
import { MotiLink } from 'solito/moti'

export type NavMenuPressableProps = {
  isActive: boolean
  onPress?: () => void
} & ComponentProps<typeof MotiLink>
const NavMenuPressable = ({
  isActive,
  href,
  children,
  onPress,
  ...rest
}: NavMenuPressableProps) => {
  const { theme } = useDripsyTheme()

  return (
    <MotiLink
      href={href}
      animate={({ hovered, pressed }) => {
        'worklet'
        return {
          opacity: hovered ? 0.5 : 1,
          borderRightWidth: hovered && !isActive ? 8 : 0,
          borderColor: theme.colors?.$primary[100],
        }
      }}
      transition={{
        type: 'timing',
        duration: 100,
      }}
      onPress={onPress}
      {...rest}
    >
      {children}
    </MotiLink>
  )
}

export default NavMenuPressable
