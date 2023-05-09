import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import { styled } from 'dripsy'
import React, { ComponentProps } from 'react'

const IconComponent = createIconSetFromIcoMoon(
  require('../assets/fonts/icon/selection.json'),
  'Icomoon',
  require('../assets/fonts/icon/icomoon.ttf')
)

export const DripsyIcon = styled(IconComponent)()

export type IconComponentProps = ComponentProps<typeof IconComponent> &
  ComponentProps<typeof DripsyIcon>

const Icon = (iconProps: IconComponentProps) => {
  //   const { theme } = useDripsyTheme()
  //   const sx = useSx()

  //   const themedProps = sx({
  //     color: iconProps.color,
  //   })

  return <DripsyIcon size={25} {...iconProps} />
}

export default Icon
