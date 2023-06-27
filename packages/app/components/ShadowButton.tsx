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
  //You can use either the 'borderTopLeftRadius' or 'borderTopStartRadius'
  //and their variations to define the corners radii, although I recommend the latter as it's the RTL standard.
  //Having a radius greater than its side will mess the shadow if the sizes aren't defined.
  //You can use the safeRender property to only show the shadow on the 2nd render and beyond,
  //when we have the exact component size and the radii are properly limited.
  return (
    <StyledShadowButton
      offset={[0, 1]}
      startColor={theme.colors.$primary[100]}
      distance={1}
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
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    pb: 9,
    pt: 10, // 1 more unit to balance the shadow at bottom
    px: 8,
    bg: isActive ? '$primary.500' : '$primary.700',
  })
)
export default ShadowButton
