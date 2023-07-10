import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import { styled } from 'dripsy'
import React, { ComponentProps } from 'react'

const IconComponent = createIconSetFromIcoMoon(
  require('agent/assets/fonts/selection.json'),
  'Icomoon',
  require('agent/assets/fonts/icomoon.ttf')
)

export const DripsyIcon = styled(IconComponent)(({ color }) => ({
  color: color ?? '$text',
}))

export type IconComponentProps = ComponentProps<typeof IconComponent> &
  ComponentProps<typeof DripsyIcon>

const Icon = (iconProps: IconComponentProps) => {
  return <DripsyIcon size={25} {...iconProps} />
}

export default Icon
