import usePathname from 'app/hooks/usePathname'
import { Box, View } from 'dripsy'
import React from 'react'
import { Link } from 'solito/link'
import GradientButton from '../GradientButton'
import { BOTTOM_ROUTE } from './RoutePath'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useRouter } from 'solito/router'

function BottomTabBar() {
  const pathname = usePathname()
  const { push } = useRouter()
  const { bottom } = useSafeArea()
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
          height: 50 + bottom,
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
                active={isActiveState(index, r)}
                label={r.label}
                iconProps={{ name: r.icon ?? 'notice', size: 30 }}
                labelProps={{
                  numberOfLines: 1,
                  sx: {
                    fontSize: 13,
                  },
                }}
                onPress={() => push(r.path ?? '/')}
              />
            </Link>
          )
        })}
      </View>
    </Box>
  )
}

export default BottomTabBar
