import useContainerDimension from 'app/hooks/useContainerDimension'
import BouncePressable from 'app/pressable/BouncePressable'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
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
import { Platform, StatusBar } from 'react-native'
import { useRouter } from 'solito/router'
import MainMenu from './MainMenu'
import { usePlayerBalanceQuery } from 'app/custom_services/walletApi'

const MainHeader = () => {
  const isIOS = Platform.OS === 'ios'
  const isAndroid = Platform.OS === 'android'
  const { width } = useContainerDimension()
  const [showMenu, setShowMenu] = useState(false)
  const [mainWalletBalance, setMainWalletBalance] = useState(0)
  const sx = useSx()
  const { push } = useRouter()

  const { data: playerBalance, isLoading: isMainWalletLoading } =
    usePlayerBalanceQuery()

  //change to icon
  const MENU_ROW = [
    {
      img: require('../assets/images/header/deposit.png'),
      action: () => {
        console.log('deposit')
      },
    },
    {
      img: require('../assets/images/header/wallet.png'),
      action: () => {
        console.log('wallet')
      },
    },
    {
      img: require('../assets/images/header/avatar.png'),
      action: () => {
        console.log('profile')
        push('/profile')
      },
    },
    {
      img: require('../assets/images/header/menu.png'),
      action: () => {
        setShowMenu(!showMenu)
      },
    },
  ]

  // Google Pixel 5a require this insets to get accurate value
  const insets = useSafeArea()

  const headerHeight = sx({
    height: 'header',
  }).height

  const iconHeight = headerHeight.map((x) => x * 0.6)

  useEffect(() => {
    const mainWallet = playerBalance?.data?.main

    if (mainWallet) {
      const { balance, reward } = mainWallet

      setMainWalletBalance(Number(balance) + Number(reward))
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
          >
            <StyledLogo
              sx={sx({
                height: iconHeight,
                width: iconHeight.map((x) => x * (118 / 69)),
              })}
              source={require('../assets/logo.png')}
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
                      {isMainWalletLoading ? (
                        <ActivityIndicator size={23} sx={{ px: '$1' }} />
                      ) : (
                        <View sx={{ position: 'relative' }}>
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
                        </View>
                      )}
                      <Text
                        variant="sm"
                        numberOfLines={1}
                        sx={{ flex: 1, color: '$yellow' }}
                      >
                        {mainWalletBalance}
                      </Text>
                    </StyledSearchBox>
                  </BouncePressable>
                </View>
              )
            }
            return (
              <BouncePressable onPress={i.action} key={index}>
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
  width: [30, 50],
  height: [30, 50],
})

const StyledWalletImg = styled(Image)({
  width: [10, 12],
  height: [20, 12],
})

const StyledImg = styled(Image)({
  ml: '$2',
})

const StyledSearchBox = styled(View)({
  borderRadius: 20,
  bg: 'rgb(48,89,117)',
  flexDirection: 'row',
  justifyContent: 'space-between',
  pr: '$2',
  pl: '$1',
  overflow: 'hidden',
  alignItems: 'center',
})

export default MainHeader
