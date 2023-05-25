import { Pressable, Text, styled } from 'dripsy'
import React, { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<typeof Pressable> {
  title: string
  titleProps?: ComponentProps<typeof Text>
}

const Button = ({ title, titleProps: titleProps, ...rest }: ButtonProps) => {
  return (
    <ButtonContainer {...rest}>
      <Text
        sx={{ fontWeight: 'bold', fontSize: 18, textTransform: 'uppercase' }}
        {...titleProps}
      >
        {title}
      </Text>
    </ButtonContainer>
  )
}

const ButtonContainer = styled(Pressable)({
  alignItems: 'center',
  py: '$3',
  borderRadius: 15,
  bg: '$secondary.500',
})

export default Button
