import { useDripsyTheme } from 'dripsy'
import React, { ReactNode } from 'react'
import { MotiLink } from 'solito/moti'

type NavMenuPressableProps = {
  isActive: boolean
  href: string
  children: ReactNode
  onPress: () => void
}
const NavMenuPressable = ({
  isActive,
  href,
  children,
  onPress,
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
    >
      {children}
    </MotiLink>
  )
}

export default NavMenuPressable
