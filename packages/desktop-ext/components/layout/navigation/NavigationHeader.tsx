import Divider from 'app/components/Divider'
import DripsyMotiView from 'app/components/DripsyMotiView'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import usePathname from 'app/hooks/usePathname'
import { Container, Pressable, Row, Text, View, styled } from 'dripsy'
import { MotiPressable, useMotiPressable } from 'moti/interactions'
import React, { startTransition } from 'react'
import { useLink } from 'solito/link'
import {
  NAVIGATION_DROPDOWN_MENU,
  useNavigationHeader,
} from './NavigationHeaderProvider'

const MENU = [
  {
    route: '/download',
    icon: 'mobile',
  },
  {
    route: '/',
    icon: 'home',
    // style: {
    //   marginRight: 'auto',
    // },
  },
  {
    route: '/sportsbook',
    label: 'SPORTSBOOK',
    menu: NAVIGATION_DROPDOWN_MENU.Sportsbook,
  },
  {
    route: '/livecasino',
    label: 'LIVECASINO',
    menu: NAVIGATION_DROPDOWN_MENU.LiveCasino,
  },
  {
    route: '/slots',
    label: 'SLOTS',
  },
  {
    route: '/games/local',
    label: 'LOCAL GAME',
  },
  {
    route: '/games/card',
    label: 'CARD GAME',
  },
  {
    route: '/games/fishing',
    label: 'FISHING',
  },
  {
    route: '/games/keno-lottery',
    label: 'KENO / LOTTERY',
  },
  {
    route: '/account/leaderboard',
    label: 'LEADERBOARD',
  },
  // {
  //   route: '/leaderboard',
  //   icon: 'gift',
  //   style: {
  //     marginLeft: 'auto',
  //   },
  // },
]

export const NAVIGATION_HEIGHT = 60
export default function NavigationHeader({}) {
  const toggleMenu = useNavigationHeader()
  return (
    <View sx={{ height: NAVIGATION_HEIGHT, bg: '$primary.500' }}>
      <Divider />
      <Pressable
        onHoverOut={() => startTransition(() => toggleMenu(undefined))}
      >
        <DripsyGradient
          gradient="surface"
          sx={{ height: NAVIGATION_HEIGHT, marginTop: 'auto' }}
        >
          <Container sx={{ alignItems: 'stretch', flex: 1 }}>
            <Row
              sx={{
                flex: 1,
                alignItems: 'stretch',
                // px: [0, 0, 0, '$pagePadding'],
              }}
            >
              {MENU.map((m, i) => {
                return (
                  <MenuButton
                    key={i}
                    label={m.label}
                    icon={m.icon}
                    route={m.route}
                    style={m.style}
                    menu={m.menu}
                  />
                )
              })}
            </Row>
          </Container>
        </DripsyGradient>
      </Pressable>
    </View>
  )
}

const DripsyMotiPressable = styled(MotiPressable)()

const MenuButton = ({ icon, label, route, style, menu }) => {
  const linkProps = useLink({ href: route })
  const setDropdownMenu = useNavigationHeader()

  return (
    <DripsyMotiPressable
      sx={{
        position: 'relative',
        justifyContent: 'center',
        flex: 1,
        px: icon ? '$3' : ['$3', '$3', '$3', '$3', '$3', '$4'],
        alignItems: 'center',
      }}
      containerStyle={{ position: 'relative', ...style }}
      onHoverIn={
        menu ? () => startTransition(() => setDropdownMenu(menu)) : undefined
      }
      {...linkProps}
    >
      {icon ? (
        <Icon name={icon} size={22} />
      ) : (
        <Text sx={{ fontSize: [12, 12, 12, 12, 14] }}>{label}</Text>
      )}
      <Indicator route={route} />
    </DripsyMotiPressable>
  )
}

const Indicator = ({ route }) => {
  const pathname = usePathname()
  const state = useMotiPressable(
    ({ pressed, hovered }) => {
      'worklet'

      const isActive = pathname.startsWith(route) || pressed || hovered
      return {
        opacity: isActive ? 1 : 0,
        // opacity: true? 1
      }
    },
    [pathname]
  )

  return (
    <DripsyMotiView
      state={state}
      sx={{
        opacity: 0,
        backgroundColor: 'white',
        position: 'absolute',
        height: 4,
        bottom: 0,
        width: '100%',
      }}
    />
  )
}
