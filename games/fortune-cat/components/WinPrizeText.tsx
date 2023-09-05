import useAnimatedAmount from '@games/shared/hooks/useAnimatedAmount'
import { Container, Graphics, Text } from '@pixi/react'
import { TextStyle } from 'pixi.js'
import { ComponentProps } from 'react'
import { IContainer } from 'utils-pixi/type'

type WinPrizeTextProps = {
  balance?: number
  boxWidth: number
} & ComponentProps<IContainer>

const WinPrizeText = ({
  balance = 0,
  boxWidth,
  ...rest
}: WinPrizeTextProps) => {
  const balanceDisplay = useAnimatedAmount(balance, { tickPerSecond: 10000 })

  return (
    <Container {...rest}>
      <Graphics
        draw={(g) => {
          g.lineStyle(5, 0xffffff, 1)
          g.beginFill('#1FC9D0', 0.3)
          g.drawRoundedRect(boxWidth * -0.5, -35, boxWidth, 70, 100)
          g.endFill()
        }}
      />
      <Text
        x={0}
        y={-15}
        text="TỔNG TIỀN THẮNG"
        anchor={[0.5, 0.5]}
        style={textStyle}
      />
      <Text
        x={0}
        y={15}
        text={`VND ${balanceDisplay}`}
        anchor={[0.5, 0.5]}
        style={textStyle}
      />
    </Container>
  )
}

export const textStyle = new TextStyle({
  fontFamily: 'AvertaStd Regular',
  fontSize: 24,
  // fontWeight: '400',
  fill: ['#ffffff'], // gradient
  // dropShadow: true,
  // dropShadowColor: '#ccced2',
  // dropShadowBlur: 6,
  // dropShadowAngle: Math.PI / 6,
  // dropShadowDistance: 0.5,
})

export default WinPrizeText
