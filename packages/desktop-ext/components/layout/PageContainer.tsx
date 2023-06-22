import { styled, View } from 'dripsy'

const PageContainer = styled(View)(({ center }: { center: boolean }) => ({
  borderWidth: 1,
  flex: 1,
  borderColor: '$primary.300',
  alignItems: center ? 'center' : 'stretch',
}))

export default PageContainer
