import { useDrawer } from 'app/hooks/useDrawer'
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
import GradientButton from '../../GradientButton'
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
  const { toggleDrawer } = useDrawer()
  const { push } = useRouter()
  const [totalBalance, setTotalBalance] = useState('0')
  const lastTransferredToMainWalletToken = useRef('')
  const token = useAppSelector((s) => s.auth.info?.token)
  console.log('Rerender Header')
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
    <HeaderContainer insetTop={top}>
      <Logo />
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

        <GradientButton
          onPress={toggleDrawer}
          size={34}
          iconProps={{ name: 'burgerMenu', color: 'white', size: 12 }}
        />
      </Row>
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
