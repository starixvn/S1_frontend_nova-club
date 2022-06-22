import useContainerDimension from 'app/hooks/useContainerDimension'
import BouncePressable from 'app/pressable/BouncePressable'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Image, SafeAreaView, styled, Text, useSx, View } from 'dripsy'
import React, { useState } from 'react'
import { Platform, StatusBar } from 'react-native'
import { useRouter } from 'solito/router'
import MainMenu from './MainMenu'

const MainHeader = () => {
  const isIOS = Platform.OS === 'ios'
  const isAndroid = Platform.OS === 'android'
  const { width } = useContainerDimension()
  const [showMenu, setShowMenu] = useState(false)
  const sx = useSx()
  const { push } = useRouter()

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
                      {/* <StyledBgImage
                        source={require('../assets/images/header/walletbg.png')}
                        resizeMode="contain"
                      />
                      <StyledWalletImg source={i.img} resizeMode="contain" /> */}
                      <Text
                        variant="sm"
                        numberOfLines={1}
                        sx={{ flex: 1, color: '$yellow' }}
                      >
                        88888885934789534798543789547589759
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
  width: [10, 20],
  height: [20, 20],
  position: 'absolute',
  left: [10, 10],
  top: [4, 6],
})

const StyledImg = styled(Image)({
  ml: '$2',
})

const StyledSearchBox = styled(View)({
  borderRadius: 20,
  bg: 'rgb(48,89,117)',
  flexDirection: 'row',
  justifyContent: 'space-between',
  px: '$2',
  overflow: 'hidden',
  alignItems: 'center',
})

export default MainHeader
