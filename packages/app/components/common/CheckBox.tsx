import { Pressable, SxProp, styled } from 'dripsy'
import { MotiPressableProps } from 'moti/interactions'
import Icon, { IconProps } from '../Icon'
import { TouchableOpacity } from 'react-native'

export interface CheckBoxProps extends MotiPressableProps {
  onCheck?: (boolean) => any
  isCheck?: boolean
  sx?: SxProp
  _icon?: IconProps
  tickColor?: string
}
const CheckBox = ({
  onCheck,
  isCheck,
  _icon,
  tickColor,
  ...rest
}: CheckBoxProps) => {
  return (
    <StyledPressable
      disabled={!onCheck}
      onPress={() => {
        onCheck && onCheck(!isCheck)
      }}
      {...rest}
    >
      {isCheck && (
        <Icon
          name="tick"
          color={tickColor ? tickColor : 'green'}
          sx={{ alignSelf: 'center' }}
          size={15}
          {..._icon}
        />
      )}
    </StyledPressable>
  )
}

const StyledPressable = styled(TouchableOpacity)({
  bg: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 2,
  height: 20,
  aspectRatio: 1,
})

export default CheckBox
