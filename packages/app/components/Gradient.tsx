import { DripsyCustomTheme } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import { ComponentProps } from 'react'

export type GradientList = keyof DripsyCustomTheme['linearGradients']

export type DripsyGradientProps = Override<
  ComponentProps<typeof Gradient>,
  { gradient: GradientList }
>

export function DripsyGradient(rest: DripsyGradientProps) {
  return <Gradient {...rest} gradient={rest.gradient} />
}
