'use client'

import Game from './components/Game'
import Stage from './components/Stage'

function ScratchCardGame() {
  // useEffect(() => {
  //   sound.play('audio/bgm.mp3', { loop: true, volume: 0.3 })

  //   return () => {
  //     sound.stopAll()
  //   }
  // }, [])

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ display: 'block' }}
      options={{
        autoDensity: false,
        hello: true,
        resolution: 1,

        antialias: true,
      }}
    >
      <Game />
    </Stage>
  )
}

export default ScratchCardGame
