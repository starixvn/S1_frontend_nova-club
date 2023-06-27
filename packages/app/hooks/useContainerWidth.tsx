import { useLayoutEffect, useRef, useState } from 'react'

export default function useContainerWidth(ref) {
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    // setWidth()
    ref.current.measure((x, y, width, height) => {
      setWidth(width)
    })
  }, [ref])

  return width
}
