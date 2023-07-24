import IconButton from 'app/components/IconButton'
import IconButtonGradient from 'app/components/IconButtonGradient'
import Shadow from 'app/components/Shadow'
import { useDrawer } from 'app/hooks/useDrawer'
import useOnAppLogout from 'app/hooks/useOnAppLogout'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { HEADER_HEIGHT } from 'app/utils/constant'
import isDesktop from 'app/utils/isDesktop'
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
} from 'dripsy'
import React from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import { Link } from 'solito/link'
import { useRouter } from 'solito/router'
import HeaderAuthentication from './HeaderAuthentication'
import HeaderDeposit from './HeaderDeposit'
import HeaderLanguageToggle from './HeaderLanguageToggle'
import HeaderOverview from './HeaderOverview'
import { StatusBar } from 'expo-status-bar'

const LogoSize = [
  HEADER_HEIGHT * 0.45,
  HEADER_HEIGHT * 0.5,
  HEADER_HEIGHT * 0.75,
]

const Logo = () => (
  <Link href="/">
    <Image
      source={require('../../../assets/images/common/logo.png')}
      alt="header-logo"
      sx={{
        height: LogoSize,
        aspectRatio: 67 / 24,
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
  const desktop = isDesktop()
  const { theme } = useDripsyTheme()
  const { logout } = useOnAppLogout()

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
                sx={{ aspectRatio: 1, width: 34, height: 34, borderRadius: 50 }}
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
                {/* <Shadow
                  offset={[0, -1]}
                  startColor={'rgba(255, 255, 255, 0.8)'}
                  distance={1}
                  style={{ borderRadius: 15 }}
                  containerStyle={{ marginHorizontal: 5 }}
                >
                  <Button
                    sx={{
                      bg: '$primary.100',
                      px: '$3',
                      width: 80,
                      borderRadius: 15,
                    }}
                    contentProps={{ sx: { py: 2 } }}
                    titleProps={{
                      sx: {
                        fontSize: 11,
                        wordWrap: 'break-word',
                      },
                    }}
                  >
                    {t('common.agentLogin')}
                  </Button>
                </Shadow> */}
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
