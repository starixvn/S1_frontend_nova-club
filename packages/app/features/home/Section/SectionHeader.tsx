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
        sx={{ borderRadius: 20, m: '$2', padding: '$2' }}
      >
        <Icon
          name={iconName}
          size={28}
          sx={{
            color: 'white',
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
  ml: '$7',
  my: '$3',
  mt: '$12',
  alignItems: 'center',
})

const StyledText = styled(Text)({
  fontSize: [18, 23, 28],
  color: 'white',
  padding: '$3',
  fontWeight: 'bold',
})

export default SectionHeader
