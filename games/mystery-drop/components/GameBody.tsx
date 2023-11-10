import { AssetBasePath } from '@games/config'
import { Container, Sprite, Text } from '@pixi/react'
import { GamePackageName } from '../config'
import GameBox from './GameBox'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { TextStyle } from 'pixi.js'
import NiceModal from '@ebay/nice-modal-react'
import WinModal from './WinModal'

const GameBody = () => {
  const { width, height } = useWindowSize()

  const handleWin = (result) => {
    console.log('click modal')
    NiceModal.show(WinModal, {
      winPrize: result as number,
      onClose: () => console.log('close'),
    })
  }

  return (
    <Container x={width * 0.5} y={height * 0.2}>
      <Container eventMode="static" onpointertap={() => handleWin(2000)}>
        <Sprite
          anchor={{ x: 0.5, y: 0 }}
          scale={0.7}
          image={`${AssetBasePath}/assets/${GamePackageName}/images/game-header.png`}
        />

        <Text
          x={0}
          y={70}
          text={`Match 3 to win`}
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
