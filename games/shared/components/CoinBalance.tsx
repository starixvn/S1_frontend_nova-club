import { Container, Graphics, Sprite, Text, useTick } from '@pixi/react'
import { TextMetrics, TextStyle } from 'pixi.js'
import { ComponentProps, useEffect, useState } from 'react'
import { AssetPath } from '../config'
import Loading from './Loading'
import useAnimatedNumber from '../hooks/useAnimatedNumber'
import { toThousandSeparator } from 'utils-pixi/helper'

type Props = { balance?: number } & ComponentProps<typeof Container>

const style = new TextStyle({
  fill: '#FAFA7F',
  fontSize: 18,
  fontFamily: 'AvertaStd Semibold',
})

const COIN_SIZE = 45

export default function CoinBalance({ balance, ...rest }: Props) {
  const _balance = useAnimatedNumber(balance, { tickPerSecond: 1 })
  const convertBalance =
    balance != null
      ? _balance > 99999
        ? '99999+'
        : Math.floor(_balance).toString()
      : ''

  const balanceDisplay = toThousandSeparator(convertBalance)
  const textMetrics = TextMetrics.measureText(balanceDisplay, style)

  const textWidth = Math.max(textMetrics.width, 20)
  const padding = 10
  const wrapperWidth = textWidth + padding * 2 + COIN_SIZE * 0.5

  return (
    <Container {...rest}>
      <Graphics
        anchor={[1, 0.5]}
        draw={(g) => {
          g.clear()
          g.beginFill(0x32325a)
          g.lineStyle(2, '#9696e6')
          g.drawRoundedRect(
            -wrapperWidth,
            -18,
            wrapperWidth,
            36,
            wrapperWidth * 0.5
          )
          g.endFill()
        }}
      />
      <Sprite
        anchor={0.5}
        image={`${AssetPath}/coin.png`}
        x={-wrapperWidth}
        width={COIN_SIZE}
        height={COIN_SIZE}
        // alpha={0.8}
      />
      <Text
        x={-padding}
        anchor={[1, 0.5]}
        text={balanceDisplay}
        style={style}
      />
      {balance == null && <Loading scale={0.4} anchor={1} x={-20} />}
    </Container>
  )
}
