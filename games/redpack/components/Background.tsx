import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { Sprite, useApp } from '@pixi/react'
import { AssetBasePath } from '@games/config'
import { GamePackageName } from '../config'


import Game from '@games/redpack/components/Game'
type Props = {}

export default function Background({}: Props) {
  const app = useApp()
  const { width, height } = useWindowSize()

  const bgWidth = width
  const bgHeight = Math.max(bgWidth / (668 / 1200), height)

  return (
    <Sprite
      image={`${AssetBasePath}/assets/${GamePackageName}/images/bg.jpg`}
      width={width}
      height={height}
    />
  )
}
