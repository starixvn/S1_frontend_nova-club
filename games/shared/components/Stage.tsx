import { Stage as PixiStage } from '@pixi/react'
import { ReactReduxContext } from 'react-redux'
import ContextBridge from 'utils-pixi/components/ContextBridge'
import ResizeProvider from 'utils-pixi/resize/ResizeProvider'

const Stage = ({ children, ...props }) => {
  return (
    <ContextBridge
      Context={ReactReduxContext}
      render={(children) => (
        <PixiStage {...props}>
          <ResizeProvider>{children}</ResizeProvider>
        </PixiStage>
      )}
    >
      {children}
    </ContextBridge>
  )
}

export default Stage
