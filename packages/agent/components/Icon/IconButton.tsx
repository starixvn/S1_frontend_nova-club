import Icon, { IconComponentProps } from 'agent/components/Icon'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'
import { SxProp } from 'dripsy'

export interface IIconButtonProps {
  name: string
  color?: string
  size?: number
  bordered?: boolean
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
  sx?: SxProp
}

const IconButton = ({
  onPress,
  name,
  size = 32,
  bordered = false,
  disabled,
  loading,
  color,
  sx,
  ...rest
}: IIconButtonProps) => {
  const iconOverride: IconComponentProps = { name, size }
  if (color) iconOverride.color = color
  const PADDING = bordered ? 12 : 0

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      sx={{
        p: PADDING,
        alignItems: 'center',
        justifyContent: 'center',
        width: size + PADDING * 2,
        height: size + PADDING * 2,
        borderRadius: bordered ? 50 : 0,
        bg: bordered ? 'rgba(0,0,0,0.1)' : null,
        ...sx,
      }}
      {...rest}
    >
      <Icon {...iconOverride} />
    </TouchableOpacity>
  )
}

export default IconButton
