import { SxProp, styled, useDripsyTheme } from 'dripsy'
import React, { ReactNode } from 'react'
import { Shadow, ShadowProps } from 'react-native-shadow-2'

type ShadowButtonProps = {
  children: ReactNode
  isActive?: boolean
  containerStyle?: SxProp
} & ShadowProps

const ShadowButton = ({
  children,
  isActive = false,
  containerStyle,
  ...rest
}: ShadowButtonProps) => {
  const { theme } = useDripsyTheme()

  return (
    <StyledShadowButton
      offset={[0, 1]}
      startColor={theme.colors.$primary[100]}
      distance={0.2}
      isActive={isActive}
      sx={containerStyle}
      {...rest}
    >
      {children}
    </StyledShadowButton>
  )
}

const StyledShadowButton = styled(Shadow)(
  ({ isActive }: { isActive: boolean }) => ({
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    p: 12,
    px: 8,
    bg: isActive ? '$primary.500' : '$primary.700',
  })
)
export default ShadowButton
