import useAnimatedAmount from '@games/shared/hooks/useAnimatedAmount'
import { Container, Graphics, Text } from '@pixi/react'
import { TextStyle } from 'pixi.js'
import { ComponentProps, useState } from 'react'
import { IContainer } from 'utils-pixi/type'

type ActionBoxProps = {
  balance?: number
  totalBalance: number
  boxWidth: number
  onPress: () => void
  startGame: boolean
} & ComponentProps<IContainer>

const ActionBox = ({
  balance = 0,
  totalBalance = 0,
  boxWidth,
  y,
  startGame,
  onPress,
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

  return (
    <Container>
      <Container x={0} y={y} anchor={[0.5, 0.5]}>
        <Graphics
          draw={(g) => {
            g.lineStyle(5, 0xffffff, 1)
            g.drawRoundedRect(boxWidth * -0.6, -35, boxWidth / 1.75, 70, 100)
            g.endFill()
          }}
        />
        <Text
          x={boxWidth * -0.3}
          y={-15}
          text="TOTAL WON"
          anchor={[0.5, 0.5]}
          style={textStyle}
        />
        <Text
          x={boxWidth * -0.3}
          y={15}
          text={balanceDisplay}
          anchor={[0.5, 0.5]}
          style={textStyle}
        />
      </Container>

      <Container
        y={y}
        x={10}
        onpointertap={handleClick}
        eventMode={disabled ? 'none' : 'static'}
      >
        <Graphics
          draw={(g) => {
            g.beginFill(disabled ? '#CCC' : '#FFFFFF', 1)
            g.drawRoundedRect(0, -35, boxWidth / 1.75, 70, 100)
            g.endFill()
          }}
        />
        <Text
          x={(boxWidth / 1.75) * 0.5}
          text={isFirstStart ? 'START' : startGame ? 'SCRATCH' : 'PLAY NEXT'}
          anchor={[0.5, 0.5]}
          style={textStyle2}
        />
      </Container>
    </Container>
  )
}

export const textStyle = new TextStyle({
  fontFamily: 'AvertaStd Bold',
  fontSize: 22,
  fontWeight: 'bold',
  fill: ['#ffffff'],
})
export const textStyle2 = new TextStyle({
  fontFamily: 'AvertaStd Bold',
  fontSize: 22,
  fontWeight: 'bold',
  fill: ['#5DC758'],
})

export default ActionBox
