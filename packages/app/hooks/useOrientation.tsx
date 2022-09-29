import { useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'

export default function useOrientation() {
  const [currentOrientation, setCurrentOrientation] =
    useState<ScreenOrientation.Orientation>()

  useEffect(() => {
    async function getCurrent() {
      const orientation = await ScreenOrientation.getOrientationAsync()
      setCurrentOrientation(orientation)
    }

    getCurrent()

    const subs = ScreenOrientation.addOrientationChangeListener((s) => {
      setCurrentOrientation(s.orientationInfo.orientation)
    })

    return () => ScreenOrientation.removeOrientationChangeListener(subs)
  }, [])

  return currentOrientation
}
