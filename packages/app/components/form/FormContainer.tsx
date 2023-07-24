import { View, styled } from 'dripsy'

const FormContainer = styled(View, {
  defaultVariant: 'body',
  themeKey: 'forms',
})(({ hidePadding }: { hidePadding?: boolean }) => ({
  p: hidePadding ? 0 : '$pagePadding',
}))

export default FormContainer
