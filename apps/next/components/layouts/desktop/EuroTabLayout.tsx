import EuroTabIcon from 'app/features/event/euroCup/components/EuroTabIcon'
import usePathname from 'app/hooks/usePathname'
import { EURO_BOTTOM_ROUTE } from 'app/navigation/RoutePath'
import PageContainer from 'desktop-ext/components/layout/PageContainer'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/navigation/NavigationHeader'
import { Row, View } from 'dripsy'
import { ReactNode } from 'react'
import { useRouter } from 'solito/router'
import { HEADER_HEIGHT } from 'utils/constant'
import FloatingEuroCupNavigation from 'desktop-ext/components/layout/navigation/FloatingEuroCupNavigation'

export default function EuroTabLayout({ children }: { children: ReactNode }) {
  return (
    <Row sx={{ minHeight: `calc(100vh - ${NAVIGATION_HEIGHT}px)` }}>
      <PageContainer>{children}</PageContainer>
    </Row>
  )
}
