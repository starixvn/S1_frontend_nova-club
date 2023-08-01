import { FooterLinks } from 'app/components/navigation/footer/FooterNav'
import LeftPanelContainer from 'desktop-ext/components/layout/LeftPanelContainer'
import PageContainer from 'desktop-ext/components/layout/PageContainer'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/navigation/NavigationHeader'
import { Container, Row } from 'dripsy'
import TabNavMenu from './TabNavMenu'
import { ReactNode } from 'react'

export default function InfoLayout({ children }: { children: ReactNode }) {
  return (
    <Container
      sx={{ minHeight: `calc(100vh - ${NAVIGATION_HEIGHT}px)`, pt: '$4' }}
    >
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
      <TabNavMenu routes={FooterLinks} />
    </LeftPanelContainer>
  )
}
