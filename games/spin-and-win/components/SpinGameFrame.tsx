import '@pixi/events'
import { Sprite } from '@pixi/react'
import { ISize } from 'pixi.js'
import { useEffect, useState } from 'react'
const gameFrameImage = ['game-frame-light', 'game-frame-light-2']

const SpinGameFrame = ({ size }: { size: ISize }) => {
  const [gameFrameIndex, setGameFrameIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGameFrameIndex((prevIndex) => (prevIndex + 1) % 2)
    }, 100)
    return () => {
      clearInterval(intervalId)
    }
  }, [])
  
  return (
    <Sprite
      image={`./assets/spin-and-win/images/${gameFrameImage[gameFrameIndex]}.png`}
      width={size.width}
      height={size.height}
      anchor={0.5}
    />
  )
}

export default SpinGameFrame
