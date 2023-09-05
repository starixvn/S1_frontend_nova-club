'use client'

import React, { useEffect } from 'react'
import Background from './Background'
import SpinWinBody from './SpinWinBody'
import { initAssets, useInitAssets } from 'utils-pixi/assets'
import Stage from '@games/shared/components/Stage'
import { sound } from '@pixi/sound'

type Props = {}

export default function SpinWinGame({}: Props) {
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
        backgroundColor: 0xffffff,
        antialias: true,
      }}
    >
      <Background />
      <SpinWinBody />
    </Stage>
  )
}
