import Divider from 'app/components/Divider'
import DripsyMotiView from 'app/components/DripsyMotiView'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import usePathname from 'app/hooks/usePathname'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Container, Pressable, Row, Text, View, styled } from 'dripsy'
import { MotiPressable, useMotiPressable } from 'moti/interactions'
import React, { startTransition } from 'react'
import { ViewStyle } from 'react-native'
import { useLink } from 'solito/link'
import FloatingLiveChatDesktop from './FloatingLiveChatDesktop'
import {
  NAVIGATION_DROPDOWN_MENU,
  useNavigationHeader,
} from './NavigationHeaderProvider'
import FloatingEuroCupNavigation from './FloatingEuroCupNavigation'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { SolitoImage } from 'solito/image'
import { LEAGUE_SECTION } from 'app/constants/recMatchMapping'

interface MenuProps {
  icon?: string
  image?: string
  label?: string
  route: string
  style?: ViewStyle
  menu?: NAVIGATION_DROPDOWN_MENU
  tag?: string
  checkIsVisible?: (args: { token?: string }) => boolean
}
interface MenuButtonProps extends MenuProps {}

const LEFT_MENU: MenuProps[] = [
  {
    route: '/download',
    icon: 'mobile',
  },
  {
    route: '/',
    icon: 'home',
  },
  {
    route: `/sportsbook?section=${LEAGUE_SECTION.EURO_MATCH}`,
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/euro-cup-icon.png`,
    menu: NAVIGATION_DROPDOWN_MENU.Euro,
  },
]

const RIGHT_MENU: MenuProps[] = [
  {
    route: '/rewards/redeem/list',
    icon: 'reward',
    checkIsVisible: ({ token }) => {
      return Boolean(token)
    },
  },
]

const MENU: MenuProps[] = [
  {
    route: '/sportsbook',
    label: 'game.category.sportsbook',
    menu: NAVIGATION_DROPDOWN_MENU.Sportsbook,
  },
  {
    route: '/games/cockfighting',
    label: 'game.category.cockfighting',
    tag: 'game.new',
  },
  {
    route: '/livecasino',
    label: 'game.category.liveCasino',
    menu: NAVIGATION_DROPDOWN_MENU.LiveCasino,
  },
  {
    route: '/slots',
    label: 'game.category.slots',
    menu: NAVIGATION_DROPDOWN_MENU.Slots,
  },
  {
    route: '/games/local',
    label: 'game.category.localGame',
  },
  {
    route: '/games/card',
    label: 'game.category.cardGame',
  },
  {
    route: '/games/fishing',
    label: 'game.category.fishing',
  },
  {
    route: '/games/keno-lottery',
    label: 'game.category.lottery',
  },
  {
    route: '/event/mystery-drop',
    label: 'event.mystery.title',
  },
  // {
  //   route: '/leaderboard',
  //   icon: 'gift',
  //   style: {
  //     marginLeft: 'auto',
  //   },
  // },
]

export const NAVIGATION_HEIGHT = 50
export default function NavigationHeader({}) {
  const toggleMenu = useNavigationHeader()
  const token = useAppSelector((s) => s.auth.info?.token)
  const pathname = usePathname()

  const renderMenu = (menu: MenuProps[]) => {
    return menu.map((m, j) => {
      if (m.checkIsVisible?.({ token }) === false) {
        return null
      }

      return (
        <MenuButton
          key={j}
          label={m.label}
          icon={m.icon}
          image={m.image}
          route={m.route}
          style={m.style}
          menu={m.menu}
          tag={m.tag}
        />
      )
    })
  }

  return (
    <>
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
              <Row sx={{ flex: 1, gap: '$2' }}>
                <Row>{renderMenu(LEFT_MENU)}</Row>
                <Row
                  sx={{
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  {renderMenu(MENU)}
                </Row>
                <Row>{renderMenu(RIGHT_MENU)}</Row>
              </Row>
            </Container>
          </DripsyGradient>
        </Pressable>
      </View>
      <FloatingLiveChatDesktop />
      {pathname.includes('/euro-cup') && <FloatingEuroCupNavigation />}

      {/* <FloatingContent BottomTabBarHeight={BOTTOM_TAB_BAR_HEIGHT} /> */}
    </>
  )
}

const DripsyMotiPressable = styled(MotiPressable)()

const MenuButton = ({
  icon,
  image,
  label,
  route,
  style,
  menu,
  tag,
}: MenuButtonProps) => {
  const linkProps = useLink({ href: route })
  const setDropdownMenu = useNavigationHeader()
  const { t } = useLocalization()

  return (
    <DripsyMotiPressable
      sx={{
        position: 'relative',
        justifyContent: 'center',
        flex: 1,
        px: icon ? '$3' : ['$2', '$2', '$2', 6, 11, 22],
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
      ) : image ? (
        <View
          sx={{
            bg: 'blue',
            height: '100%',
            aspectRatio: 1 / 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SolitoImage src={image} width={36} height={36} alt="euro-cup" />
        </View>
      ) : (
        <View>
          <Text sx={{ fontSize: [10, 10, 10, 12, 14] }}>
            {t(label).toUpperCase()}
          </Text>
          <Text
            sx={{
              position: 'absolute',
              top: -16,
              right: 0,
              fontSize: 10,
              fontWeight: 'bold',
              bg: 'red',
              px: '$2',
              borderBottomLeftRadius: 6,
              borderBottomRightRadius: 6,
            }}
          >
            {tag && t(tag).toUpperCase()}
          </Text>
        </View>
      )}
      <Indicator route={route} />
    </DripsyMotiPressable>
  )
}

const Indicator = ({ route }: { route: string }) => {
  const pathname = usePathname()
  const state = useMotiPressable(
    ({ pressed, hovered }) => {
      'worklet'
      const isActive = isTabActive({ route, pathname }) || pressed || hovered
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

const isTabActive = ({
  route,
  pathname,
}: {
  route: string
  pathname: string
}) => {
  const pathNameMatch = pathname.match(route)
  if (pathname.match(route)) {
    if (pathNameMatch?.[0] === pathNameMatch?.input) {
      return true
    } else if (pathNameMatch?.[0] !== '/') {
      return pathNameMatch?.input?.includes(route)
    }
    return false
  }
  return false
}
