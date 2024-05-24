import { MessageBadge } from 'app/components/Badge'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { NoticeContent } from 'app/components/modal/NoticeModal'
import NavMenuPressable, {
  NavMenuPressableProps,
} from 'app/components/pressable/NavMenuPressable'
import usePathname from 'app/hooks/usePathname'
import { logEvent } from 'app/integrations/analytic'
import { GAEvents } from 'app/integrations/analytic/events'
import useLocalization from 'app/provider/localization'
import { DesktopRoute } from 'desktop-ext/routes/NavigationType'
import { Row, Text, View } from 'dripsy'
import { ComponentProps, useEffect, useState } from 'react'

interface TabNavMenuProps extends ComponentProps<typeof View> {
  routes: DesktopRoute[]
  notice?: string[]
}

type NavMenuItemProps = {
  icon?: string
  label: string
  labelProps?: ComponentProps<typeof Text>
} & NavMenuPressableProps

const TabNavMenu = ({ routes, notice, ...rest }: TabNavMenuProps) => {
  const pathname = usePathname()

  const currentPath =
    routes?.find((el) => el.route === pathname)?.route ??
    routes?.find((el) => el?.base && pathname.includes(el?.base))?.route ??
    routes[0]?.route

  const { t } = useLocalization()
  const [currentMenu, setCurrentMenu] = useState(currentPath)

  useEffect(() => {
    setCurrentMenu(currentPath)
  }, [currentPath])

  return (
    <View {...rest}>
      {routes &&
        routes.map((item) => {
          const isActive =
            currentMenu === item.route ||
            (item?.base && currentMenu.includes(item?.base)) ||
            false

          return (
            <NavMenuItem
              key={item.key}
              icon={item.icon}
              label={t(item.title)}
              href={item.route}
              isActive={isActive}
              onPress={() => {
                /* for now track deposit category only */
                if (pathname.startsWith('/deposit'))
                  logEvent(GAEvents.CTA_DepositCategory, {
                    ref: item.route,
                    display_name: item.key,
                  })

                setCurrentMenu(item.route)
              }}
            />
          )
        })}

      {notice && (
        <>
          <View sx={{ mb: '$3' }} />
          <NoticeContent notice={notice ?? []} bodyStyle={{ p: 0 }} />
        </>
      )}
    </View>
  )
}

export const NavMenuItem = ({
  isActive = false,
  icon,
  label,
  labelProps,
  ...rest
}: NavMenuItemProps) => {
  return (
    <NavMenuPressable isActive={isActive} {...rest}>
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
          <Text {...labelProps} sx={{ flex: 1, ...labelProps?.sx }}>
            {label}
          </Text>

          {icon === 'announcement' && <MessageBadge size="inline" />}
        </Row>
      </DripsyGradient>
    </NavMenuPressable>
  )
}

export default TabNavMenu
