import { AssetBasePath } from '@games/config'
import { Container, Sprite, Text } from '@pixi/react'
import { TextStyle } from 'pixi.js'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { GamePackageName } from '../config'
import GameBox from './GameBox'

const GameBody = () => {
  const { width, height } = useWindowSize()

  return (
    <Container x={width * 0.5} y={height * 0.125}>
      <Container>
        <Sprite
          anchor={{ x: 0.5, y: 0 }}
          scale={0.7}
          image={`${AssetBasePath}/assets/${GamePackageName}/images/game-header.png`}
        />

        <Text
          x={0}
          y={75}
          text={`Ghép 3 để thắng`}
          anchor={[0.5, 0.5]}
          style={textStyle}
        />
      </Container>
      <Container y={90}>
        <GameBox />
      </Container>
    </Container>
  )
}

export const textStyle = new TextStyle({
  fontFamily: 'AvertaStd Bold',
  fontSize: 24,
  fill: ['#FFEFC3'],
})

export default GameBody
