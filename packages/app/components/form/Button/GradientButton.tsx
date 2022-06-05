import { FC } from 'react'
import { Button, FillGradient } from '.'
/* INCOMPLETE, originally created to replace fill "gradient" type */

type GradientButtonProps = {
  children: string
  fill?: FillGradient
}

const GradientButton: FC<GradientButtonProps> = ({
  children,
  fill,
  ...rest
}) => {
  return (
    <Button
      fill={{
        type: 'gradient',
        color: 'orangeRed',
        start: { x: 0, y: 1 },
        end: { x: 0, y: 1 },
        ...fill,
      }}
      {...rest}
    >
      <Button.Label>{children}</Button.Label>
    </Button>
  )
}

export default GradientButton
