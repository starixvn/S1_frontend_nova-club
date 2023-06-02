import useOrientation from 'app/hooks/useOrientation'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SxProp } from 'dripsy'
import React from 'react'
import Icon from '../Icon'
import BouncePressable from '../pressable/BouncePressable'

interface MenuNoticeProps {
  sx?: SxProp
  onPress: () => void
}
const MenuNotice = ({ onPress, sx }: MenuNoticeProps) => {
  const { orientation, isLandscape } = useOrientation()
  const { left } = useSafeArea()

  return (
    <BouncePressable onPress={onPress} sx={{ px: '$4', mx: left, ...sx }}>
      <Icon name="notice" size={isLandscape ? 14 : 20} />
    </BouncePressable>
  )
}

export default MenuNotice
