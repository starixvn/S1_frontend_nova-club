import useAnimatedAmount from '@games/shared/hooks/useAnimatedAmount'
import { translate } from '@games/shared/translations/translationByCurrency'
import { Container, Graphics, Text } from '@pixi/react'
import { TextStyle } from 'pixi.js'
import { ComponentProps, useMemo } from 'react'
import { useAppSelector } from 'rewards/provider/redux/store'
import { IContainer } from 'utils-pixi/type'

type WinPrizeTextProps = {
  balance?: number
  width: number
} & ComponentProps<IContainer>

const WinPrizeText = ({ balance = 0, width, ...rest }: WinPrizeTextProps) => {
  const balanceDisplay = useAnimatedAmount(balance, { tickPerSecond: 1000 })
  const currency = useAppSelector((s) => s.setting.currency)

  const textStyle = useMemo(() => {
    return new TextStyle({
      fontFamily: 'AvertaStd Regular',
      fontSize: width * 0.05,
      // fontWeight: '400',
      fill: ['#ffffff'], // gradient
      // dropShadow: true,
      // dropShadowColor: '#ccced2',
      // dropShadowBlur: 6,
      // dropShadowAngle: Math.PI / 6,
      // dropShadowDistance: 0.5,
    })
  }, [width])

  const height = width / 6.7

  return (
    <Container {...rest}>
      <Graphics
        draw={(g) => {
          g.clear()
          g.beginFill('#E69B0D')
          g.drawRoundedRect(width * -0.5, -height * 0.5, width, height, 20)
          g.endFill()
        }}
      />
      <Text
        x={-width * 0.47}
        text={`${translate(currency, 'total')} :`}
        anchor={[0, 0.5]}
        style={textStyle}
      />
      <Text
        x={width * 0.47}
        text={balanceDisplay}
        anchor={[1, 0.5]}
        style={textStyle}
      />
    </Container>
  )
}

export default WinPrizeText
