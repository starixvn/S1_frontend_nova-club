import { useDrawer } from 'app/hooks/useDrawer'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Image, Pressable, Row, Text, View } from 'dripsy'
import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Link } from 'solito/link'
import GradientButton from '../GradientButton'
import IconButton from '../IconButton'
import { useRouter } from 'solito/router'
import Icon from '../Icon'
import { useAppSelector } from 'app/provider/redux/store'
import { usePlayerProfileQuery } from '../../../services/playerApi'
import {
  usePlayerBalanceQuery,
  useTransferAllToOneMutation,
} from '../../../services/walletApi'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'

const MainHeader = () => {
  const { top } = useSafeArea()
  const { toggleDrawer } = useDrawer()
  const { push } = useRouter()
  const [totalBalance, setTotalBalance] = useState('0')
  const lastTransferredToMainWalletToken = useRef('')
  const token = useAppSelector((s) => s.auth.info?.token)

  const {
    data: playerBalance,
    isFetching: isMainWalletLoading,
    refetch,
  } = usePlayerBalanceQuery()

  const { data: playerData } = usePlayerProfileQuery()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerBalance, token])
  return (
    <Row
      sx={{
        bg: '$primary.500',
        height: 50 + top,
        pt: top,
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 10,
      }}
    >
      <Image
        source={require('../../assets/images/common/logo.png')}
        alt="header-logo"
        sx={{ width: 100, aspectRatio: 67 / 24 }}
      />
      <Row>
        <View
          sx={{
            px: 5,
            borderColor: '$primary.100',
            borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: 25,
            minWidth: 125,
          }}
        >
          <View sx={{ p: 2, mr: 5, bg: '$secondary.100', borderRadius: 50 }}>
            <View sx={{ bg: '$secondary.500', p: 4, borderRadius: 50 }}>
              <Icon name="wallet" size={10} color={'$secondary.100'} />
            </View>
          </View>

          <Text sx={{ fontSize: 12, color: '$secondary.100' }}>
            {totalBalance}
          </Text>
          <IconButton name={'down'} size={14} color={'$secondary.100'} />
        </View>

        <Pressable
          sx={{ borderRadius: 50, px: 10 }}
          onPress={() => push('/account/profile')}
        >
          <Image
            alt="user-avatar"
            source={require('../../assets/images/common/avatarx2.png')}
            sx={{ aspectRatio: 1, width: 40, height: 40, borderRadius: 50 }}
          />
        </Pressable>

        <GradientButton
          onPress={toggleDrawer}
          size={40}
          iconProps={{ name: 'btnMenu', color: 'white', size: 14 }}
        />
      </Row>
    </Row>
  )
}

export default MainHeader
