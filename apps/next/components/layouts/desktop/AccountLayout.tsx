import AccountMenu from 'desktop-ext/components/layout/AccountMenu'
import LeftPanelContainer from 'desktop-ext/components/layout/LeftPanelContainer'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/NavigationHeader'
import PageContainer from 'desktop-ext/components/layout/PageContainer'
import { Container, Row } from 'dripsy'
import BaseLayout from './BaseLayout'
import TabNavMenu from './TabNavMenu'
import AccountRoutes from 'desktop-ext/routes/accountRoutes'

export default function AccountLayout({ children }) {
  return (
    <BaseLayout>
      <Container sx={{ minHeight: `calc(100vh - ${NAVIGATION_HEIGHT}px)` }}>
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
      <TabNavMenu routes={AccountRoutes} />
    </LeftPanelContainer>
  )
}
