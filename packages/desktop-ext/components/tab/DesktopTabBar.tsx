import React, { useState } from 'react'
import { DripsyGradient } from 'app/components/Gradient'
import WalletRoutes from 'desktop-ext/routes/walletRoutes'
import TabBarItem from './TabBarItem'
import useLocalization from 'app/provider/localization'
import Icon from 'app/components/Icon'
import { Row, View } from 'dripsy'
import { useRouter } from 'next/router'
import usePathname from 'app/hooks/usePathname'

export const MENU_HEIGHT = 72
const DesktopTabBar = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const [filter, setFilter] = useState()

  const pathname = usePathname()

  const routes = WalletRoutes

  return (
    <DripsyGradient
      gradient="surface"
      sx={{ height: MENU_HEIGHT, my: 20, justifyContent: 'center' }}
    >
      <Row sx={{ px: '$3' }}>
        {routes &&
          routes.map((r) => {
            const isActive = pathname.includes(r.base ?? r.route)

            return (
              <TabBarItem
                key={r.key}
                isActive={isActive}
                onPress={() => {
                  push(r.route)
                }}
                label={t(r.title)}
                renderIcon={() => <Icon name={r.icon} />}
              />
            )
          })}
      </Row>
    </DripsyGradient>
  )
}

export default DesktopTabBar
