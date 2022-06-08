import { Image, SafeAreaView, styled, Text, View } from 'dripsy'
import React, { useState } from 'react'
import { Platform, TouchableOpacity, StatusBar } from 'react-native'
import { useRouter } from 'solito/router'
import MainMenu from './MainMenu'

const MainHeader = () => {
  const isIOS = Platform.OS === 'ios'
  const isAndroid = Platform.OS === 'android'
  const [showMenu, setShowMenu] = useState(false)
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

  return (
    <SafeAreaView sx={{ bg: '$secondary' }}>
      <StyledContainer
        sx={{
          my: isIOS ? 0 : isAndroid ? StatusBar.currentHeight : '$5',
        }}
      >
        <View style={{ flex: 1 }}>
          <StyledLogo
            source={require('../assets/logo.png')}
            resizeMode="contain"
          />
        </View>
        {MENU_ROW.map((i, index) => {
          if (index === 1) {
            return (
              <TouchableOpacity key={index}>
                <StyledSearchBox>
                  <StyledBgImage
                    source={require('../assets/images/header/walletbg.png')}
                    resizeMode="contain"
                  />
                  <StyledWalletImg source={i.img} resizeMode="contain" />
                  <StyledText>88K</StyledText>
                </StyledSearchBox>
              </TouchableOpacity>
            )
          }
          return (
            <TouchableOpacity onPress={i.action} key={index}>
              <StyledImg source={i.img} resizeMode="contain" />
            </TouchableOpacity>
          )
        })}
      </StyledContainer>
      {showMenu && <MainMenu />}
    </SafeAreaView>
  )
}

const StyledContainer = styled(View)({
  flexDirection: 'row',
  bg: '$secondary',
  mb: '$3',
  alignItems: 'center',
})

const StyledLogo = styled(Image)({
  width: [50, 50, 50],
  height: [30, 50, 50],
  ml: '$10',
})

const StyledBgImage = styled(Image)({
  width: [30, 50, 50],
  height: [30, 50, 50],
})

const StyledWalletImg = styled(Image)({
  width: [10, 20, 20],
  height: [20, 20, 20],
  position: 'absolute',
  left: [10, 10, 15],
  top: [4, 6, 12],
})
const StyledImg = styled(Image)({
  width: [40, 50, 60],
  height: [30, 50, 50],
})

const StyledText = styled(Text)({
  alignSelf: 'center',
  color: '$yellow',
  pr: '$4',
})

const StyledSearchBox = styled(View)({
  borderRadius: 20,
  bg: 'rgb(48,89,117)',
  width: [130, 150, 170],
  height: [35, 40, 45],
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderWidth: 2,
  borderColor: '$background',
  mr: '$3',
})

export default MainHeader
