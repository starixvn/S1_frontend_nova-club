import useAnimatedAmount from '@games/shared/hooks/useAnimatedAmount'
import { Container, Graphics, Text } from '@pixi/react'
import { ITextStyle, TextStyle } from 'pixi.js'
import { ComponentProps, useMemo, useState } from 'react'
import { IContainer } from 'utils-pixi/type'

type ActionBoxProps = {
  balance?: number
  totalBalance: number
  boxWidth: number
  onPress: () => void
  gameStarted: boolean
} & ComponentProps<IContainer>

const ActionBox = ({
  balance = 0,
  totalBalance = 0,
  boxWidth,
  gameStarted,
  onPress,
  ...rest
}: ActionBoxProps) => {
  const [isFirstStart, setIsFirstStart] = useState(true)
  const balanceDisplay = useAnimatedAmount(totalBalance, {
    tickPerSecond: 10000,
  })
  const disabled = balance < 2

  const handleClick = () => {
    setIsFirstStart(false)
    onPress()
  }

  const fontStyles = useMemo(() => {
    const defaultStyle: Partial<ITextStyle> = {
      fontFamily: 'AvertaStd Bold',
      fontWeight: 'bold',
      align: 'center',
      fontSize: boxWidth * 0.041,
    }

    return [
      new TextStyle({ ...defaultStyle, fill: '#fff' }),
      new TextStyle({ ...defaultStyle, fill: '#5DC758' }),
    ]
  }, [boxWidth])

  const buttonWidth = boxWidth * 0.46
  const buttonHeight = boxWidth * 0.14

  return (
    <Container {...rest}>
      <Container width={buttonWidth} height={buttonHeight} x={-boxWidth * 0.25}>
        <Graphics
          key={boxWidth + 'left'}
          anchor={0.5}
          draw={(g) => {
            g.lineStyle(5, 0xffffff, 1)
            g.drawRoundedRect(
              -buttonWidth * 0.5,
              -buttonHeight * 0.5,
              buttonWidth,
              buttonHeight,
              100
            )
            g.endFill()
          }}
        />
        <Text
          anchor={0.5}
          text={`TỔNG TIỀN THẮNG\n${balanceDisplay}`}
          style={fontStyles[0]}
        />
      </Container>
      <Container
        anchor={1}
        x={boxWidth * 0.25}
        onpointertap={handleClick}
        eventMode={disabled ? 'none' : 'static'}
      >
        <Graphics
          key={boxWidth + 'right'}
          draw={(g) => {
            g.beginFill(disabled ? '#CCC' : '#FFFFFF', 1)
            g.drawRoundedRect(
              -buttonWidth * 0.5,
              -buttonHeight * 0.5,
              buttonWidth,
              buttonHeight,
              100
            )
            g.endFill()
          }}
        />
        <Text
          text={
            isFirstStart ? 'BẮT ĐẦU' : gameStarted ? 'TỰ ĐỘNG CÀO' : 'CHƠI TIẾP'
          }
          anchor={0.5}
          style={fontStyles[1]}
        />
      </Container>
    </Container>
  )
}

export default ActionBox
