import { useLayoutEffect, useState } from 'react'

export default function useContainerWidth(ref: React.RefObject<HTMLElement>) {
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const updateSize = () => {
      if (!ref.current) {
        return
      }

      setWidth(ref.current.clientWidth)
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [ref.current?.clientWidth])

  return width
}
