import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { styled, Text, View } from 'dripsy'
import React from 'react'

const SectionHeader = ({
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
      <DripsyGradient
        gradient={bgColor}
        sx={{
          borderRadius: 15,
          m: '$1',
          height: 30,
          aspectRatio: 1,
          justifyContent: 'center',
        }}
      >
        <Icon
          name={iconName}
          size={23}
          sx={{
            color: 'white',
            alignSelf: 'center',
          }}
        />
      </DripsyGradient>
      <StyledText>{title}</StyledText>
    </StyledView>
  )
}

const StyledView = styled(View)({
  bg: '$primary',
  borderTopLeftRadius: 30,
  borderBottomLeftRadius: 30,
  borderWidth: 2,
  borderRightColor: '$primary',
  borderColor: '$shadow',
  flexDirection: 'row',
  ml: '$3a',
  my: '$1a',
  mt: '$6',
  alignItems: 'center',
})

const StyledText = styled(Text)({
  fontSize: [18, 23, 28],
  color: 'white',
  padding: '$1a',
  fontWeight: 'bold',
})

export default SectionHeader
