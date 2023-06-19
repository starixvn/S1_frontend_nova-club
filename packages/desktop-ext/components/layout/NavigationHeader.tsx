import DripsyMotiView from 'app/components/DripsyMotiView'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import usePathname from 'app/hooks/usePathname'
import { Container, Row, Text, View, styled } from 'dripsy'
import { MotiPressable, useMotiPressable } from 'moti/interactions'
import { MotiView } from 'moti'
import React from 'react'
import Divider from 'app/components/Divider'

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
  },
  {
    route: '/livecasino',
    label: 'LIVECASINO',
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
    route: '/reward',
    label: 'LEADERBOARD',
  },
  {
    route: '/leaderboard',
    icon: 'gift',
    style: {
      marginLeft: 'auto',
    },
  },
]

export const NAVIGATION_HEIGHT = 60
export default function NavigationHeader({}) {
  return (
    <View sx={{ height: NAVIGATION_HEIGHT, bg: '$primary.500' }}>
      <Divider />
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
                />
              )
            })}
          </Row>
        </Container>
      </DripsyGradient>
    </View>
  )
}

const DripsyMotiPressable = styled(MotiPressable)()

const MenuButton = ({ icon, label, route, style }) => {
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

  const state = useMotiPressable(({ pressed, hovered }) => {
    'worklet'

    const isActive = pathname === route || pressed || hovered
    return {
      opacity: isActive ? 1 : 0,
      // opacity: true? 1
    }
  })

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
