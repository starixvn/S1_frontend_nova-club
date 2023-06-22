import { SxProp, Text, View, styled } from 'dripsy'

type InputLabelProps = {
  desktop?: boolean
  label: string
  sx?: SxProp
}

const InputLabel = ({ desktop = false, label, sx }: InputLabelProps) => {
  return (
    <LabelView isHorizontal={desktop} sx={sx}>
      <Label isHorizontal={desktop}>{`${label} :`}</Label>
    </LabelView>
  )
}

const LabelView = styled(View)(
  ({ isHorizontal = false }: { isHorizontal?: boolean }) => {
    const desktopStyled = { minWidth: 200, width: '20%', pr: 10 }
    return { ...(isHorizontal && desktopStyled) }
  }
)

const Label = styled(Text)(
  ({ isHorizontal = false }: { isHorizontal?: boolean }) => {
    const desktopStyled = { textAlign: 'right' }
    return {
      fontWeight: 'bold',
      mb: '$1',
      ...(isHorizontal && desktopStyled),
    }
  }
)

export default InputLabel
