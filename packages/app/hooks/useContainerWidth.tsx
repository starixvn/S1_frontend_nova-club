import { RefObject, useLayoutEffect, useState } from 'react'
import { View } from 'react-native'

export default function useContainerWidth(ref: RefObject<View>) {
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    this.requestAnimationFrame(() => {
      if (ref.current)
        ref.current.measure((ox, oy, width, height, px, py) => {
          setWidth(width)
        })
    })
  }, [ref])

  return width
}
