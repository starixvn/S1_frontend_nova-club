import { AssetBasePath } from '@games/config'
import { Sprite } from '@pixi/react'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'
import { GamePackageName } from '../config'

type Props = {}

export default function Background({}: Props) {
  const { width, height } = useWindowSize()

  return (
    <Sprite
      image={`${AssetBasePath}/assets/${GamePackageName}/images/bg.png`}
      width={width}
      height={height}
    />
  )
}
