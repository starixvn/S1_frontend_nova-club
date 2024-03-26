import FloatingContent from 'app/features/floatingContent'
import usePathname from 'app/hooks/usePathname'
import { BOTTOM_ROUTE } from 'app/navigation/RoutePath'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import React from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { useRouter } from 'solito/router'
import { DripsyGradient } from '../Gradient'
import IconButtonGradientGroup from '../IconButtonGradientGroup'
import IconButtonGradientToggle from '../IconButtonGradientToggle'

export const BOTTOM_TAB_BAR_HEIGHT = 60

function BottomTabBar() {
  const pathname = usePathname()
  const { push } = useRouter()
  const { bottom } = useSafeArea()

  const { width } = useWindowDimensions()
  const isActiveState = (
    index: number,
    item: (typeof BOTTOM_ROUTE)[number]
  ) => {
    let isSamePath = false

    if (item.path === '/') {
      isSamePath = pathname === item.path
    } else {
      isSamePath = pathname.includes(item.path)
    }

    return isSamePath
  }

  return (
    <>
      <FloatingContent BottomTabBarHeight={BOTTOM_TAB_BAR_HEIGHT} />
      <DripsyGradient
        gradient="surface"
        sx={{
          borderTopWidth: 1,
          borderColor: '$primary.50',
          overflow: 'visible',
          // height: BOTTOM_TAB_BAR_HEIGHT + Math.min(bottom, 40),
          height:
            BOTTOM_TAB_BAR_HEIGHT +
            Math.min(Platform.OS !== 'web' ? bottom : 40, 40),
        }}
      >
        <IconButtonGradientGroup
          sx={{
            px: '$2',
            transform: [
              {
                translateY: -BOTTOM_TAB_BAR_HEIGHT * 0.6,
              },
            ],
          }}
        >
          {BOTTOM_ROUTE.map((r, index) => {
            return (
              <IconButtonGradientToggle
                sx={{ flex: 1 }}
                key={r.label}
                active={isActiveState(index, r)}
                label={r.label}
                size={BOTTOM_TAB_BAR_HEIGHT * 1.2}
                icon={r.icon ?? 'notice'}
                labelProps={{
                  numberOfLines: 1,
                }}
                onPress={() => push(r.path ?? '/')}
              />
            )
          })}
        </IconButtonGradientGroup>
      </DripsyGradient>
    </>
  )
}

export default BottomTabBar
