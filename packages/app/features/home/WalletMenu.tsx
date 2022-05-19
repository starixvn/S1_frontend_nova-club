import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import lottery from 'app/config/games/lottery'
import { Image, ScrollView, styled, Text, View } from 'dripsy'
import React from 'react'

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
    <DripsyGradient gradient={'darkBlue'} sx={{ borderBottomWidth: 1 }}>
      <StyledContainer>
        {MENU.map((i, index) => {
          return (
            <View
              sx={{
                flexDirection: 'row',
                my: '$2',
                paddingX: '$5',
              }}
            >
              <DripsyGradient
                gradient={i.bgColor}
                sx={{
                  borderWidth: 1,
                  borderColor: '#99ECFE',
                  borderRadius: 15,
                }}
              >
                <Icon
                  name={i.icon}
                  size={33}
                  sx={{
                    color: 'white',
                    padding: '$1',
                  }}
                />
              </DripsyGradient>
              <View
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  ml: '$3',
                }}
              >
                <Text>{i.label}</Text>
                {index !== 2 && (
                  <Text
                    sx={{
                      color: '$yellow',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}
                  >
                    $888.00
                  </Text>
                )}
              </View>
            </View>
          )
        })}
      </StyledContainer>
    </DripsyGradient>
  )
}

const StyledContainer = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-around',
  pb: '$3',
})

const StyledImage = styled(Image)({
  margin: '$1',
  borderRadius: 5,
  height: [110, 130, 150],
  width: [110, 130, 150],
})

export default WalletMenu
