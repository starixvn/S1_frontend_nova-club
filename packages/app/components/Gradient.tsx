import { Gradient } from '@dripsy/gradient'
import { ComponentProps } from 'react'

export type DripsyGradientProps = ComponentProps<typeof Gradient>

export function DripsyGradient(props: DripsyGradientProps) {
  return <Gradient {...props} />
}
