import { View, styled } from 'dripsy'

const FormContainer = styled(View, {
  defaultVariant: 'body',
  themeKey: 'forms',
})(({ padding }: { padding?: boolean }) => ({
  p: padding ? '$pagePadding' : 0,
}))

export default FormContainer
