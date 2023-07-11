import LeftPanelContainer from 'desktop-ext/components/layout/LeftPanelContainer'
import PageContainer from 'desktop-ext/components/layout/PageContainer'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/navigation/NavigationHeader'
import LeaderboardRoutes from 'desktop-ext/routes/leaderboardRoutes'
import { Container, Row } from 'dripsy'
import TabNavMenu from './TabNavMenu'

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container
      sx={{ minHeight: `calc(100vh - ${NAVIGATION_HEIGHT}px)`, mt: '$3' }}
    >
      <Row>
        <LeftPanelContainer>
          <TabNavMenu routes={LeaderboardRoutes} />
        </LeftPanelContainer>
        <PageContainer>{children}</PageContainer>
      </Row>
    </Container>
  )
}
