import { View, styled } from 'dripsy'

const FormContainer = styled(View, {
  defaultVariant: 'body',
  themeKey: 'forms',
})(({ padding }: { padding?: boolean }) => ({
  p: padding ? 0 : '$pagePadding',
}))

export default FormContainer
