import { HEADER_HEIGHT } from 'desktop-ext/components/layout/MainHeader'
import WalletMenu from 'desktop-ext/components/layout/WalletMenu'
import { Container, View, styled } from 'dripsy'
import BaseLayout from './BaseLayout'

export default function WalletLayout({ children }) {
  return (
    <BaseLayout>
      <Container sx={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
        <WalletMenu />
        {children}
      </Container>
    </BaseLayout>
  )
}

const RightContainer = styled(View)({
  borderWidth: 1,
  flex: 1,
  borderColor: '$primary.300',
})
