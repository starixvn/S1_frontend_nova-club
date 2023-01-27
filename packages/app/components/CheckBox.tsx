import BouncePressable from 'app/pressable/BouncePressable'
import { styled, SxProp } from 'dripsy'
import Icon, { IconComponentProps } from './Icon'

const CheckBox = ({
  onCheck,
  isCheck,
  sx,
  _icon,
  tickColor,
}: {
  onCheck?: (boolean) => any
  isCheck?: boolean
  sx?: SxProp
  _icon?: IconComponentProps
  tickColor?: string
}) => {
  return (
    <StyledBouncePressable
      disabled={!onCheck}
      onPress={() => {
        onCheck && onCheck(!isCheck)
      }}
      sx={{ alignItems: 'center', justifyContent: 'center', ...sx }}
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
  borderRadius: 2,
  height: 20,
  aspectRatio: 1,
})

export default CheckBox
