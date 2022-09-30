import useOrientation from 'app/hooks/useOrientation'
import BouncePressable from 'app/pressable/BouncePressable'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SxProp } from 'dripsy'
import React from 'react'
import Icon from '../Icon'

interface MenuNoticeProps {
  sx?: SxProp
  onPress: () => void
}
const MenuNotice = ({ onPress, sx }: MenuNoticeProps) => {
  const { orientation, isLandscape } = useOrientation()
  const { left } = useSafeArea()

  return (
    <BouncePressable onPress={onPress} sx={{ px: '$4', mx: left, ...sx }}>
      <Icon name="alert" size={isLandscape ? 14 : 20} color="#9CD9FA" />
    </BouncePressable>
  )
}

export default MenuNotice
