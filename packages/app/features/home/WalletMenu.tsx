import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import lottery from 'app/config/games/lottery'
import { Image, ScrollView, styled, Text, View } from 'dripsy'
import React from 'react'
import GradientIcon from 'app/components/GradientIcon'

const MENU = [
  {
    label: 'Cash',
    icon: 'lc',
    bgColor: 'maroon',
  },
  {
    label: 'Chips',
    icon: 'lt',
    bgColor: 'blue',
  },
  {
    label: 'Deposit',
    icon: 'games',
    bgColor: 'yellow',
  },
]

const WalletMenu = () => {
  return (
    <StyledTop>
      <DripsyGradient gradient={'darkBlue'} sx={{ borderBottomWidth: 1 }}>
        <StyledContainer>
          {MENU.map((i, index) => {
            return (
              <StyledBox key={i.label}>
                <View
                  sx={{
                    flexDirection: 'row',
                    paddingX: '$5',
                  }}
                >
                  <GradientIcon
                    size={'small'}
                    bgColor={i.bgColor}
                    iconName={i.icon}
                  />
                  <StyledViewText>
                    <Text>{i.label}</Text>
                    {index !== 2 && <StyledText>$888.00</StyledText>}
                  </StyledViewText>
                </View>
                <StyledWrapBar sx={{}}>
                  {index !== 2 && <StyledBar />}
                </StyledWrapBar>
              </StyledBox>
            )
          })}
        </StyledContainer>
      </DripsyGradient>
    </StyledTop>
  )
}

const StyledTop = styled(View)({
  borderTopWidth: 2.5,
  borderColor: '#0B76A5',
})

const StyledContainer = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-around',
  py: '$3',
})

const StyledBox = styled(View)({
  flexDirection: 'row',
  my: '$2',
})

const StyledWrapBar = styled(View)({
  flexDirection: 'row',
  justifyContent: 'flex-end',
})

const StyledBar = styled(View)({
  width: [1, 2, 3],
  bg: '#99ECFE',
  my: '$3',
  flexDirection: 'row',
  justifyContent: 'flex-end',
})

const StyledViewText = styled(View)({
  justifyContent: 'center',
  alignItems: 'center',
  ml: '$1',
})
const StyledText = styled(Text)({
  color: '$yellow',
  fontWeight: 'bold',
  fontSize: 14,
})

const StyledGradient = styled(DripsyGradient)({
  borderWidth: 1,
  borderRadius: 15,
  borderColor: '#99ECFE',
})

const StyledIcon = styled(Icon)({
  color: 'white',
  padding: '$1',
})

export default WalletMenu
