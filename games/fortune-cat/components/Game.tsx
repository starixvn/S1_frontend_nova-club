'use client'

import { sound } from '@pixi/sound'
import { useEffect } from 'react'
import Background from './Background'
import MeowBody from './MeowBody'

type Props = {}

export default function Game({}: Props) {
  return (
    <>
      <Background />
      <MeowBody />
    </>
  )
}
