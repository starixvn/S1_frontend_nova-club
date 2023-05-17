import { Pressable, styled, SxProp, Text, View } from 'dripsy'
import Icon, { IconComponentProps } from './Icon'
import { ComponentProps } from 'react'

export interface CheckBoxProps extends ComponentProps<typeof Pressable> {
  onCheck?: (boolean) => any
  isCheck?: boolean
  label?: string
  checkboxStyle?: SxProp
  _icon?: IconComponentProps
  tickColor?: string
}

const CheckBox = ({
  onCheck,
  isCheck = false,
  label,
  _icon,
  tickColor,
  checkboxStyle,
  ...rest
}: CheckBoxProps) => {
  return (
    <StyledPressable
      disabled={!onCheck}
      onPress={() => {
        onCheck && onCheck(!isCheck)
      }}
      isCheck={isCheck}
      label={!!label}
      {...rest}
    >
      <StyledBox label={!!label} sx={checkboxStyle}>
        {isCheck && (
          <Icon
            name="tick"
            color={tickColor ? tickColor : '#D1D1D1'}
            sx={{ alignSelf: 'center' }}
            size={15}
            {..._icon}
          />
        )}
      </StyledBox>
      {label && <Text sx={{ color: 'black' }}>{label}</Text>}
    </StyledPressable>
  )
}

const StyledPressable = styled(Pressable)(
  ({ isCheck, label }: { isCheck: boolean; label: boolean }) => ({
    flexDirection: 'row',
    p: label ? 12 : 0,
    backgroundColor: isCheck ? '$primaryAgent' : '$secondaryAgent',
  })
)

const StyledBox = styled(View)(({ label }: { label: boolean }) => ({
  bg: '#818384',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 2,
  height: 20,
  aspectRatio: 1,
  mr: label ? 12 : 0,
}))

export default CheckBox
