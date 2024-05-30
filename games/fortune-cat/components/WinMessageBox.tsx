import { AssetBasePath } from '@games/config'
import useAnimatedAmount from '@games/shared/hooks/useAnimatedAmount'
import { Container, Graphics, Sprite, Text } from '@pixi/react'
import { GrayscaleFilter } from 'pixi-filters'
import { TextStyle } from 'pixi.js'
import { useMemo } from 'react'
import { useAppSelector } from 'rewards/provider/redux/store'
import { Currency } from 'utils/constant'
import { GamePackageName } from '../config'
import { useItemsLayout } from './Util'

type WinMessageBoxProps = {
  note?: string
  balance: number
  boxWidth: number
  onClick: () => void
  disabled: boolean
}

const WinMessageBox = ({
  note,
  balance = 0,
  boxWidth,
  onClick,
  disabled,
}: WinMessageBoxProps) => {
  const currency = useAppSelector((state) => state.setting.currency)
  const balanceDisplay = useAnimatedAmount(balance, { tickPerSecond: 10000 })

  const containerWidth = boxWidth * 0.7
  const containerHeight = boxWidth * 0.7
  const graphicWidth = boxWidth + 20

  const contentPosition = useItemsLayout({
    width: containerWidth,
    height: containerWidth,
  })

  const filters = useMemo(() => {
    return disabled ? [new GrayscaleFilter()] : []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled])

  const textCongrats =
    currency === Currency.THB ? 'ยินดีด้วย!' : 'XIN CHÚC MỪNG!'
  const textWon =
    currency === Currency.THB
      ? 'คุณได้รับเงินรางวัลทั้งหมด'
      : 'BẠN ĐÃ TRÚNG THƯỞNG'
  const textNext = currency === Currency.THB ? 'เล่นต่อไป' : 'CHƠI TIẾP'

  return (
    <Container x={0} y={250}>
      <Graphics
        anchor={0.5}
        eventMode={'none'}
        x={-graphicWidth * 0.5}
        y={-10}
        draw={(g) => {
          g.clear()
          g.beginFill('#000000', 0.5)
          g.drawRoundedRect(0, 0, graphicWidth, graphicWidth, 24)
          g.endFill()
        }}
      />

      <Container y={containerHeight * 0.7} alpha={note ? 0 : 1}>
        {contentPosition.map((item, index) => {
          return (
            <Sprite
              key={index}
              anchor={0.5}
              scale={0.5}
              position={item.position}
              image={`${AssetBasePath}/assets/${GamePackageName}/images/coin.png`}
            />
          )
        })}
      </Container>
      <Text
        x={0}
        y={containerHeight * 0.3}
        text={textCongrats}
        anchor={[0.5, 0.5]}
        style={noteStyle}
      />
      <Text
        x={0}
        y={containerHeight * 0.5}
        text={textWon}
        anchor={[0.5, 0.5]}
        style={noteStyle}
      />
      <Text
        x={0}
        y={containerHeight * 0.8}
        text={balanceDisplay}
        anchor={[0.5, 0.5]}
        style={prizeStyle}
      />
      <Container
        y={containerHeight * 1.2}
        eventMode={disabled ? 'none' : 'static'}
        onpointertap={onClick}
        filters={filters}
      >
        <Graphics
          draw={(g) => {
            g.beginFill('#00A2A8')
            g.drawRoundedRect(-boxWidth * 0.25, -25, boxWidth * 0.5, 50, 100)
            g.endFill()
          }}
        />
        <Text
          x={0}
          y={0}
          text={textNext}
          anchor={[0.5, 0.5]}
          style={textStyle}
        />
      </Container>
    </Container>
  )
}

export const noteStyle = new TextStyle({
  fontFamily: 'AvertaStd Bold',
  fontSize: 20,
  wordWrap: true,
  wordWrapWidth: 280,
  align: 'center',
  fill: ['#ffffff'],
})

export const prizeStyle = new TextStyle({
  fontFamily: 'AvertaStd Bold',
  fontSize: 40,
  fill: ['#FAFA7F'],
})
export const textStyle = new TextStyle({
  fontFamily: 'AvertaStd Bold',
  fontSize: 20,
  fill: ['#ffffff'],
})
export default WinMessageBox
