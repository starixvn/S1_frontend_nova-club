import { View, Text, styled } from 'dripsy'
import React, { ComponentProps } from 'react'

const StyledCustomText = styled(Text)({
  fontFamily: 'BeVietnamProBold',
})

type CustomTextProps = ComponentProps<typeof StyledCustomText>

const CustomText = (props: CustomTextProps) => {
  return <StyledCustomText {...props} />
}

export default CustomText
