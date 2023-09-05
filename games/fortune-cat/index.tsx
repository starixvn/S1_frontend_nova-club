'use client'

import { useEffect } from 'react'
import Game from './components/Game'
import Stage from './components/Stage'
import { sound } from '@pixi/sound'

function FortuneCatGame() {
  useEffect(() => {
    sound.play('audio/bgm.mp3', { loop: true, volume: 0.3 })

    return () => {
      sound.stopAll()
    }
  }, [])

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ display: 'block' }}
      options={{
        autoDensity: false,
        hello: true,
        resolution: 1,
        backgroundColor: 0x81c0ff,
        antialias: true,
      }}
    >
      <Game />
    </Stage>
  )
}

export default FortuneCatGame
