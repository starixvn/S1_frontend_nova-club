import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { styled, Text, TextInput, View } from 'dripsy'
import React from 'react'

const ListSectionHeader = ({
  title,
  bgColor,
  iconName,
  search,
}: {
  title: string
  bgColor: string
  iconName: string
  search?: boolean
}) => {
  return (
    <StyledContainer>
      <StyledView>
        <StyledGradient gradient={bgColor}>
          <Icon
            name={iconName}
            size={15}
            sx={{
              color: 'white',
            }}
          />
        </StyledGradient>
        <StyledText>{title}</StyledText>
      </StyledView>
      {search && (
        <StyledSearchBox>
          <TextInput sx={{ width: '80%', height: '100%', pl: '$5' }} />
          <Icon
            name="lc"
            sx={{ alignSelf: 'center', pr: '$3' }}
            color={'white'}
            size={15}
          />
        </StyledSearchBox>
      )}
    </StyledContainer>
  )
}

const StyledContainer = styled(View)({
  my: '$3',
  mt: '$3',
  flexDirection: 'row',
  justifyContent: 'space-between',
})

const StyledView = styled(View)({
  bg: '$primary',
  borderTopRightRadius: 30,
  borderBottomRightRadius: 30,
  borderWidth: 2,
  borderLeftColor: '$primary',
  borderColor: '$shadow',
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'flex-start',
})

const StyledText = styled(Text)({
  fontSize: [15, 20, 25],
  color: 'white',
  padding: '$3',
  pl: '$3',
  pr: '$10',
  fontWeight: 'bold',
  fontStyle: 'italic',
})

const StyledGradient = styled(DripsyGradient)({
  borderRadius: 10,
  padding: '$1',
  ml: '$8',
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

export default ListSectionHeader
