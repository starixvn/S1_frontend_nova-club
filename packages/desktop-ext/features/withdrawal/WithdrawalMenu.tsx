import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import LinkPressable from 'app/components/pressable/LinkPressable'
import NavMenuPressable from 'app/components/pressable/NavMenuPressable'
import usePathname from 'app/hooks/usePathname'
import useLocalization from 'app/provider/localization'
import WithdrawalRoutes from 'desktop-ext/routes/withdrawalRoutes'
import { Row, Text, View } from 'dripsy'
import React from 'react'

const WithdrawalMenu = () => {
  const { t } = useLocalization()

  const pathname = usePathname()

  return (
    <View sx={{ mb: '$3' }}>
      <DripsyGradient gradient="surface">
        {WithdrawalRoutes.map((item) => {
          const isActive = item.route === pathname

          return (
            <MenuNavItem
              key={item.key}
              icon={item.icon}
              label={t(item.title)}
              href={item.route}
              isActive={isActive}
            />
          )
        })}
      </DripsyGradient>
    </View>
  )
}

const MenuNavItem = ({ isActive, icon, label, href }) => {
  return (
    <NavMenuPressable href={href}>
      <Row
        sx={{
          p: '$3',
          borderRightWidth: isActive ? 8 : 0,
          borderColor: '$primary.100',
        }}
      >
        <Icon name={icon} sx={{ mr: '$3' }} />
        <Text>{label}</Text>
      </Row>
    </NavMenuPressable>
  )
}

export default WithdrawalMenu
