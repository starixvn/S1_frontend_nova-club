import BouncePressable from 'app/pressable/BouncePressable'
import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useEffect, useState } from 'react'
import Icon from '../Icon'

const MenuNotice = ({ onPress }) => {
  const [currentOrientation, setCurrentOrientation] = useState(
    ScreenOrientation.Orientation.PORTRAIT_DOWN
  )
  useEffect(() => {
    const subs = ScreenOrientation.addOrientationChangeListener((s) => {
      setCurrentOrientation(s.orientationInfo.orientation)
    })

    return () => ScreenOrientation.removeOrientationChangeListener(subs)
  }, [])

  const isLandscape =
    currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
    currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT

  return (
    <BouncePressable onPress={onPress} sx={{ p: isLandscape ? '$0a' : '$2' }}>
      <Icon name="alert" size={isLandscape ? 14 : 20} color="#9CD9FA" />
    </BouncePressable>
  )
}

export default MenuNotice
