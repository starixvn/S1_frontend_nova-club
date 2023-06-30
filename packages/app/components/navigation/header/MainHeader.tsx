import IconButton from 'app/components/IconButton'
import IconButtonGradient from 'app/components/IconButtonGradient'
import Shadow from 'app/components/Shadow'
import { useDrawer } from 'app/hooks/useDrawer'
import useOnAppLogout from 'app/hooks/useOnAppLogout'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { toCurrency } from 'app/utils'
import { Currency, HEADER_HEIGHT } from 'app/utils/constant'
import isDesktop from 'app/utils/isDesktop'
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
import React, { useEffect, useRef, useState } from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import {
  usePlayerBalanceQuery,
  useTransferAllToOneMutation,
} from 'services/walletApi'
import { Link } from 'solito/link'
import { useRouter } from 'solito/router'
import HeaderAuthentication from './HeaderAuthentication'
import HeaderAuthenticationDesktop from 'desktop-ext/components/navigation/header/HeaderAuthentication'
import HeaderDeposit from './HeaderDeposit'
import HeaderLanguageToggle from './HeaderLanguageToggle'
import HeaderOverview from './HeaderOverview'

const LogoSize = [
  HEADER_HEIGHT * 0.5,
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
  const [totalBalance, setTotalBalance] = useState('0')
  const lastTransferredToMainWalletToken = useRef('')
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
  const {
    data: playerBalance,
    isFetching: isMainWalletLoading,
    refetch,
  } = usePlayerBalanceQuery(undefined, { skip: !token })

  const { data: playerData } = usePlayerProfileQuery(undefined, {
    skip: !token,
  })
  const isPlayerName = !!playerData?.firstName
  const [transferAllToOne, { isLoading: isTransferringToMain }] =
    useTransferAllToOneMutation({
      fixedCacheKey: 'transfer-all-to-one',
    })

  const refreshWallet = () => {
    if (isTransferringToMain) return

    refetch()
  }

  useEffect(() => {
    const wallets = playerBalance?.data
    if (wallets) {
      const total = Object.values(wallets).reduce(
        (total, w) =>
          total + (Number(w.balance) ?? 0) + (Number(w.reward) ?? 0),
        0
      )

      const formattedBalance = toCurrency(total, Currency.VND, {
        symbol: false,
      })
      setTotalBalance(formattedBalance)

      /* To Trigger transfer all to main wallet when player login on multiple platform
          and there are some balance remained in vendor wallets.

        - avoid trigger again when balance is fetched on other places lastTransferredToMainWalletToken
        - as for now only trigger 1 time per token per session
      */
      if (token) {
        const dif =
          total - (Number(wallets.main.balance) + Number(wallets.main.reward))

        if (dif > 0) {
          if (
            token !== lastTransferredToMainWalletToken.current &&
            !isTransferringToMain
          ) {
            lastTransferredToMainWalletToken.current = token
            transferAllToOne({
              transfer_from: 999,
              transfer_to: 0,
            })
          }
        } else {
          lastTransferredToMainWalletToken.current = token
        }
      }
    }

    return () => {
      setTotalBalance('0')
    }
  }, [playerBalance, token])
  return (
    <View
      sx={{
        bg: '$primary.500',
      }}
    >
      <HeaderContainer insetTop={top} key={'MainHeader'}>
        <Logo />
        {token ? (
          <Row sx={{ alignItems: 'center' }}>
            <HeaderDeposit />
            <HeaderOverview
              onBalancePress={() => null}
              onRewardPress={() => null}
              reward={playerBalance?.data?.main.reward}
              balance={totalBalance}
              isLoading={isMainWalletLoading}
            />
            {desktop && (
              <View sx={{ mx: '$2', minWidth: 75 }}>
                <Text sx={{ textAlign: 'right' }}>{t('common.hello')}</Text>
                <Text
                  sx={{ textAlign: 'right', fontWeight: 'bold' }}
                  numberOfLines={1}
                >
                  {playerData?.firstName}
                </Text>
              </View>
            )}

            <Pressable
              sx={{ borderRadius: 50, px: desktop ? 0 : 5 }}
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
