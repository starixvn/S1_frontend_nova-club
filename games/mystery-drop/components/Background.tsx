import { AssetBasePath } from '@games/config'
import { Container, Sprite, TilingSprite, useApp, useTick } from '@pixi/react'
import { useMemo, useState } from 'react'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { GamePackageName } from '../config'

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

  const frameDimension = useMemo(() => {
    const ratio = 1328 / 768
    return {
      width: height / ratio,
      height: height,
    }
  }, [width])

  return (
    <Container x={width * 0.5} y={height * 0.5}>
      <Sprite
        image={`${AssetBasePath}/assets/${GamePackageName}/images/game-bg.png`}
        width={width}
        height={height}
        anchor={0.5}
      />
    </Container>
  )
}
