import {
  addOrientationChangeListener,
  getOrientationAsync,
  Orientation,
  removeOrientationChangeListener,
  unlockAsync as unlockAsyncESO,
} from 'expo-screen-orientation'
import { useEffect, useState } from 'react'

export const unlockAsync = unlockAsyncESO

export default function useOrientation() {
  const [currentOrientation, setCurrentOrientation] = useState<Orientation>()

  useEffect(() => {
    async function getCurrent() {
      const orientation = await getOrientationAsync()
      setCurrentOrientation(orientation)
    }

    getCurrent()

    const subs = addOrientationChangeListener((s) => {
      setCurrentOrientation(s.orientationInfo.orientation)
    })

    return () => removeOrientationChangeListener(subs)
  }, [])

  const isLandscape =
    currentOrientation === Orientation.LANDSCAPE_LEFT ||
    currentOrientation === Orientation.LANDSCAPE_RIGHT

  return { orientation: currentOrientation, isLandscape }
}
