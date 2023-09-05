'use client'

import { useEffect } from 'react'
import Game from './components/Game'
import Stage from '@games/shared/components/Stage'
import { initAssets } from 'utils-pixi/assets'
import { GamePackageName } from './config'

function GoldenCat() {
  useEffect(() => {
    initAssets(GamePackageName)
  })
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ display: 'block' }}
      options={{
        autoDensity: false,
        hello: true,
        resolution: 1,
        backgroundColor: 0xfff,
        antialias: true,
      }}
    >
      <Game />
    </Stage>
  )
}

export default GoldenCat
