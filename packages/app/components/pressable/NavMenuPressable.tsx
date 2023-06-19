import { useDripsyTheme } from 'dripsy'
import React from 'react'
import { MotiLink } from 'solito/moti'

const NavMenuPressable = ({ href, children, onPress }) => {
  const { theme } = useDripsyTheme()

  return (
    <MotiLink
      href={href}
      animate={({ hovered, pressed }) => {
        'worklet'
        return {
          opacity: hovered ? 0.5 : 1,
          borderRightWidth: hovered ? 8 : 0,
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
