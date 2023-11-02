import { AssetBasePath } from '@games/config'
import { Container, Sprite } from '@pixi/react'
import React, { useEffect, useState } from 'react'
import { GamePackageName } from '../config'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { useItemsLayout } from './Util'
import FlipCard from './FlipCard'

export const possibleResult = [1, 2, 3, 4]

export const potDict = {
  1: `${AssetBasePath}/assets/${GamePackageName}/images/pot-blue.png`,
  2: `${AssetBasePath}/assets/${GamePackageName}/images/pot-green.png`,
  3: `${AssetBasePath}/assets/${GamePackageName}/images/pot-red.png`,
  4: `${AssetBasePath}/assets/${GamePackageName}/images/pot-purple.png`,
}
export const prizeDict = {
  1: `${AssetBasePath}/assets/${GamePackageName}/images/pot-highlight.png`,
  2: `${AssetBasePath}/assets/${GamePackageName}/images/pot-highlight.png`,
  3: `${AssetBasePath}/assets/${GamePackageName}/images/pot-highlight.png`,
  4: `${AssetBasePath}/assets/${GamePackageName}/images/pot-highlight.png`,
}

const GameBox = () => {
  const { width, height } = useWindowSize()
  const containerWidth = width
  const containerHeight = height * 0.5

  const bgWidth = Math.min(500, width)
  const boxWidth = bgWidth >= 500 ? bgWidth * 0.8 : bgWidth * 0.9
  const [prizePress, setPrizePress] = useState(0)
  const result = 1

  const contentPosition = useItemsLayout({
    width: boxWidth * 0.6,
    height: boxWidth * 0.6,
    result,
  })

  const handleClick = (prizeAmount: number) => {
    result === prizeAmount && setPrizePress(prizePress + 1)
    // sound.play('audio/click.mp3')
  }

  useEffect(() => {
    // if (prizePress === 3) {
    //   sound.play('audio/win.mp3')
    //   setTimeout(() => {
    //     setPrizePress(0)
    //     onComplete()
    //   }, 2000)
    // }
  }, [prizePress])

  return (
    <Container>
      <Sprite
        anchor={{ x: 0.5, y: 0 }}
        image={`${AssetBasePath}/assets/${GamePackageName}/images/game-body.png`}
        width={boxWidth}
        height={boxWidth}
      />

      <Container position={[0, boxWidth / 2]}>
        {contentPosition.map((item, index) => {
          const prize = item.prize

          return (
            <FlipCard
              key={index}
              position={item.position}
              disabled={prizePress === 3}
              image={potDict[prize]}
              winImage={result === prize ? prizeDict[prize] : undefined}
              onComplete={() => handleClick(prize)}
              win={result === prize && prizePress === 3}
            />
          )
        })}
      </Container>
    </Container>
  )
}

export default GameBox
