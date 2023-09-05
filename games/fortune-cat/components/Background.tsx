import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { Sprite, TilingSprite, useApp, useTick } from '@pixi/react'
import { AssetBasePath } from '@games/config'
import { AssetPath, GamePackageName } from '../config'
import { useState } from 'react'

type Props = {}

const amplitude = 5 // The maximum distance the hotAirBalloon will move up and down
const period = 2000 // The time it takes for the hotAirBalloon to complete one full up-and-down cycle (in milliseconds)

export default function Background({}: Props) {
  const app = useApp()
  const waveSpeed = 1
  const [rotation, setRotation] = useState(0)
  const [waveX, setWaveX] = useState(0)
  const { width, height } = useWindowSize()
  const [cloudX, setCloudX] = useState({ x: 100 ?? 0, y: 100 })
  const [cloud2X, setCloud2X] = useState({ x: width ?? 0, y: 100 })

  const bgWidth = width
  const bgHeight = Math.max(bgWidth / (668 / 1200), height)

  useTick((delta) => {
    // Update wave position / Movement speed
    const cloudHover = amplitude * Math.sin((2 * Math.PI * Date.now()) / period)
    setWaveX(waveX + 1)
    setCloudX({
      x: cloudX.x > width + 200 ? 0 : cloudX.x + 0.5,
      y: cloudHover + 150,
    })
    setCloud2X({
      x: cloud2X.x > width + 200 ? 0 : cloud2X.x + 0.5,
      y: cloudHover + 120,
    })

    delta && setRotation(rotation + 0.003 * delta)
  })

  return (
    <>
      <Sprite
        image={`${AssetBasePath}/assets/${GamePackageName}/images/tree.png`}
        anchor={{ x: 0.5, y: 1 }}
        scale={{ x: 0.5, y: 0.5 }}
        x={bgWidth / 2}
        y={height}
      />

      <Sprite
        anchor={0.5}
        scale={0.5}
        image={`${AssetBasePath}/assets/${GamePackageName}/images/sun.png`}
        rotation={rotation}
        x={100}
        y={100}
      />

      <Sprite
        anchor={{ x: 1, y: 0.5 }}
        scale={0.5}
        image={`${AssetBasePath}/assets/${GamePackageName}/images/cloud1.png`}
        position={{ x: cloudX.x, y: cloudX.y }}
      />
      <Sprite
        anchor={{ x: 1, y: 0.5 }}
        scale={0.5}
        image={`${AssetBasePath}/assets/${GamePackageName}/images/cloud2.png`}
        position={{ x: cloud2X.x, y: cloud2X.y }}
      />

      <TilingSprite
        image={`${AssetBasePath}/assets/${GamePackageName}/images/wave3.png`}
        width={width}
        tilePosition={{ x: waveX / 6, y: 0 }}
        anchor={{ x: 0, y: 1 }}
        tileScale={{ x: 0.5, y: 0.5 }}
        y={height}
      />
      <TilingSprite
        image={`${AssetBasePath}/assets/${GamePackageName}/images/wave3.png`}
        width={width + 200}
        tilePosition={{ x: -waveX / 5, y: 0 }}
        anchor={{ x: 0, y: 1 }}
        tileScale={{ x: 0.5, y: 0.5 }}
        y={height + 25}
        x={-50}
        tint={0x5df9ff}
      />
      <TilingSprite
        image={`${AssetBasePath}/assets/${GamePackageName}/images/wave3.png`}
        width={width + 200}
        tilePosition={{ x: waveX / 4, y: 0 }}
        anchor={{ x: 0, y: 1 }}
        tileScale={{ x: 0.5, y: 0.5 }}
        y={height + 50}
        x={-80}
        tint={0x46c9d0}
      />
    </>
  )
}
