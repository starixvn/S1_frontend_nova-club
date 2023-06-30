import Divider from 'app/components/Divider'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { NoticeContent } from 'app/components/modal/NoticeModal'
import NavMenuPressable from 'app/components/pressable/NavMenuPressable'
import usePathname from 'app/hooks/usePathname'
import useLocalization from 'app/provider/localization'
import { DesktopRoute } from 'desktop-ext/routes/NavigationType'
import { Row, Text, View } from 'dripsy'
import { useEffect, useState } from 'react'

type TabNavMenuProps = {
  routes: Readonly<DesktopRoute[]>
  notice?: string[]
}

type NavMenuItemProps = {
  isActive: boolean
  icon?: string
  label: string
  href: string
  onPress: () => void
}

const TabNavMenu = ({ routes, notice }: TabNavMenuProps) => {
  const pathname = usePathname()
  const currentPath =
    routes?.find((el) => el.route === pathname)?.route ?? routes[0].route

  const { t } = useLocalization()
  const [currentMenu, setCurrentMenu] = useState(currentPath)

  useEffect(() => {
    setCurrentMenu(currentPath)
  }, [currentPath])

  return (
    <View>
      {routes &&
        routes.map((item) => {
          const isActive = currentMenu === (item.base ?? item.route)

          return (
            <NavMenuItem
              key={item.key}
              icon={item.icon}
              label={t(item.title)}
              href={item.route}
              isActive={isActive}
              onPress={() => setCurrentMenu(item.route)}
            />
          )
        })}

      {notice && (
        <>
          <View sx={{ mb: '$3' }} />
          <NoticeContent notice={notice ?? []} />
        </>
      )}
    </View>
  )
}

const NavMenuItem = ({
  isActive,
  icon,
  label,
  href,
  onPress,
}: NavMenuItemProps) => {
  return (
    <NavMenuPressable href={href} isActive={isActive} onPress={onPress}>
      {/* <Divider /> */}
      <DripsyGradient gradient="surface">
        <Row
          sx={{
            p: '$3',
            borderRightWidth: isActive ? 8 : 0,
            borderColor: '$primary.100',
            borderTopWidth: 1,
          }}
        >
          {icon && <Icon name={icon} sx={{ mr: '$3' }} />}
          <Text>{label}</Text>
        </Row>
      </DripsyGradient>
    </NavMenuPressable>
  )
}

export default TabNavMenu
