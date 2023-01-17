import Icon, { IconComponentProps } from 'app/components/Icon'
import BouncePressable from 'app/pressable/BouncePressable'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import { styled, SxProp } from 'dripsy'

interface IIconButtonProps {
  name: string
  color?: string
  size?: number
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
  sx?: SxProp
}

const IconButton = ({
  onPress,
  name,
  size = 32,
  disabled,
  loading,
  color,
  sx,
  ...rest
}: IIconButtonProps) => {
  const iconOverride: IconComponentProps = { name, size }
  if (color) iconOverride.color = color

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      size={size}
      sx={{ p: '$1', alignItems: 'center', justifyContent: 'center', ...sx }}
      {...rest}
    >
      <Icon {...iconOverride} />
    </TouchableOpacity>
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
