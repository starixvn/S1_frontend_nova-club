import Icon, { IconComponentProps } from 'app/components/Icon'
import BouncePressable from 'app/pressable/BouncePressable'
import { Pressable, styled, SxProp, View } from 'dripsy'
import { MotiPressable } from 'moti/interactions'
import { useMemo } from 'react'
import { TouchableOpacity } from 'react-native'

interface IIconButtonProps {
  name: string
  size?: number
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
}

const IconButton = ({
  onPress,
  name,
  size = 32,
  disabled,
  loading,
  ...rest
}: IIconButtonProps) => {
  return (
    <StyledMotiPressable
      disabled={disabled || loading}
      onPress={onPress}
      size={size}
      {...rest}
    >
      <Icon name={name} size={size} />
    </StyledMotiPressable>
  )
}

const StyledMotiPressable = styled(BouncePressable)(({ size }) => ({
  borderRadius: 100,
  aspectRatio: 1,
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: size,
}))

export default IconButton
