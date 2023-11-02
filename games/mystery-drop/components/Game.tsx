'use client'

import Background from './Background'
import GameBody from './GameBody'

type Props = {}

export default function Game({}: Props) {
  return (
    <>
      <Background />
      <GameBody />
    </>
  )
}
