import { AssetBasePath } from '@games/config'
import { Container, Sprite, useApp, useTick } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { GamePackageName } from '../config'
import PrizeEgg from './PrizeEgg'
import { Prize, useItemsLayout } from './Util'
import { sound } from '@pixi/sound'

type PrizeBoxProps = {
  boxWidth: number
  result: Prize
  autoScratch: boolean
  onComplete: () => void
}

const PrizeBoxJs = ({
  boxWidth,
  result,
  autoScratch,
  onComplete,
}: PrizeBoxProps) => {
  const app = useApp()
  const boardRef = useRef(null)
  const { width } = useWindowSize()

  const [win, setWin] = useState(false)
  const [autoPositionX, setAutoPositionX] = useState(width) // clear mask from left

  // avoid using state to prevent redrawing
  let isScratching = false

  // prepare circle texture, that will be our brush
  const brush = new PIXI.Graphics().beginFill(0xffffff).drawCircle(0, 0, 35)

  const removeMask = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawRect(0, 0, boxWidth * 2, boxWidth * 2)
  const autoScratchremoveMask = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawRect(autoPositionX, 0, boxWidth, boxWidth * 2)

  const renderTexture = useMemo(
    () =>
      PIXI.RenderTexture.create({
        width: boxWidth * 2,
        height: boxWidth * 2,
      }),
    []
  )

  const renderTextureSprite = new PIXI.Sprite(renderTexture)

  useTick((delta) => {
    // When square haven't fully cover mask
    if (autoScratch && !win) {
      autoPositionX > 0 ? setAutoPositionX(autoPositionX - 5) : handleWinGame()

      app.renderer.render(autoScratchremoveMask, {
        renderTexture: renderTexture,
        clear: false,
      })
    }
  })

  useEffect(() => {
    autoScratch && sound.play('audio/scratch.mp3', { loop: true })
  }, [autoScratch])

  const checkPercentage = () => {
    const imageData = app.renderer.extract.pixels(renderTexture)
    const totalPixels = imageData.length / 4 // Each pixel has 4 values (RGBA)

    let visiblePixels = 0

    for (let i = 0; i < imageData.length; i += 4) {
      if (imageData[i + 3] > 0) {
        visiblePixels++
      }
    }

    const percentageRevealed = (visiblePixels / totalPixels) * 100

    if (percentageRevealed > 20) handleClearMask()
  }

  const handleClearMask = () => {
    app.renderer.render(removeMask, {
      renderTexture: renderTexture,
      clear: false,
    })

    handleWinGame()
  }
  const handleWinGame = () => {
    sound.stop('audio/scratch.mp3')
    sound.play('audio/win.mp3')
    setWin(true)
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  const pointerMove = (e) => {
    if (isScratching) {
      brush.position.copyFrom(e.global)
      app.renderer.render(brush, {
        renderTexture: renderTexture,
        clear: false,
        skipUpdateTransform: false,
      })

      checkPercentage()
    }
  }

  const pointerDown = (e) => {
    isScratching = true
    pointerMove(e)
    sound.play('audio/scratch.mp3', { loop: true })
  }

  const pointerUp = () => {
    isScratching = false
    sound.stop('audio/scratch.mp3')
    // app.renderer.render(brush, renderTexture, false, null, true);
  }

  const contentPosition = useItemsLayout({
    width: boxWidth - 10,
    height: boxWidth - 10,
    result,
  })

  return (
    <Container>
      <Sprite
        image={`${AssetBasePath}/assets/${GamePackageName}/images/scratch.png`}
        width={boxWidth}
        height={boxWidth}
        anchor={0.5}
      />

      <Container
        mask={renderTextureSprite}
        eventMode="static"
        pointermove={pointerMove}
        pointerdown={pointerDown}
        pointerup={pointerUp}
      >
        <Sprite
          ref={boardRef}
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
    </Container>
  )
}

export default PrizeBoxJs
