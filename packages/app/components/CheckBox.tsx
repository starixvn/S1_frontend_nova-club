import BouncePressable from 'app/pressable/BouncePressable'
import { styled, SxProp } from 'dripsy'
import Icon, { IconComponentProps } from './Icon'

const CheckBox = ({
  onCheck,
  isCheck,
  sx,
  _icon,
}: {
  onCheck: (boolean) => any
  isCheck?: boolean
  sx?: SxProp
  _icon?: IconComponentProps
}) => {
  return (
    <StyledBouncePressable
      onPress={() => {
        onCheck(!isCheck)
      }}
      sx={{ ...sx }}
    >
      {isCheck && (
        <Icon
          name="tick"
          color="green"
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
  height: 15,
  aspectRatio: 1,
})

export default CheckBox
