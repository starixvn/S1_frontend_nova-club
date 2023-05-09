import usePathname from 'app/hooks/usePathname'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Box, Text } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import React from 'react'
import { Link } from 'solito/link'
import { Route } from './type'

export const BOTTOM_ROUTE: Route[] = [
  {
    label: 'Sportsbook',
    path: '/sportsbook',
  },
  {
    label: 'Games',
    path: '/games',
  },
]

function BottomTabBar() {
  const pathname = usePathname()
  const { bottom } = useSafeArea()
  return (
    <Box
      sx={{
        borderTopWidth: 1,
        borderColor: '#9696FF',
      }}
    >
      <Gradient
        gradient={'bar'}
        sx={{
          height: 50 + bottom,
          paddingBottom: bottom,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        {BOTTOM_ROUTE.map((r) => {
          return (
            <Link key={r.label} href={r.path ?? '/'}>
              <Text
                sx={{ color: pathname === r.path ? '$primary.100' : undefined }}
              >
                {r.label}
              </Text>
            </Link>
          )
        })}
      </Gradient>
    </Box>
  )
}

export default BottomTabBar
