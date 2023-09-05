import { useApp } from '@pixi/react'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type Props = { children: ReactNode }

const minWidth = 375
const minHeight = 700

const maxWidth = 650
const maxHeight = 800

const ResizeContext = createContext({
  width: 0,
  height: 0,
})

export default function ResizeProvider({ children }: Props) {
  const app = useApp()

  function getSize() {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const rangedWidth = Math.min(Math.max(windowWidth, minWidth), maxWidth)
    const rangedHeight = Math.min(Math.max(windowWidth, minHeight), maxHeight)
    // Calculate renderer and canvas sizes based on current dimensions
    const scaleX = rangedWidth / windowWidth
    const scaleY = rangedHeight / windowHeight
    const scale = scaleX > scaleY ? scaleX : scaleY
    const width = windowWidth * scale
    const height = windowHeight * scale

    return { width, height }
  }

  const [dimension, setDimension] = useState(getSize())

  function resize() {
    const { width, height } = getSize()
    // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
    //   app.view.style.width = `${windowWidth}px`;
    //   app.view.style.height = `${windowHeight}px`;
    app.renderer.view.style.width = `${window.innerWidth}px`
    app.renderer.view.style.height = `${window.innerHeight}px`
    window.scrollTo(0, 0)

    // Update renderer  and navigation screens dimensions
    app.renderer.resize(width, height)
    setDimension({ width, height })
    app.renderer.render(app.stage)
  }

  useEffect(() => {
    resize()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <ResizeContext.Provider value={dimension}>
      {children}
    </ResizeContext.Provider>
  )
}

export const useWindowSize = () => {
  return useContext(ResizeContext)
}
