import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import AgentLoginButton from 'app/components/AgentLoginButton'
import { MessageBadge } from 'app/components/Badge'
import IconButton from 'app/components/IconButton'
import IconButtonGradient from 'app/components/IconButtonGradient'
import Shadow from 'app/components/Shadow'
import FloatingDownload from 'app/features/floatingContent/FloatingDownload'
import { useDrawer } from 'app/hooks/useDrawer'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useOnAppLogout from 'app/hooks/useOnAppLogout'
import usePathname from 'app/hooks/usePathname'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import HeaderAuthenticationDesktop from 'desktop-ext/components/navigation/header/HeaderAuthentication'
import {
  Container,
  Image,
  Pressable,
  Row,
  Text,
  View,
  styled,
  useDripsyTheme,
  useResponsiveValue,
} from 'dripsy'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'
import { SolitoImage } from 'solito/image'
import { Link } from 'solito/link'
import { useRouter } from 'solito/router'
import { HEADER_HEIGHT } from 'utils/constant'
import HeaderAuthentication from './HeaderAuthentication'
import HeaderDeposit from './HeaderDeposit'
import HeaderLanguageToggle from './HeaderLanguageToggle'
import HeaderOverview from './HeaderOverview'
dayjs.extend(isBetween)

const LogoSize = [HEADER_HEIGHT * 0.8, HEADER_HEIGHT * 0.9]

export const isCNY = dayjs().isBetween(
  dayjs('2024-01-01T17:00:00.000Z'),
  dayjs('2024-02-29T17:00:00.000Z')
)

const Logo = () => {
  const lang = useAppSelector((s) => s.setting.locale)
  const showTheme = useResponsiveValue([false, false, false, true])
  const themeLogoWidth = useResponsiveValue([0, 0, 0, 190, 260])

  const LOGO_PATH =
    lang === 'en'
      ? isCNY
        ? `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/cny/cny-logo-en.png`
        : `${MEDIA_DOMAIN}${CONTENT_URI}/vui123-logo-en.png`
      : isCNY
      ? `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/cny/cny-logo-vi.png`
      : `${MEDIA_DOMAIN}${CONTENT_URI}/vui123-logo-vi.png`

  return (
    <Row sx={{ alignItems: 'center' }}>
      <Link href="/">
        <Image
          source={{
            uri: LOGO_PATH,
          }}
          alt="header-logo"
          sx={{
            height: LogoSize,
            aspectRatio: isCNY ? 292 / 88 : 1000 / 350,
            marginLeft: -5,
          }}
        />
      </Link>

      {isCNY && showTheme && (
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/cny/cny-theme-logo.gif`}
          height={60}
          width={213}
          contentPosition="bottom center"
          alt=""
        />
      )}
      {/* <Video
          source={{
            uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/cny/cny-theme-logo.gif`,
          }}
          videoStyle={{ position: 'relative', height: '100%' }}
          isMuted
          isLooping
          shouldPlay
          style={{
            height: 60,
            width: 213,
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls={false}
        /> */}
    </Row>
  )
}

const MainHeader = () => {
  const { top } = useSafeArea()
  const { toggleDrawer } = useDrawer() //causing Rerender
  const { push } = useRouter()
  const token = useAppSelector((s) => s.auth.info?.token)
  const { t } = useLocalization()
  const desktop = useIsDesktop()
  const { theme } = useDripsyTheme()
  const { logout } = useOnAppLogout()
  const pathname = usePathname()

  const showDownloadPanel =
    Platform.OS === 'web' && !desktop && pathname === '/'
  const TriggerLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error(error)
    }
  }

  const { data: playerData } = usePlayerProfileQuery(undefined, {
    skip: !token,
  })
  const isPlayerName = !!playerData?.firstName

  return (
    <View
      sx={{
        // bg: '$primary.500',
        bg: '#3A3A66',
        // bg: window.screen.colorDepth < 30 ? '#32325b' : '#3A3A66',
      }}
    >
      <StatusBar style="light" />
      <HeaderContainer insetTop={top} key={'MainHeader'}>
        <Logo />
        {token ? (
          <Row sx={{ alignItems: 'center', gap: ['$2', '$3'] }}>
            <HeaderDeposit isPlayerName={isPlayerName} />
            <HeaderOverview />
            {desktop && (
              <View sx={{ minWidth: 75 }}>
                <Text sx={{ textAlign: 'right' }}>{t('common.hello')}</Text>
                <Text
                  sx={{ textAlign: 'right', fontWeight: 'bold' }}
                  numberOfLines={1}
                >
                  {playerData?.username}
                </Text>
              </View>
            )}

            <Pressable
              sx={{ borderRadius: 50 }}
              onPress={() => push('/account')}
            >
              <MessageBadge size="small" />
              <Image
                alt="user-avatar"
                source={require('../../../assets/images/common/avatarx2.png')}
                sx={{ width: 34, height: 34, borderRadius: 50 }}
              />
            </Pressable>
            {desktop && (
              <>
                <HeaderLanguageToggle />

                <Shadow
                  offset={[0, -1]}
                  startColor={'rgba(255, 255, 255, 0.5)'}
                  distance={1}
                  style={{
                    borderRadius: 15,
                    backgroundColor: theme.colors?.$primary[300],
                  }}
                  containerStyle={{ marginHorizontal: 2.5 }}
                >
                  <IconButton
                    name="logout"
                    onPress={() => TriggerLogout()}
                    size={22}
                  />
                </Shadow>
                <AgentLoginButton />
              </>
            )}

            {!desktop && (
              <IconButtonGradient
                onPress={() => {
                  toggleDrawer()
                }}
                iconProps={{ name: 'burgerMenu', color: 'white' }}
              />
            )}
          </Row>
        ) : desktop ? (
          <HeaderAuthenticationDesktop />
        ) : (
          <HeaderAuthentication />
        )}
      </HeaderContainer>

      {showDownloadPanel && <FloatingDownload />}
    </View>
  )
}

const HeaderContainer = styled(Container)(
  ({ insetTop }: { insetTop: number }) => ({
    flexDirection: 'row',
    minHeight: HEADER_HEIGHT + insetTop,
    pt: insetTop,
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 10,
  })
)

export default MainHeader
