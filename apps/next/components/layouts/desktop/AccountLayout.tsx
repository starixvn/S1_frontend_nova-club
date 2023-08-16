import AccountMenu from 'desktop-ext/components/layout/AccountMenu'
import LeftPanelContainer from 'desktop-ext/components/layout/LeftPanelContainer'
import PageContainer from 'desktop-ext/components/layout/PageContainer'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/navigation/NavigationHeader'
import AccountRoutes from 'desktop-ext/routes/accountRoutes'
import { Container, Row } from 'dripsy'
import TabNavMenu from './TabNavMenu'

export default function AccountLayout({ children }) {
  return (
    <Container sx={{ minHeight: `calc(100vh - ${NAVIGATION_HEIGHT}px)` }}>
      <AccountMenu />
      <Row>
        <LeftMenu />
        <PageContainer>{children}</PageContainer>
      </Row>
    </Container>
  )
}

const LeftMenu = () => {
  return (
    <LeftPanelContainer>
      <TabNavMenu routes={AccountRoutes} />
    </LeftPanelContainer>
  )
}
