import { Container, PixiRef, Sprite, Text } from '@pixi/react'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
import { TextStyle } from 'pixi.js'
import { useEffect, useRef } from 'react'
import { toThousandAbbreviation } from 'utils-pixi/helper'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { ISprite } from 'utils-pixi/type'
import { prizeDict } from './GameBody'
import { ItemLayout } from './Util'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const PrizeEgg = ({
  item,
  win,
  winImage,
}: {
  item: ItemLayout
  win: boolean
  winImage: string | undefined
}) => {
  const { width } = useWindowSize()

  const frameWidth = width >= 500 ? 0.65 : 0.51
  const eggWidth = width >= 500 ? 0.6 : 0.55

  const winRef = useRef<PixiRef<ISprite>>(null)

  /* Setup Timeline Animation */
  useEffect(() => {
    if (win && winImage) {
      gsap.to(winRef.current, {
        pixi: { alpha: 1 },
        duration: 0.3,
        repeat: 4,
        yoyo: true,
      })
    }
  }, [win])

  return (
    <Container>
      {winImage && (
        <Sprite
          ref={winRef}
          anchor={0.5}
          alpha={0}
          scale={frameWidth}
          position={item.position}
          image={winImage}
        />
      )}

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
