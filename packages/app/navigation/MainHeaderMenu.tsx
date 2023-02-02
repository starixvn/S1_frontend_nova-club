import BorderButton from 'app/components/BorderButton'
import { useTransferAllToOneMutation } from 'app/custom_services/walletApi'
import useContainerDimension from 'app/hooks/useContainerDimension'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { ActivityIndicator, Image, styled, Text, useSx, View } from 'dripsy'
import { useEffect, useRef, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'
import { usePlayerBalanceQuery } from 'services/walletApi'
import useContextualRouter from './contextual/useContextualRouter'
import MainMenu from './MainMenu'

const MainHeaderMenu = () => {
  const { width } = useContainerDimension()
  const { t } = useLocalization()
  const sx = useSx()
  const headerHeight = sx({
    height: 'header',
  }).height
  const [showMenu, setShowMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: headerHeight })
  const [totalBalance, setTotalBalance] = useState('0')
  const lastTransferredToMainWalletToken = useRef('')
  const { push } = useContextualRouter()
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

  //change to icon
  const MENU_ROW = [
    {
      img: require('../assets/images/header/wallet.png'),
      action: () => refreshWallet(),
    },
    {
      img: require('../assets/images/header/avatar.png'),
      action: () => {
        push('/profile')
      },
    },
    {
      img: require('../assets/images/header/menu.png'),
      action: () => {
        setShowMenu(!showMenu)
      },
      props: {
        onLayout: (event: LayoutChangeEvent) => {
          const { x, width } = event.nativeEvent.layout
          const menuXPosition = x + width

          setMenuPosition((position) => ({
            ...position,
            x: menuXPosition,
          }))
        },
      },
    },
  ]

  const iconHeight = headerHeight.map((x) => x * 0.7)

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
          total - Number(wallets.main.balance) + Number(wallets.main.reward)
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
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
    >
      <BorderButton
        sx={{
          borderColor: '$lightNavyBlue2',
          backgroundColor: '$darkOcean',
        }}
        text={t('menu.deposit')}
        textColor={'$black'}
        size={18}
        innerGradientColor={['$cyan', '$lightNavyBlue']}
        onPress={() =>
          isPlayerName
            ? push('/deposit')
            : push(`/profile/account-verification`)
        }
      />
      {MENU_ROW.map((i, index) => {
        if (index === 0) {
          return (
            <View sx={{ flex: 1, maxWidth: width * 0.3 }} key={index}>
              <BouncePressable onPress={i.action} key={index}>
                <StyledSearchBox
                  sx={{
                    height: iconHeight,
                  }}
                >
                  <View
                    sx={{
                      position: 'relative',
                      width: [35, 40],
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isMainWalletLoading ? (
                      <ActivityIndicator
                        color={'$lightCyan'}
                        sx={{ px: '$1' }}
                      />
                    ) : (
                      <>
                        <StyledBgImage
                          source={require('../assets/images/header/walletbg.png')}
                          resizeMode="contain"
                        />

                        <View
                          sx={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <StyledWalletImg
                            source={i.img}
                            resizeMode="contain"
                          />
                        </View>
                      </>
                    )}
                  </View>

                  <Text
                    variant="sm"
                    numberOfLines={1}
                    sx={{ color: '$yellow', fontSize: [14, 16] }}
                  >
                    {totalBalance}
                  </Text>
                </StyledSearchBox>
              </BouncePressable>
            </View>
          )
        }
        return (
          <BouncePressable onPress={i.action} key={index} {...(i.props || {})}>
            <StyledImg
              sx={{ width: iconHeight, height: iconHeight }}
              source={i.img}
              resizeMode="contain"
            />
          </BouncePressable>
        )
      })}
      <MainMenu
        isShow={showMenu}
        onMenu={(e) => {
          return setShowMenu(e)
        }}
        parentPosition={menuPosition}
      />
    </View>
  )
}

const StyledBgImage = styled(Image)({
  width: [35, 40],
  height: [35, 40],
})

const StyledWalletImg = styled(Image)({
  width: 10,
  height: 20,
})

const StyledImg = styled(Image)({
  ml: '$2',
})

const StyledSearchBox = styled(View)({
  borderRadius: 20,
  bg: 'rgb(48,89,117)',
  flexDirection: 'row',
  justifyContent: 'space-between',
  pr: '$3',
  overflow: 'hidden',
  alignItems: 'center',
})

export default MainHeaderMenu
