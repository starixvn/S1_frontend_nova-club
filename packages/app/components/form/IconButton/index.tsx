import Icon, { IconComponentProps } from 'app/components/Icon'
import { Pressable, styled, View } from 'dripsy'
import { TouchableOpacity } from 'react-native'

interface IIconButtonProps {
  _icon?: IconComponentProps | undefined
  onPress?: () => void
}

const IconButton = ({ onPress, _icon, ...rest }: IIconButtonProps) => {
  return (
    <StyledPressable
      onPress={onPress}
      android_ripple={{
        color: 'black',
        borderless: true,
        foreground: true,
        radius: 15,
      }}
      {...rest}
    >
      {typeof _icon === 'object' && <Icon size={36} color="white" {..._icon} />}
    </StyledPressable>
  )
}

const StyledPressable = styled(Pressable)(() => ({
  borderRadius: 100,
}))

export default IconButton
