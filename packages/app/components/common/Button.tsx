import { Pressable, Text, styled } from 'dripsy'
import React, { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<typeof Pressable> {
  title: string
  titleProps?: ComponentProps<typeof Text>
  disabled?: boolean
  loading?: boolean
}

interface ButtonContainerProps {
  disabled: boolean
  loading: boolean
}

const Button = ({
  title,
  titleProps: titleProps,
  disabled = false,
  loading = false,
  ...rest
}: ButtonProps) => {
  return (
    <ButtonContainer disabled={disabled} loading={loading} {...rest}>
      <Text
        sx={{ fontWeight: 'bold', fontSize: 18, textTransform: 'uppercase' }}
        {...titleProps}
      >
        {title}
      </Text>
    </ButtonContainer>
  )
}

const ButtonContainer = styled(Pressable)(
  ({ disabled, loading }: ButtonContainerProps) => ({
    alignItems: 'center',
    py: '$3',
    borderRadius: 15,
    bg: '$secondary.500',
    opacity: disabled || loading ? 0.3 : 1,
  })
)

export default Button
