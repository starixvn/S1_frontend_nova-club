import { Stage as PixiStage } from '@pixi/react'
import { ReactReduxContext } from 'react-redux'
import ContextBridge from 'utils-pixi/components/ContextBridge'
import ResizeProvider from 'utils-pixi/resize/ResizeProvider'
import { GameProvider } from '../context/GameContext'
import { useEffect } from 'react'
import { sound } from '@pixi/sound'

const Stage = ({ children, ...props }) => {
  useEffect(() => {
    sound.play('audio/bgm.mp3', { loop: true, volume: 0.3 })

    return () => {
      sound.stopAll()
    }
  }, [])

  return (
    <ContextBridge
      Context={ReactReduxContext}
      render={(children) => (
        <PixiStage {...props}>
          <GameProvider>
            <ResizeProvider>{children}</ResizeProvider>
          </GameProvider>
        </PixiStage>
      )}
    >
      {children}
    </ContextBridge>
  )
}

export default Stage
