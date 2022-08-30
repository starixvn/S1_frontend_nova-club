import useContextualRouting from 'app/hooks/useContextualRouting'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Flex, View } from 'dripsy'
import React from 'react'
import { Platform } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useRouter } from 'solito/router'
import BottomNavIcon from './BottomNavIcon'
import FloatQr from './FloatQr'

const tabConfig = [
  {
    id: 1,
    name: 'game.category.sportsbook',
    isFocused: false,
    iconName: 'sb',
    route: '/sportsbook',
  },
  {
    id: 2,
    name: 'game.category.games',
    isFocused: false,
    iconName: 'games',
    route: '/games',
  },
  {
    id: 3,
    name: 'common.home',
    isFocused: true,
    iconName: 'home',
    route: '/',
  },
  {
    id: 4,
    name: 'game.category.slots',
    isFocused: false,
    iconName: 'sl',
    route: '/slot',
  },
  {
    id: 5,
    name: 'game.category.liveCasino',
    isFocused: false,
    iconName: 'lc',
    route: '/livecasino',
  },
]

const BottomNavigation = () => {
  const { push } = useRouter()
  const { top } = useSafeArea()

  const { returnHref } = useContextualRouting()

  const isActiveState = (index: number, item: typeof tabConfig[number]) => {
    let isSamePath = false

    if (item.route === '/') {
      isSamePath = returnHref === item.route
    } else {
      isSamePath = returnHref.includes(item.route)
    }

    return isSamePath
  }

  const BAR_HEIGHT = 60
  const CIRCLE_HEIGHT = BAR_HEIGHT
  const ICON_HEIGHT = 60
  const MARGIN_TOP = -BAR_HEIGHT * 0.4
  return (
    <>
      {/* <View
        sx={{
          position: Platform.OS === 'web' ? 'fixed' : 'absolute',
          // zIndex: 1,
          maxWidth: 'container',
          top: 110 + top,
          right: 0,
        }}
      >
        <FloatQr />
      </View> */}

      <Flex
        sx={{
          alignItems: 'flex-end',
          justifyContent: 'space-evenly',
          backgroundColor: '#0d2035',
          width: '100%',
          height: BAR_HEIGHT + getBottomSpace(),
          paddingBottom: getBottomSpace(),
          // paddingX: [12, 'auto'],
        }}
      >
        {tabConfig.map((item, index) => (
          <View
            key={item.id}
            sx={{
              marginTop: MARGIN_TOP,
              paddingBottom: 1,
              flex: 1,
              overflow: 'visible',
            }}
          >
            <BottomNavIcon
              name={item.name}
              iconName={item.iconName}
              active={isActiveState(index, item)}
              size={CIRCLE_HEIGHT}
              onPress={() => {
                push(item.route, undefined, { scroll: false })
              }}
            />
          </View>
        ))}
      </Flex>
    </>
  )
}

export default BottomNavigation
