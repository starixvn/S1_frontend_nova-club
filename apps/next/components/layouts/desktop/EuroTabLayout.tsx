import PageContainer from 'desktop-ext/components/layout/PageContainer'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/navigation/NavigationHeader'
import { Row } from 'dripsy'
import { ReactNode } from 'react'

export default function EuroTabLayout({ children }: { children: ReactNode }) {
  return (
    <Row sx={{ minHeight: `calc(100vh - ${NAVIGATION_HEIGHT}px)` }}>
      <PageContainer>{children}</PageContainer>
    </Row>
  )
}
