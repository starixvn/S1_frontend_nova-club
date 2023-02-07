import BouncePressable from 'app/pressable/BouncePressable'
import { styled, SxProp } from 'dripsy'
import { MotiPressableProps } from 'moti/interactions'
import Icon, { IconComponentProps } from './Icon'

export interface CheckBoxProps extends MotiPressableProps {
  onCheck?: (boolean) => any
  isCheck?: boolean
  sx?: SxProp
  _icon?: IconComponentProps
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
    <StyledBouncePressable
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
    </StyledBouncePressable>
  )
}

const StyledBouncePressable = styled(BouncePressable)({
  bg: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 2,
  height: 20,
  aspectRatio: 1,
})

export default CheckBox
