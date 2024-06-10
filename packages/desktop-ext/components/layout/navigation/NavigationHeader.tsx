import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Divider from 'app/components/Divider'
import DripsyMotiView from 'app/components/DripsyMotiView'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { LEAGUE_SECTION } from 'app/constants/recMatchMapping'
import usePathname from 'app/hooks/usePathname'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Container, Pressable, Row, Text, View, styled } from 'dripsy'
import { MotiView } from 'moti'
import { MotiPressable, useMotiPressable } from 'moti/interactions'
import React, { startTransition, useCallback, useMemo } from 'react'
import { ViewStyle } from 'react-native'
import { SolitoImage } from 'solito/image'
import { useLink } from 'solito/link'
import FloatingEuroCupNavigation from './FloatingEuroCupNavigation'
import FloatingLiveChatDesktop from './FloatingLiveChatDesktop'
import {
  NAVIGATION_DROPDOWN_MENU,
  useNavigationHeader,
} from './NavigationHeaderProvider'
import { Currency } from 'utils/constant'

interface MenuProps {
  icon?: string
  image?: string
  label?: string
  route: string
  style?: ViewStyle
  menu?: NAVIGATION_DROPDOWN_MENU
  tag?: string
  checkIsVisible?: (args: { token?: string; currency?: Currency }) => boolean
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
  const currency = useAppSelector((s) => s.setting.currency)
  const pathname = usePathname()

  const FILTER_MENU = useMemo(() => {
    if (currency === Currency.THB) {
      const NEW_MENU = [...MENU]

      const position = MENU.findIndex(
        (item) => item.label === 'game.category.slots'
      )

      if (position !== -1) {
        const [item] = NEW_MENU.splice(position, 1)
        if (item) NEW_MENU.unshift(item)

        return NEW_MENU
      }
    } else return MENU
  }, [currency]) as MenuProps[]

  const renderMenu = (menu: MenuProps[]) => {
    return menu.map((m, j) => {
      if (m.checkIsVisible?.({ token, currency }) === false) {
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
                  {renderMenu(FILTER_MENU)}
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

  const AnimatedLogo = useMemo(
    () => (
      <MotiView
        key={image}
        from={{ transform: [{ rotate: '-15deg' }] }}
        animate={{ transform: [{ rotate: '15deg' }] }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
        style={{
          height: '80%',
          aspectRatio: 1 / 1,
          alignItems: 'center',
        }}
      >
        <SolitoImage src={image} width={32} height={32} alt="euro-cup" />
      </MotiView>
    ),
    [image]
  )

  return (
    <DripsyMotiPressable
      sx={{
        position: 'relative',
        justifyContent: 'center',
        flex: 1,
        px: icon ? '$3' : ['$2', '$2', '$2', 6, 9, 18],
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
        <>
          {AnimatedLogo}
          <Text sx={{ fontSize: 9, position: 'absolute', bottom: 0 }}>
            2024
          </Text>
        </>
      ) : (
        <View>
          <Text sx={{ fontSize: [10, 10, 10, 12, 13] }}>
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
