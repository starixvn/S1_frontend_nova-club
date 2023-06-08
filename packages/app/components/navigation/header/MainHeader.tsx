import IconButtonGradient from 'app/components/IconButtonGradient'
import Button from 'app/components/common/Button'
import { useDrawer } from 'app/hooks/useDrawer'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { toCurrency } from 'app/utils'
import { Currency, HEADER_HEIGHT } from 'app/utils/constant'
import { Image, Pressable, Row, View, styled } from 'dripsy'
import React, { useEffect, useRef, useState } from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import {
  usePlayerBalanceQuery,
  useTransferAllToOneMutation,
} from 'services/walletApi'
import { useRouter } from 'solito/router'
import HeaderDeposit from './HeaderDeposit'
import HeaderOverview from './HeaderOverview'

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
  console.log('!!Rerender Header')
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

          <IconButtonGradient
            onPress={() => {
              toggleDrawer()
            }}
            iconProps={{ name: 'burgerMenu', color: 'white' }}
          />
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
