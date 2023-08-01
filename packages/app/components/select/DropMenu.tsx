import { styled } from 'dripsy'
import { Platform } from 'react-native'
import * as Dropdown from 'zeego/dropdown-menu'

const DripsyContent = styled(Dropdown.Content)({
  minWidth: 500,
  bg: '$primary.500',
  mt: '$3',
  borderRadius: 12,
  p: '$2',
  borderColor: 'border',
  borderWidth: 1,
  ...Platform.select({
    web: {
      animationDuration: '275ms',
      animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      willChange: 'transform, opacity',
      animationKeyframes: {
        '0%': { opacity: 0, transform: [{ scale: 0.5 }] },
        '100%': { opacity: 1, transform: [{ scale: 1 }] },
      },
      transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
      boxShadow:
        '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
    },
  }),
})

export const DropdownMenuContent = Dropdown.create(DripsyContent, 'Content')
