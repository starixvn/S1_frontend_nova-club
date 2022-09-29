import useOrientation from 'app/hooks/useOrientation'
import BouncePressable from 'app/pressable/BouncePressable'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SxProp } from 'dripsy'
import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useEffect, useState } from 'react'
import Icon from '../Icon'

interface MenuNoticeProps {
  sx?: SxProp
  onPress: () => void
}
const MenuNotice = ({ onPress, sx }: MenuNoticeProps) => {
  const orientation = useOrientation()
  const { left } = useSafeArea()

  const isLandscape =
    orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
    orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT

  return (
    <BouncePressable onPress={onPress} sx={{ px: '$4', mx: left, ...sx }}>
      <Icon name="alert" size={isLandscape ? 14 : 20} color="#9CD9FA" />
    </BouncePressable>
  )
}

export default MenuNotice
