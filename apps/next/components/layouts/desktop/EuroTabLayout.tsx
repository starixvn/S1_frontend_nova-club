import EuroTabIcon from 'app/features/event/euroCup/components/EuroTabIcon'
import usePathname from 'app/hooks/usePathname'
import { EURO_BOTTOM_ROUTE } from 'app/navigation/RoutePath'
import PageContainer from 'desktop-ext/components/layout/PageContainer'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/navigation/NavigationHeader'
import { Row, View } from 'dripsy'
import { ReactNode } from 'react'
import { useRouter } from 'solito/router'
import { HEADER_HEIGHT } from 'utils/constant'

export default function InfoLayout({ children }: { children: ReactNode }) {
  return (
    <Row sx={{ minHeight: `calc(100vh - ${NAVIGATION_HEIGHT}px)` }}>
      <PageContainer>{children}</PageContainer>
      <LeftMenu />
    </Row>
  )
}

const LeftMenu = () => {
  const pathname = usePathname()
  const { push, replace } = useRouter()

  const isActiveState = (path: string) => {
    const isSamePath = pathname.includes(path)

    return isSamePath
  }

  return (
    <View
      sx={{
        bg: '#182F90CC',
        position: 'fixed',
        left: 0,
        top: NAVIGATION_HEIGHT + HEADER_HEIGHT,
        width: 150,
        height: 700,
        borderBottomRightRadius: 48,
        py: '$4',
      }}
    >
      {EURO_BOTTOM_ROUTE.map((route) => {
        return (
          <EuroTabIcon
            key={route.label}
            sx={{ flex: 1 }}
            active={isActiveState(route.path)}
            label={route.label}
            size={100}
            icon={route.icon ?? 'notice'}
            onPress={() => replace(route.path ?? '/')}
          />
        )
      })}
    </View>
  )
}
