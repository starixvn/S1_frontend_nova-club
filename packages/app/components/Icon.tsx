import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import { DEFAULT_ICON } from 'app/hooks/useFontInit'
import { styled, useDripsyTheme, useSx } from 'dripsy'
import React, { ComponentProps } from 'react'

const IconComponent = createIconSetFromIcoMoon(
  require('app/assets/fonts/selection.json'),
  DEFAULT_ICON.FAMILY,
  DEFAULT_ICON.FILENAME
)

const StylesIcon = styled(IconComponent)()

export type IconComponentProps = ComponentProps<typeof IconComponent> &
  ComponentProps<typeof StylesIcon>

const Icon = (iconProps: IconComponentProps) => {
  const { theme } = useDripsyTheme()
  const sx = useSx()

  const themedProps = sx({
    color: iconProps.color,
  })

  return (
    <StylesIcon size={25} {...theme.icon} {...iconProps} {...themedProps} />
  )
}

export default Icon
