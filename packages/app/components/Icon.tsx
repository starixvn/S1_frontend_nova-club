import createIconSetFromIcoMoon from '@expo/vector-icons/createIconSetFromIcoMoon'
import { styled, useDripsyTheme, useSx } from 'dripsy'
import React, { ComponentProps, forwardRef } from 'react'

const IconComponent = createIconSetFromIcoMoon(
  require('../assets/fonts/icon/selection.json'),
  'Icomoon',
  require('../assets/fonts/icon/icomoon.ttf')
)

export const DripsyIcon = styled(IconComponent)(({ color }) => ({
  color: color ?? '$text',
}))

export type IconProps = ComponentProps<typeof DripsyIcon>

const Icon = (props: IconProps) => {
  return <DripsyIcon size={20} {...props} />
}

Icon.displayName = 'Icon'

export default Icon
