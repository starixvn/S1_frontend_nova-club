import { Gradient } from '@dripsy/gradient'
import { ComponentProps } from 'react'

export type DripsyGradientProps = ComponentProps<typeof Gradient>

export function DripsyGradient(rest: DripsyGradientProps) {
  return <Gradient {...rest} />
}
