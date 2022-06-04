import { styled, Text, View } from 'dripsy'
import React from 'react'
import GradientBox from './GradientBox'

type GradientTextBoxProps = {
  title: string
  value: string
  labelWidth?: number
}
const GradientTextBox = ({
  title,
  value,
  labelWidth = 0.8,
}: GradientTextBoxProps) => {
  return (
    <GradientBox
      sx={{
        my: '$2',
      }}
    >
      <StyledView>
        <StyledTitleText
          sx={{
            flex: labelWidth,
          }}
        >
          {title} :
        </StyledTitleText>
        <StyledValueText>{value}</StyledValueText>
      </StyledView>
    </GradientBox>
  )
}

const StyledView = styled(View)(() => ({
  flexDirection: 'row',
  py: '$8',
  px: '$8',
  my: '$2',
}))
const StyledTitleText = styled(Text)(() => ({
  flex: 1,
  fontWeight: 'bold',
  color: '$PaleBlue',
}))
const StyledValueText = styled(Text)(() => ({
  flex: 1,
  fontWeight: 'bold',
}))

export default GradientTextBox
