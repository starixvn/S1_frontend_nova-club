import IconButton from 'app/components/IconButton'
import IconButtonGradient from 'app/components/IconButtonGradient'
import Shadow from 'app/components/Shadow'
import Button from 'app/components/common/Button'
import { useDrawer } from 'app/hooks/useDrawer'
import useOnAppLogout from 'app/hooks/useOnAppLogout'
import useLocalization from 'app/provider/localization'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { toCurrency } from 'app/utils'
import { Currency, HEADER_HEIGHT, LANGUAGE_CODE } from 'app/utils/constant'
import isDesktop from 'app/utils/isDesktop'
import {
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
import { useRouter } from 'solito/router'
import HeaderDeposit from './HeaderDeposit'
import HeaderOverview from './HeaderOverview'
import { LanguageButton } from 'app/components/LanguageSwitch'
import { SettingActions } from 'app/store/setting.slice'

const Logo = () => (
  <Image
    source={require('../../../assets/images/common/logo.png')}
    alt="header-logo"
    sx={{ width: 75, aspectRatio: 67 / 24 }}
  />
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
  const dispatch = useAppDispatch()
  const lang = useAppSelector((state) => state.setting.locale)

  const setLanguage = (value: LANGUAGE_CODE) => {
    dispatch(SettingActions.setLocale(value))
  }
  const onChangeLanguage = (value: LANGUAGE_CODE) => {
    setLanguage(value)
  }

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
              <Text sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                {playerData?.firstName}
              </Text>
            </View>
          )}

          <Pressable
            sx={{ borderRadius: 50, px: 2.5 }}
            onPress={() => push('/account/profile')}
          >
            <Image
              alt="user-avatar"
              source={require('../../../assets/images/common/avatarx2.png')}
              sx={{ aspectRatio: 1, width: 34, height: 34, borderRadius: 50 }}
            />
          </Pressable>
          {desktop && (
            <>
              <View
                sx={{
                  bg: '$primary.300',
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 5,
                }}
              >
                <View
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 30,
                    width: 30,
                    m: 1,
                    borderColor: '$primary.700',
                    borderWidth: 2,
                    borderRadius: 50,
                  }}
                >
                  <LanguageButton
                    languageCode={lang}
                    onPress={() =>
                      onChangeLanguage(
                        lang === LANGUAGE_CODE.VIETNAM
                          ? LANGUAGE_CODE.ENGLISH
                          : LANGUAGE_CODE.VIETNAM
                      )
                    }
                    sx={{ m: 0 }}
                  />
                </View>
              </View>

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
                <IconButton name="logout" onPress={() => TriggerLogout()} />
              </Shadow>
              <Button
                sx={{
                  mx: 5,
                  bg: '$primary.200',
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
      ) : (
        <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button
            sx={{ mx: '$2', minWidth: 100, borderRadius: 15 }}
            titleProps={{
              sx: {
                fontSize: 14,
                //only by setting like this, the text only can be centered
                height: 16,
                lineHeight: 18,
              },
            }}
            contentProps={{
              sx: {
                py: '$2',
              },
            }}
            onPress={() => push('/auth/login')}
          >
            {t('authentication.login')}
          </Button>
          <Button
            sx={{ bg: '$primary.700', minWidth: 100, borderRadius: 15 }}
            titleProps={{
              sx: {
                fontSize: 14,
                //only by setting like this, the text only can be centered
                height: 16,
                lineHeight: 18,
              },
            }}
            contentProps={{
              sx: {
                py: '$2',
              },
            }}
            onPress={() => push('/auth/register')}
          >
            {t('authentication.register')}
          </Button>
        </View>
      )}
    </HeaderContainer>
  )
}

const HeaderContainer = styled(View)(({ insetTop }: { insetTop: number }) => ({
  flexDirection: 'row',
  bg: '$primary.500',
  minHeight: HEADER_HEIGHT + insetTop,
  pt: insetTop,
  justifyContent: 'space-between',
  alignItems: 'center',
  px: 10,
}))

export default MainHeader
