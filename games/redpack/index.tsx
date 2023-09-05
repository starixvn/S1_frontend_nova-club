'use client'

import Game from './components/Game'
import Stage from './components/Stage'

function RedPackGame() {
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

export default RedPackGame
