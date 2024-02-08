import { AssetBasePath } from '@games/config'
import { Container, Graphics, Sprite, useTick } from '@pixi/react'
import { sound } from '@pixi/sound'
import { Graphics as PixiGraphics } from 'pixi.js'
import { useEffect, useRef, useState } from 'react'
import { GamePackageName } from '../config'
import PrizeEgg from './PrizeEgg'
import { Prize, useItemsLayout } from './Util'

type PrizeBoxProps = {
  boxWidth: number
  result: Prize
  autoScratch: boolean
  onComplete: () => void
}

const PrizeBox = ({
  boxWidth,
  result,
  autoScratch,
  onComplete,
}: PrizeBoxProps) => {
  const mask = useRef<PixiGraphics>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })
  const [goToPosition, setGoToPosition] = useState({ x: 0, y: 0 })
  const [autoPositionY, setAutoPositionY] = useState(boxWidth - 100)
  const [win, setWin] = useState(false)

  // Create graphics for masking
  // const graphics = new Graphics()
  // graphics.beginFill(0)
  // graphics.drawRect(0, 0, boxWidth, boxWidth)
  // graphics.endFill()

  useTick((delta) => {
    // When square haven't fully cover mask
    autoScratch &&
      autoPositionY > -boxWidth &&
      setAutoPositionY(autoPositionY - 5)
  })

  useEffect(() => {
    console.log('autoScatch', autoScratch)
    if (autoScratch) {
      mask?.current?.beginFill(0)
      mask?.current?.drawRect(-boxWidth / 2, autoPositionY, boxWidth, boxWidth)
      mask?.current?.endFill()
    }

    // Square fully uncover mask
    autoScratch && autoPositionY <= -(boxWidth - 100) && handleWin()
  }, [autoScratch, autoPositionY])

  // Handle mouse/touch events for scratching
  const startDrawing = (event) => {
    const { x, y } = event.screen

    !isDrawing && setGoToPosition({ x, y })
    setIsDrawing(true)

    mask?.current?.lineStyle(40, 0xffffff) // Adjust the scratch line style
    mask?.current?.moveTo(x - 200, y - 200)
    // mask?.current?.moveTo(-50, -50)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const scratch = (event) => {
    console.log('🚀 ~ scratch ~ event:', event)
    if (!isDrawing) return

    const { x, y } = event.screen

    setGoToPosition({ x: x - 30, y: y - 30 })

    mask?.current?.lineTo(x - 200, y - 200)
    mask?.current?.endFill()
  }

  const contentPosition = useItemsLayout({
    width: boxWidth - 10,
    height: boxWidth - 10,
    result,
  })

  const handleWin = () => {
    setWin(true)
  }

  useEffect(() => {
    if (win) {
      sound.play('audio/winning.mp3')

      setTimeout(() => {
        setWin(false)
        onComplete()
      }, 2000)
    }
  }, [win])

  return (
    <Container
      eventMode="static"
      onpointerdown={startDrawing}
      onpointerup={stopDrawing}
      onpointermove={scratch}
    >
      <Sprite
        image={`${AssetBasePath}/assets/${GamePackageName}/images/scratch.png`}
        anchor={{ x: 0.5, y: 0.5 }}
        scale={{ x: 0.5, y: 0.5 }}
        width={boxWidth}
        height={boxWidth}
      />
      <Container mask={mask.current}>
        <Sprite
          image={`${AssetBasePath}/assets/${GamePackageName}/images/board.png`}
          anchor={{ x: 0.5, y: 0.5 }}
          scale={{ x: 0.5, y: 0.5 }}
          width={boxWidth}
          height={boxWidth}
        />
        {contentPosition.map((item, index) => (
          <PrizeEgg
            key={index}
            item={item}
            win={win}
            winImage={
              result === item.prize
                ? `${AssetBasePath}/assets/${GamePackageName}/images/win-frame.png`
                : undefined
            }
          />
        ))}
      </Container>

      <Graphics
        // preventRedraw={true}
        draw={(g) => {
          g.beginFill(0)
          g.lineStyle(40, 0xffffff)
          g.endFill()
        }}
        ref={mask}
      />
    </Container>
  )
}
export default PrizeBox
