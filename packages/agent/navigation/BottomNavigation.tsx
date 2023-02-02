import Text from 'agent/components/Text'
import { BOTTOM_NAV_HEIGHT } from 'app/constant/sizes'
import FloatingContent from 'app/features/floatingContent'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useOrientation from 'app/hooks/useOrientation'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Flex, View } from 'dripsy'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useRouter } from 'solito/router'

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

const BAR_HEIGHT = BOTTOM_NAV_HEIGHT
const CIRCLE_HEIGHT = BAR_HEIGHT
const MARGIN_TOP = -BAR_HEIGHT * 0.4

const BottomNavigation = () => {
  const { push } = useRouter()
  const { isLandscape } = useOrientation()
  const { returnHref } = useContextualRouting()
  const [delay, setDelay] = useState(false)
  const { height } = useWindowDimensions()
  const { bottom } = useSafeArea()

  const isActiveState = (index: number, item: typeof tabConfig[number]) => {
    let isSamePath = false

    if (item.route === '/') {
      isSamePath = returnHref === item.route
    } else {
      isSamePath = returnHref.includes(item.route)
    }

    return isSamePath
  }

  const handleNavigationClick = (route) => {
    push(route, undefined, { scroll: false })
    setDelay(true)
    setTimeout(() => {
      setDelay(false)
    }, 500)
  }

  return (
    <>
      {!isLandscape && <FloatingContent />}

      <Flex
        sx={{
          zIndex: 10,
          alignItems: 'flex-end',
          justifyContent: 'space-evenly',
          backgroundColor: '#0d2035',
          width: '100%',
          height: BAR_HEIGHT + (isLandscape ? 0 : bottom),
          paddingBottom: isLandscape ? 10 : bottom,
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
            <Text>{item.name}</Text>
          </View>
        ))}
      </Flex>
    </>
  )
}

export default BottomNavigation
