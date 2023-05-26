import { Pressable, SxProp, Text, styled } from 'dripsy'
import React, { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<typeof Pressable> {
  title: string
  titleSx?: SxProp
  disabled?: boolean
  loading?: boolean
}

interface ButtonContainerProps {
  disabled: boolean
  loading: boolean
}

const Button = ({
  title,
  titleSx,
  disabled = false,
  loading = false,
  ...rest
}: ButtonProps) => {
  const defaultTitleSxStyle: SxProp = {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
  }
  const titleSxStyle = Object.assign(defaultTitleSxStyle, titleSx)

  return (
    <ButtonContainer disabled={disabled} loading={loading} {...rest}>
      <Text sx={titleSxStyle}>{title}</Text>
    </ButtonContainer>
  )
}

const ButtonContainer = styled(Pressable)(
  ({ disabled, loading }: ButtonContainerProps) => ({
    alignItems: 'center',
    justifyContent: 'center',
    py: '$3',
    borderRadius: 15,
    bg: '$secondary.500',
    opacity: disabled || loading ? 0.3 : 1,
  })
)

export default Button
