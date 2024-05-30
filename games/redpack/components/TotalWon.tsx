import useAnimatedAmount from '@games/shared/hooks/useAnimatedAmount'
import { translate } from '@games/shared/translations/translationByCurrency'
import { Container, Text } from '@pixi/react'
import { ISize, TextStyle } from 'pixi.js'
import { ComponentProps } from 'react'
import { useAppSelector } from 'rewards/provider/redux/store'
import { IContainer } from 'utils-pixi/type'

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
  const currency = useAppSelector((s) => s.setting.currency)

  return (
    <Container {...rest}>
      <Text
        text={`${translate(currency, 'total')} : `}
        anchor={[0, 0.5]}
        style={amountStyle}
      />
      <Text
        x={size.width}
        text={balanceDisplay}
        anchor={[1, 0.5]}
        style={amountStyle}
      />
    </Container>
  )
}
