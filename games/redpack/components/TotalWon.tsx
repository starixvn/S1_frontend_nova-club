import { Container, Text, useTick } from '@pixi/react'
import { ISize, TextStyle } from 'pixi.js'
import { ComponentProps, useState } from 'react'
import { IContainer } from 'utils-pixi/type'
import useAnimatedAmount from '@games/shared/hooks/useAnimatedAmount'

type Props = {
  size: ISize
  balance: number
} & ComponentProps<IContainer>

const amountStyle = new TextStyle({
  fill: '#950000',
  fontSize: 22,
  fontFamily: 'AvertaStd Bold',
})

const TICK_PER_SECOND = 100

export default function TotalWon({ balance = 0, size, ...rest }: Props) {
  const balanceDisplay = useAnimatedAmount(balance, { tickPerSecond: 2000 })

  return (
    <Container {...rest}>
      <Text text="TỔNG TIỀN THẮNG : " anchor={[0, 0.5]} style={amountStyle} />
      <Text
        x={size.width}
        text={balanceDisplay}
        anchor={[1, 0.5]}
        style={amountStyle}
      />
    </Container>
  )
}
