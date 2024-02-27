import { AssetBasePath } from '@games/config'
import { Container, PixiRef, Sprite, useApp, useTick } from '@pixi/react'
import { IMediaInstance, sound } from '@pixi/sound'
import * as PIXI from 'pixi.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { GamePackageName } from '../config'
import PrizeEgg from './PrizeEgg'
import { Prize, useItemsLayout } from './Util'

type PrizeBoxProps = {
  boxWidth: number
  result: Prize
  autoScratch: boolean
  onComplete: () => void
}

const BRUSH_SIZE = 35

const PrizeBoxJs = ({
  boxWidth,
  result,
  autoScratch,
  onComplete,
}: PrizeBoxProps) => {
  const app = useApp()
  const boardRef = useRef(null)
  const scratchPlayingInstance = useRef<IMediaInstance>()
  const maskRef = useRef<PixiRef<typeof Sprite>>(null)
  const containerRef = useRef<PixiRef<typeof Container>>(null)
  const { width } = useWindowSize()

  const [win, setWin] = useState(false)
  const [autoPositionX, setAutoPositionX] = useState(width) // clear mask from left

  // prepare circle texture, that will be our brush
  const brush = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawCircle(0, 0, BRUSH_SIZE)

  const removeMask = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawRect(0, 0, boxWidth, boxWidth)
  const autoScratchremoveMask = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawRect(autoPositionX, 0, boxWidth, boxWidth)

  const renderTexture = useMemo(
    () =>
      PIXI.RenderTexture.create({
        width: boxWidth,
        height: boxWidth,
      }),
    []
  )

  useTick((delta) => {
    // When square haven't fully cover mask
    if (autoScratch && !win) {
      autoPositionX > 0 ? setAutoPositionX(autoPositionX - 10) : handleWinGame()

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
    if (percentageRevealed >= 90) handleClearMask()
  }

  const handleClearMask = () => {
    app.renderer.render(removeMask, {
      renderTexture: renderTexture,
      clear: false,
    })

    handleWinGame()
  }

  const handleWinGame = () => {
    scratchPlayingInstance.current?.destroy()
    scratchPlayingInstance.current = undefined

    sound.play('audio/win.mp3')
    setWin(true)
    setTimeout(
      () => {
        onComplete()
      },
      result === 0 ? 0 : 2000
    )
  }

  const pointerMove = async (e) => {
    if (!win && containerRef.current) {
      const point = containerRef.current?.toLocal(e.global)
      const offset = boxWidth * 0.5
      point.x += offset
      point.y += offset

      brush.position.copyFrom(point)
      app.renderer.render(brush, {
        renderTexture: renderTexture,
        clear: false,
        skipUpdateTransform: false,
      })

      if (
        !scratchPlayingInstance.current ||
        scratchPlayingInstance.current.progress >= 1
      )
        scratchPlayingInstance.current = await sound.play('audio/scratch.mp3', {
          volume: 5,
        })

      checkPercentage()
    }
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

      <Sprite
        ref={maskRef}
        width={boxWidth}
        height={boxWidth}
        anchor={0.5}
        texture={renderTexture}
      />

      <Container
        mask={maskRef.current}
        ref={containerRef}
        height={boxWidth}
        width={boxWidth}
        anchor={0.5}
        eventMode="static"
        pointermove={pointerMove}
      >
        <Sprite
          ref={boardRef}
          image={`${AssetBasePath}/assets/${GamePackageName}/images/board.png`}
          anchor={{ x: 0.5, y: 0.5 }}
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
