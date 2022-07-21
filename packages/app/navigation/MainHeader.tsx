import { useTransferAllToOneMutation } from 'app/custom_services/walletApi'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useContextualRouting from 'app/hooks/useContextualRouting'
import BouncePressable from 'app/pressable/BouncePressable'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  styled,
  Text,
  useSx,
  View,
} from 'dripsy'
import React, { useEffect, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { usePlayerBalanceQuery } from 'services/walletApi'
import { useRouter } from 'solito/router'
import MainMenu from './MainMenu'

const MainHeader = () => {
  const { width } = useContainerDimension()
  const sx = useSx()
  const headerHeight = sx({
    height: 'header',
  }).height

  const [showMenu, setShowMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: headerHeight })

  const { makeContextualHref } = useContextualRouting()
  const [mainWalletBalance, setMainWalletBalance] = useState('0')
  const { push } = useRouter()

  const {
    data: playerBalance,
    isFetching: isMainWalletLoading,
    refetch,
  } = usePlayerBalanceQuery()

  const [_, { isLoading: isTransferringToMain }] = useTransferAllToOneMutation({
    fixedCacheKey: 'transfer-all-to-one',
  })

  const refreshWallet = () => {
    if (isTransferringToMain) return

    refetch()
  }

  //change to icon
  const MENU_ROW = [
    {
      img: require('../assets/images/header/deposit.png'),
      action: () => {
        push(makeContextualHref('deposit'), '/deposit')
      },
    },
    {
      img: require('../assets/images/header/wallet.png'),
      action: () => refreshWallet(),
    },
    {
      img: require('../assets/images/header/avatar.png'),
      action: () => {
        push(makeContextualHref('profile'), '/profile')
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

  // Google Pixel 5a require this insets to get accurate value
  const insets = useSafeArea()

  const iconHeight = headerHeight.map((x) => x * 0.7)

  useEffect(() => {
    const mainWallet = playerBalance?.data?.main

    if (mainWallet) {
      const { balance, reward } = mainWallet
      const totalBalance = Number(balance) + Number(reward)
      const formattedBalance = toCurrency(totalBalance, Currency.VND, {
        symbol: false,
      })

      setMainWalletBalance(formattedBalance)
    }

    return () => {
      setMainWalletBalance('0')
    }
  }, [playerBalance])

  return (
    <SafeAreaView sx={{ paddingTop: insets.top, bg: '$primary' }}>
      <StyledContainer sx={{ height: headerHeight }}>
        <View>
          <BouncePressable
            onPress={() => {
              push('/')
            }}
            sx={{ px: '$2', mb: 5 }}
          >
            <StyledLogo
              sx={sx({
                height: iconHeight,
                width: iconHeight.map((x) => x * (519 / 186)),
              })}
              source={require('../assets/images/logo.png')}
              resizeMode="contain"
            />
          </BouncePressable>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          {MENU_ROW.map((i, index) => {
            if (index === 1) {
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
                        {mainWalletBalance}
                      </Text>
                    </StyledSearchBox>
                  </BouncePressable>
                </View>
              )
            }
            return (
              <BouncePressable
                onPress={i.action}
                key={index}
                {...(i.props || {})}
              >
                <StyledImg
                  sx={{ width: iconHeight, height: iconHeight }}
                  source={i.img}
                  resizeMode="contain"
                />
              </BouncePressable>
            )
          })}
        </View>
      </StyledContainer>
      <MainMenu
        isShow={showMenu}
        onMenu={(e) => {
          return setShowMenu(e)
        }}
        parentPosition={menuPosition}
      />
    </SafeAreaView>
  )
}

const StyledContainer = styled(View)({
  flexDirection: 'row',
  bg: '$primary',
  alignItems: 'center',
  px: '$2',
})

const StyledLogo = styled(Image)({})

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

export default MainHeader
