import usePathname from 'app/hooks/usePathname'
import { Box, View } from 'dripsy'
import React from 'react'
import { Link } from 'solito/link'
import GradientButton from '../GradientButton'
import { BOTTOM_ROUTE } from './RoutePath'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useRouter } from 'solito/router'
import { Gradient } from 'dripsy/gradient'

const BOTTOM_TAB_BAR_HEIGHT = 40

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
      <Gradient
        gradient={'surface'}
        sx={{
          height: BOTTOM_TAB_BAR_HEIGHT + bottom,
          overflow: 'visible',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingBottom: bottom,
        }}
      >
        {BOTTOM_ROUTE.map((r, index) => {
          return (
            <Link key={r.label} href={r.path ?? '/'}>
              <GradientButton
                toggle={true}
                active={isActiveState(index, r)}
                label={r.label}
                iconProps={{
                  name: r.icon ?? 'notice',
                  size: isActiveState(index, r) ? 36 : 30,
                }}
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
      </Gradient>
    </Box>
  )
}

export default BottomTabBar
