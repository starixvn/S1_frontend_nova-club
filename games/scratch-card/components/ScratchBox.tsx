import { AssetBasePath } from '@games/config'
import { Container, Graphics, Sprite } from '@pixi/react'
import { useRef, useState } from 'react'
import { GamePackageName } from '../config'
import { Graphics as Graph } from 'pixi.js'

const ScratchBox = ({ boxWidth, mask, setMask }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  console.log('🚀 ~ ScratchBox ~ mask:', mask)

  // Create graphics for masking
  // const graphics = new Graphics()
  // graphics.beginFill(0)
  // graphics.drawRect(0, 0, boxWidth, boxWidth)
  // graphics.endFill()

  // Handle mouse/touch events for scratching
  const startDrawing = (event) => {
    console.log('🚀 ~ startDrawing ~ event:', event)
    setIsDrawing(true)

    const x = event.data.x
    const y = event.data.y

    mask?.lineStyle(40, 0xffffff) // Adjust the scratch line style
    // mask?.moveTo(x, y)
    mask.moveTo(-50, -50)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const scratch = (event) => {
    if (!isDrawing) return

    const x = event.data.x
    const y = event.data.y

    maks.lineTo(150, 150)
    // mask?.lineTo(x, y)
    mask?.endFill()
  }
  return (
    <Container>
      <Sprite
        image={`${AssetBasePath}/assets/${GamePackageName}/images/scratch.png`}
        anchor={{ x: 0.5, y: 0.5 }}
        scale={{ x: 0.5, y: 0.5 }}
        width={boxWidth}
        height={boxWidth}
        eventMode="static"
        onpointerdown={startDrawing}
        onpointerup={stopDrawing}
        onpointermove={scratch}
        // mask={mask}
      />
      <Graphics
        draw={(g) => {
          g.beginFill(0xff3300)
          // g.drawRect(-boxWidth / 2, -boxWidth / 2, boxWidth, boxWidth)
          g.endFill()
          g.lineStyle(40, 0xffffff)
          g.moveTo(0, 0)
          g.lineTo(0, 150)

          setMask(g)
        }}
        // ref={(ref) => setMask(ref)}
      />
    </Container>
  )
}

export default ScratchBox
