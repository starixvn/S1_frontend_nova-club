import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { styled, Text, View } from 'dripsy'
import React from 'react'

const ListSectionHeader = ({
  title,
  bgColor,
  iconName,
}: {
  title: string
  bgColor: string
  iconName: string
}) => {
  return (
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
  )
}

const StyledView = styled(View)({
  bg: '$primary',
  borderTopRightRadius: 30,
  borderBottomRightRadius: 30,
  borderWidth: 2,
  borderLeftColor: '$primary',
  borderColor: '$shadow',
  flexDirection: 'row',
  my: '$3',
  mt: '$3',
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

export default ListSectionHeader
