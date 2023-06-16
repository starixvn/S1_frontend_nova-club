import AccountMenu from 'desktop-ext/components/layout/AccountMenu'
import LeftPanelContainer from 'desktop-ext/components/layout/LeftPanelContainer'
import { HEADER_HEIGHT } from 'desktop-ext/components/layout/NavigationHeader'
import PageContainer from 'desktop-ext/components/layout/PageContainer'
import { Container, Row, Text, View, styled } from 'dripsy'
import BaseLayout from './BaseLayout'

export default function AccountLayout({ children }) {
  return (
    <BaseLayout>
      <Container sx={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
        <AccountMenu />
        <Row>
          <LeftMenu />
          <PageContainer>{children}</PageContainer>
        </Row>
      </Container>
    </BaseLayout>
  )
}

const LeftMenu = () => {
  return (
    <LeftPanelContainer>
      <Text sx={{ py: '$5' }}>Profile</Text>
      <Text sx={{ py: '$5' }}> Bank Account</Text>
    </LeftPanelContainer>
  )
}
