import FloatingContent from 'app/features/floatingContent'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useOrientation from 'app/hooks/useOrientation'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Flex, View, Image } from 'dripsy'
import React, { useState } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { useRouter } from 'solito/router'
import BottomNavIcon from './BottomNavIcon'

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

const BAR_HEIGHT = 60
const CIRCLE_HEIGHT = BAR_HEIGHT
const MARGIN_TOP = -BAR_HEIGHT * 0.4
export const BOTTOM_NAV_HEIGHT = BAR_HEIGHT

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

      <View
        pointerEvents="none"
        sx={{
          height: 50,
          width: 100,
          left: -25,
          position: 'absolute',
          bottom: height * 0.05 + bottom,
          zIndex: 1,
        }}
      >
        <Image
          source={require('../../../packages/app/assets/images/events/cny/home-deco/cloud.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      <View
        pointerEvents="none"
        sx={{
          height: 75,
          width: 75,
          left: -15,
          position: 'absolute',
          bottom: height * 0.08 + bottom,
          zIndex: 0,
        }}
      >
        <Image
          source={require('../../../packages/app/assets/images/events/cny/home-deco/flower.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      <View
        pointerEvents="none"
        sx={{
          height: 75,
          width: 115,
          left: -40,
          position: 'absolute',
          bottom: height * 0.32 + bottom,
        }}
      >
        <Image
          source={require('../../../packages/app/assets/images/events/cny/home-deco/cloud-gold.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      <View
        pointerEvents="none"
        sx={{
          height: 75,
          width: 75,
          left: 0,
          position: 'absolute',
          bottom: height * 0.5 + bottom,
        }}
      >
        <Image
          source={require('../../../packages/app/assets/images/events/cny/home-deco/flower.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>

      <View
        pointerEvents="none"
        sx={{
          height: 60,
          width: 60,
          left: -30,
          position: 'absolute',
          bottom: height * 0.56 + bottom,
        }}
      >
        <Image
          source={require('../../../packages/app/assets/images/events/cny/home-deco/flower.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>

      <View
        pointerEvents="none"
        sx={{
          height: 50,
          width: 100,
          right: -25,
          position: 'absolute',
          bottom: height * 0.05 + bottom,
          zIndex: 1,
        }}
      >
        <Image
          source={require('../../../packages/app/assets/images/events/cny/home-deco/cloud.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>

      <View
        pointerEvents="none"
        sx={{
          height: 75,
          width: 75,
          right: -15,
          position: 'absolute',
          bottom: height * 0.08 + bottom,
          zIndex: 0,
        }}
      >
        <Image
          source={require('../../../packages/app/assets/images/events/cny/home-deco/flower.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      <View
        pointerEvents="none"
        sx={{
          height: 75,
          width: 75,
          right: -10,
          position: 'absolute',
          bottom: height * 0.35 + bottom,
          zIndex: 0,
        }}
      >
        <Image
          source={require('../../../packages/app/assets/images/events/cny/home-deco/flower.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      <View
        pointerEvents="none"
        sx={{
          height: 75,
          width: 75,
          right: -25,
          position: 'absolute',
          bottom: height * 0.3 + bottom,
          zIndex: 0,
        }}
      >
        <Image
          source={require('../../../packages/app/assets/images/events/cny/home-deco/flower.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>

      <View
        pointerEvents="none"
        sx={{
          height: 75,
          width: 115,
          right: -30,
          position: 'absolute',
          bottom: height * 0.52 + bottom,
        }}
      >
        <Image
          source={require('../../../packages/app/assets/images/events/cny/home-deco/cloud-gold.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>

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
            <BottomNavIcon
              name={item.name}
              iconName={item.iconName}
              active={isActiveState(index, item)}
              size={CIRCLE_HEIGHT}
              onPress={() => !delay && handleNavigationClick(item.route)}
            />
          </View>
        ))}
      </Flex>
    </>
  )
}

export default BottomNavigation
