import usePathname from 'app/hooks/usePathname'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useRouter } from 'solito/router'
import GradientButton from '../GradientButton'
import { BOTTOM_ROUTE } from './RoutePath'

function BottomTabBar() {
  const pathname = usePathname()
  const { push } = useRouter()
  const { bottom } = useSafeArea()
  const { width } = useWindowDimensions()
  const BOTTOM_TAB_BAR_HEIGHT = 47.5
  const BOTTOM_ICON_ACTIVE = 28
  const BOTTOM_ICON_INACTIVE = 22
  const ICON_SIZE = Math.min(55, width * 0.15)

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
    <Gradient
      gradient={'surface'}
      sx={{
        borderTopWidth: 1,
        borderColor: '#9696FF',
        overflow: 'visible',
      }}
    >
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          height: BOTTOM_TAB_BAR_HEIGHT,
          marginBottom: bottom,
        }}
      >
        {BOTTOM_ROUTE.map((r, index) => {
          return (
            <GradientButton
              key={r.label}
              toggle={true}
              active={isActiveState(index, r)}
              label={r.label}
              size={ICON_SIZE}
              iconProps={{
                name: r.icon ?? 'notice',
                size: isActiveState(index, r)
                  ? BOTTOM_ICON_ACTIVE
                  : BOTTOM_ICON_INACTIVE,
              }}
              labelProps={{
                numberOfLines: 1,
                sx: {
                  fontSize: 13,
                },
              }}
              onPress={() => push(r.path ?? '/')}
            />
          )
        })}
      </View>
    </Gradient>
  )
}

export default BottomTabBar
