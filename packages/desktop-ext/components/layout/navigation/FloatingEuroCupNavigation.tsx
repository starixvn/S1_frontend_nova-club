import EuroTabIcon from 'app/features/event/euroCup/components/EuroTabIcon'
import { EURO_BOTTOM_ROUTE } from 'app/navigation/RoutePath'
import { View } from 'dripsy'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import React from 'react'
import { HEADER_HEIGHT } from 'utils/constant'
import { NAVIGATION_HEIGHT } from './NavigationHeader'

const FloatingEuroCupNavigation = () => {
  const pathname = usePathname()
  const { push, replace } = useRouter()

  const isActiveState = (path: string) => {
    const isSamePath = pathname.includes(path)

    return isSamePath
  }

  return (
    <View
      sx={{
        bg: '#182F90CC',
        position: 'fixed',
        left: 0,
        top: NAVIGATION_HEIGHT + HEADER_HEIGHT,
        width: 150,
        height: 700,
        borderBottomRightRadius: 48,
        py: '$4',
      }}
    >
      {EURO_BOTTOM_ROUTE.map((route) => {
        return (
          <EuroTabIcon
            key={route.label}
            sx={{ flex: 1 }}
            active={isActiveState(route.path)}
            label={route.label}
            size={100}
            icon={route.icon ?? 'notice'}
            onPress={() => replace(route.path ?? '/')}
          />
        )
      })}
    </View>
  )
}

export default FloatingEuroCupNavigation
