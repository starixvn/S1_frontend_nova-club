import { AssetBasePath } from '@games/config'
import { Container, Sprite, Text } from '@pixi/react'
import { TextStyle } from 'pixi.js'
import { toThousandAbbreviation } from 'utils-pixi/helper'
import { GamePackageName } from '../config'
import { prizeDict } from './GameBody'
import { ItemLayout } from './Util'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'

const PrizeEgg = ({ item }: { item: ItemLayout }) => {
  const { width } = useWindowSize()

  const frameWidth = width >= 500 ? 0.65 : 0.51
  const eggWidth = width >= 500 ? 0.6 : 0.55

  return (
    <Container>
      <Sprite
        anchor={0.5}
        scale={frameWidth}
        position={item.position}
        image={`${AssetBasePath}/assets/${GamePackageName}/images/win-frame.png`}
      />
      <Sprite
        anchor={0.5}
        scale={eggWidth}
        position={item.position}
        image={prizeDict[item.prize]}
      />
      <Text
        position={item.position}
        text={toThousandAbbreviation(item.prize)}
        anchor={[0.5, 0.5]}
        style={
          item.prize === 200000 || item.prize === 500000 ? redText : whiteText
        }
      />
    </Container>
  )
}

export const whiteText = new TextStyle({
  fontFamily: 'AvertaStd Bold',
  fontSize: 22,
  fontWeight: 'bold',
  fill: ['#ffffff'],
})
export const redText = new TextStyle({
  fontFamily: 'AvertaStd Bold',
  fontSize: 22,
  fontWeight: 'bold',
  fill: ['#A20000'],
})
export default PrizeEgg
