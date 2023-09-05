'use client'

import { sound } from '@pixi/sound'
import { useEffect } from 'react'
import Background from './Background'
import Scroll from './Scroll'

type Props = {}

export default function RedPackGame({}: Props) {
  useEffect(() => {
    sound.play('audio/bgm.mp3', { loop: true, volume: 0.3 })

    return () => {
      sound.stopAll()
    }
  }, [])

  return (
    <>
      <Background />
      <Scroll />
    </>
  )
}
