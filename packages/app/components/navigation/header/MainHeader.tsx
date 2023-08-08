import AgentLoginButton from 'app/components/AgentLoginButton'
import IconButton from 'app/components/IconButton'
import IconButtonGradient from 'app/components/IconButtonGradient'
import Shadow from 'app/components/Shadow'
import { useDrawer } from 'app/hooks/useDrawer'
import useOnAppLogout from 'app/hooks/useOnAppLogout'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { HEADER_HEIGHT } from 'app/utils/constant'
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
import { useModal } from 'react-native-modalfy'
import { usePlayerProfileQuery } from 'services/playerApi'
import { Link } from 'solito/link'
import { useRouter } from 'solito/router'
import HeaderAuthentication from './HeaderAuthentication'
import HeaderDeposit from './HeaderDeposit'
import HeaderLanguageToggle from './HeaderLanguageToggle'
import HeaderOverview from './HeaderOverview'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'

const LogoSize = [HEADER_HEIGHT * 0.5, HEADER_HEIGHT * 0.75]

const Logo = () => (
  <Link href="/">
    <Image
      source={{
        uri: `${MEDIA_DOMAIN}${CONTENT_URI}/logo-powered.png`,
      }}
      alt="header-logo"
      sx={{
        height: LogoSize,
        aspectRatio: 292 / 88,
        marginLeft: -5,
      }}
    />
  </Link>
)

const MainHeader = () => {
  const { top } = useSafeArea()
  const { toggleDrawer } = useDrawer() //causing Rerender
  const { push } = useRouter()
  const token = useAppSelector((s) => s.auth.info?.token)
  const { t } = useLocalization()
  const desktop = useResponsiveValue([false, false, false, true])
  const { theme } = useDripsyTheme()
  const { logout } = useOnAppLogout()
  const { openModal } = useModal()

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
        bg: '$primary.500',
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
