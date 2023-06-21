import { Text, View, styled } from 'dripsy'

type InputLabelProps = {
  desktop?: boolean
  label: string
}

const InputLabel = ({ desktop = false, label }: InputLabelProps) => {
  return (
    <LabelView isDesktop={desktop}>
      <Label isDesktop={desktop}>{`${label} :`}</Label>
    </LabelView>
  )
}

const LabelView = styled(View)(
  ({ isDesktop = false }: { isDesktop?: boolean }) => {
    const desktopStyled = { minWidth: 200, width: '20%', pr: 10 }
    return { ...(isDesktop && desktopStyled) }
  }
)

const Label = styled(Text)(({ isDesktop = false }: { isDesktop?: boolean }) => {
  const desktopStyled = { textAlign: 'right' }
  return {
    fontWeight: 'bold',
    mb: '$1',
    ...(isDesktop && desktopStyled),
  }
})

export default InputLabel
