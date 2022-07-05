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
import useContextualRouting from 'app/hooks/useContextualRouting'
import { ContextualModuleKey } from './web/withContextualNavConstant'

const MainHeader = () => {
  const { width } = useContainerDimension()
  const [showMenu, setShowMenu] = useState(false)

  const { makeContextualHref } = useContextualRouting(ContextualModuleKey.Home)
  const [mainWalletBalance, setMainWalletBalance] = useState(0)
  const sx = useSx()
  const { push } = useRouter()

  const {
    data: playerBalance,
    isFetching: isMainWalletLoading,
    refetch,
  } = usePlayerBalanceQuery()

  //change to icon
  const MENU_ROW = [
    {
      img: require('../assets/images/header/deposit.png'),
      action: () => {
        push(makeContextualHref('deposit'), 'deposit')
      },
    },
    {
      img: require('../assets/images/header/wallet.png'),
      action: () => refetch(),
    },
    {
      img: require('../assets/images/header/avatar.png'),
      action: () => {
        push('profile')
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
                      <View
                        sx={{
                          position: 'relative',
                          width: [35, 40],
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {isMainWalletLoading ? (
                          <ActivityIndicator size={23} sx={{ px: '$1' }} />
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
