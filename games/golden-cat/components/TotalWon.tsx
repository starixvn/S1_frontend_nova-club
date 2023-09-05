import { ComponentProps } from 'react'

import { AssetBasePath } from '@games/config'
import { Container, Sprite, Text } from '@pixi/react'
import { IContainer } from 'utils-pixi/type'
import { GamePackageName } from '../config'
import useAnimatedAmount from '@games/shared/hooks/useAnimatedAmount'
import { TextStyle } from 'pixi.js'

type Props = {
  balance: number
} & ComponentProps<IContainer>

export default function TotalWon({
  balance,
  width,
  height = 0,
  ...rest
}: Props) {
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
        text="TỔNG TIỀN THẮNG"
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
