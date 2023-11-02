import { Stage as PixiStage } from '@pixi/react'
import { ReactReduxContext } from 'react-redux'
import ContextBridge from 'utils-pixi/components/ContextBridge'
import ResizeProvider from 'utils-pixi/resize/ResizeProvider'
import { GameProvider } from '../context/GameContext'

const Stage = ({ children, ...props }) => {
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
