import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import usePathname from 'app/hooks/usePathname'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import LeftPanelContainer from 'desktop-ext/components/layout/LeftPanelContainer'
import PageSection from 'desktop-ext/components/layout/PageSection'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/navigation/NavigationHeader'
import RewardRoutes from 'desktop-ext/routes/rewardRoutes'
import { Container, Row, View } from 'dripsy'
import { ResizeMode, Video } from 'expo-av'
import {
  ComponentProps,
  ElementRef,
  ReactNode,
  RefObject,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Platform, Pressable } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { usePlayerProfileQuery } from 'services/playerApi'
import { NavMenuItem } from './TabNavMenu'

export default function RewardLayout({
  children,
  withoutContainer,
}: {
  children: ReactNode
  withoutContainer?: boolean
}) {
  const PageContainer = withoutContainer ? View : DefaultContainer

  return (
    <Container sx={{ minHeight: `calc(100vh - ${NAVIGATION_HEIGHT}px)` }}>
      <View
        sx={{
          mt: '$layoutSpace',
        }}
      ></View>

      <Row>
        <LeftPanel />
        <PageContainer sx={{ flex: 1 }}>{children}</PageContainer>
      </Row>
    </Container>
  )
}

const DefaultContainer = (props: ComponentProps<typeof View>) => {
  const pathname = usePathname()
  const { t } = useLocalization()

  const containerProps = useMemo(() => {
    const route =
      RewardRoutes.find((r) => pathname.startsWith(r.route)) ?? RewardRoutes[0]
    return {
      icon: route.altIcon ?? route.icon,
      text: t(route.title),
    }
  }, [pathname, t])

  return <PageSection {...containerProps} {...props} />
}

const LeftPanel = () => {
  const [stickyCompoentTopDistant, setStickyCompoentTopDistant] = useState(0)
  const stickyComponentRef = useRef<HTMLDivElement>(null)
  const locale = useAppSelector((s) => s.setting.locale)
  const { t } = useLocalization()
  const { openModal } = useModal()
  const pathname = usePathname()

  const { data: profileData } = usePlayerProfileQuery()
  const enableCheckIn = !profileData?.disabled_event ?? false

  function handleDailyCheckInModal() {
    openModal('DailyCheckInModal')
  }

  useLayoutEffect(function handleLeftPanelStickyElement() {
    const stickyComponent = stickyComponentRef.current
    if (stickyComponent) {
      const topDistant = stickyComponent.getBoundingClientRect().top

      setStickyCompoentTopDistant(topDistant)
    }

    let originalOverflow = ''
    const parentWithOverflow = document.getElementById('al')

    if (parentWithOverflow) {
      originalOverflow = window.getComputedStyle(parentWithOverflow).overflow
      parentWithOverflow.style.overflow = 'unset'
    }

    return () => {
      if (originalOverflow && parentWithOverflow) {
        parentWithOverflow.style.overflow = originalOverflow
      }
    }
  }, [])

  return (
    <LeftPanelContainer
      ref={stickyComponentRef as unknown as RefObject<ElementRef<typeof View>>}
      sx={{
        zIndex: 1,
        mb: 0,
        position: 'sticky',
        top: stickyCompoentTopDistant,
      }}
    >
      <View
        sx={{
          width: '100%',
          maxWidth: [280, 280, 280, 280, 320],
        }}
      >
        {RewardRoutes &&
          RewardRoutes.map((item) => {
            return (
              <NavMenuItem
                shallow
                key={item.key}
                href={item.route}
                label={t(item.title)}
                icon={item.icon}
                isActive={pathname.startsWith(item.route)}
                labelProps={{ sx: { textTransform: 'uppercase' } }}
              />
            )
          })}
        <View sx={{ mt: '$3' }}>
          <Pressable
            onPress={handleDailyCheckInModal}
            disabled={!enableCheckIn}
          >
            <Video
              isMuted
              isLooping
              shouldPlay
              style={{
                width: '100%',
                height: 133,
              }}
              videoStyle={{
                position: Platform.OS === 'web' ? 'relative' : 'absolute',
                height: '100%',
              }}
              source={{
                uri: `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/daily-check-in-${locale}.mp4`,
              }}
              resizeMode={ResizeMode.COVER}
            />
            {!enableCheckIn && (
              <View
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  bg: 'black',
                  opacity: 0.7,
                }}
              />
            )}
          </Pressable>
        </View>
      </View>
    </LeftPanelContainer>
  )
}
