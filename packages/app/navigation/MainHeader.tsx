import BouncePressable from 'app/pressable/BouncePressable'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Image, styled, useSx, View } from 'dripsy'
import React from 'react'
import useContextualRouter from './contextual/useContextualRouter'
import MainHeaderAuth from './MainHeaderAuth'
import MainHeaderMenu from './MainHeaderMenu'

const MainHeader = () => {
  const sx = useSx()
  const headerHeight = sx({
    height: 'header',
  }).height

  const { push } = useContextualRouter()
  const token = useAppSelector((s) => s.auth.info?.token)

  // Google Pixel 5a require this insets to get accurate value
  const insets = useSafeArea()

  const iconHeight = headerHeight.map((x) => x * 0.7)

  return (
    <>
      <View sx={{ bg: '$primary' }}>
        {/* <Video
          isMuted
          isLooping
          shouldPlay
          style={{
            width: '100%',
            height: '100%',
            left: 0,
            right: 0,
            bottom: 0,
            position: 'absolute',
          }}
          source={{
            uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/cny/header.mp4`,
          }}
          resizeMode="cover"
          useNativeControls={false}
        /> */}
        <View sx={{ paddingTop: insets.top }}>
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
            {token ? <MainHeaderMenu /> : <MainHeaderAuth />}
          </StyledContainer>
        </View>
      </View>
    </>
  )
}

const StyledContainer = styled(View)({
  flexDirection: 'row',
  // bg: '$primary',
  alignItems: 'center',
  px: '$2',
})

const StyledLogo = styled(Image)({})

export default MainHeader
