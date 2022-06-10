import { styled, Text, View } from 'dripsy'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const Section = ({ title }: { title: string }) => {
  return (
    <StyledView>
      <StyledText>{title}</StyledText>
      <StyledButton>
        <ButtonText>{'Click More >'}</ButtonText>
      </StyledButton>
    </StyledView>
  )
}

const StyledView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  ml: '$3a',
})

const StyledText = styled(Text)({
  fontSize: [13, 20, 25],
  color: 'white',
  pl: '$1a',
  pr: '$5',
  fontWeight: 'bold',
  textTransform: 'capitalize',
  fontStyle: 'italic',
})

const ButtonText = styled(Text)({
  fontSize: [10, 20, 25],
  px: '$2a',
  py: '$1',
})

const StyledButton = styled(TouchableOpacity)({
  borderRadius: 20,
  bg: 'rgb(48,89,117)',
  justifyContent: 'center',
  mr: '$2a',
})

export default Section
