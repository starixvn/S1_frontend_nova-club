import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import { styled } from 'dripsy'
import React, { ComponentProps } from 'react'

const IconComponent = createIconSetFromIcoMoon(
  require('../assets/fonts/icon/selection.json'),
  'Icomoon',
  require('../assets/fonts/icon/icomoon.ttf')
)

export const DripsyIcon = styled(IconComponent)({
  color: '$text',
})

export type IconComponentProps = ComponentProps<typeof DripsyIcon>

const Icon = (iconProps: IconComponentProps) => {
  return <DripsyIcon size={20} {...iconProps} />
}

export default Icon
