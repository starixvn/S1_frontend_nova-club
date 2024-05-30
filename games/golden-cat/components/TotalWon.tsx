import { ComponentProps } from 'react'

import { AssetBasePath } from '@games/config'
import useAnimatedAmount from '@games/shared/hooks/useAnimatedAmount'
import { translate } from '@games/shared/translations/translationByCurrency'
import { Container, Sprite, Text } from '@pixi/react'
import { TextStyle } from 'pixi.js'
import { useAppSelector } from 'rewards/provider/redux/store'
import { IContainer } from 'utils-pixi/type'
import { GamePackageName } from '../config'

type Props = {
  balance: number
} & ComponentProps<IContainer>

export default function TotalWon({
  balance,
  width,
  height = 0,
  ...rest
}: Props) {
  const currency = useAppSelector((state) => state.setting.currency)
  const balanceDisplay = useAnimatedAmount(balance, { tickPerSecond: 2000 })
  return (
    <Container {...rest}>
      <Sprite
        image={`${AssetBasePath}/assets/${GamePackageName}/images/bgWin.png`}
        anchor={0.5}
        width={width}
        height={height}
      />
      <Text
        text={translate(currency, 'total')}
        anchor={[0.5, 1]}
        style={
          new TextStyle({
            fontSize: height * 0.17,
            fill: 'white',
            fontFamily: 'AvertaStd Black',
            lineHeight: height * 0.35,
          })
        }
      />
      <Text
        text={balanceDisplay}
        anchor={[0.5, 0]}
        style={
          new TextStyle({
            fontSize: height * 0.2,
            fill: 'white',
            fontFamily: 'AvertaStd Black',
          })
        }
      />
    </Container>
  )
}
