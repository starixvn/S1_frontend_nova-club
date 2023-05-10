import usePathname from 'app/hooks/usePathname'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Box, Text, View, useDripsyTheme } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import React, { useEffect } from 'react'
import { Link } from 'solito/link'
import { Route } from './type'
import GradientButton from '../GradientButton'

export const BOTTOM_ROUTE: Route[] = [
  {
    label: 'Sportsbook',
    path: '/sportsbook',
    icon: 'sportbook',
  },
  {
    label: 'Games',
    path: '/games',
    icon: 'games-2',
  },
  {
    label: 'Home',
    path: '/',
    icon: 'home',
  },
  {
    label: 'Slots',
    path: '/slots',
    icon: 'sl',
  },
  {
    label: 'Live Casino',
    path: '/livecasino',
    icon: 'casino',
  },
]

function BottomTabBar() {
  const pathname = usePathname()
  const isActiveState = (
    index: number,
    item: (typeof BOTTOM_ROUTE)[number]
  ) => {
    let isSamePath = false

    if (item.path === '/') {
      isSamePath = pathname === item.path
    } else {
      isSamePath = pathname === item.path
    }

    return isSamePath
  }

  return (
    <Box
      sx={{
        borderTopWidth: 1,
        borderColor: '#9696FF',
      }}
    >
      <View
        // colors={theme.linearGradients.surface}
        sx={{
          height: 70,
          // overflow: 'visible',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          top: -25,
        }}
      >
        {BOTTOM_ROUTE.map((r, index) => {
          return (
            <Link key={r.label} href={r.path ?? '/'}>
              <GradientButton
                toggleState={isActiveState(index, r)}
                label={r.label}
                iconProps={{ name: r.icon ?? 'notice', size: 30 }}
                textStyle={{ fontSize: 14 }}
                routePath={r.path}
                enableToggle={true}
              />
            </Link>
          )
        })}
      </View>
    </Box>
  )
}

export default BottomTabBar
