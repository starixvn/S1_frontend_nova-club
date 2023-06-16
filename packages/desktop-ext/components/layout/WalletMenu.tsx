import React, { useState } from 'react'
import { DripsyGradient } from 'app/components/Gradient'
import WalletRoutes from 'desktop-ext/routes/walletRoutes'
import useLocalization from 'app/provider/localization'
import Icon from 'app/components/Icon'
import { Row, View } from 'dripsy'
import { useRouter } from 'next/router'
import TabBarItem from '../tab/TabBarItem'

export const MENU_HEIGHT = 72

export default function WalletMenu({ currentTab, setCurrentTab }) {
  const { t } = useLocalization()
  const { push } = useRouter()

  return (
    <DripsyGradient
      gradient="surface"
      sx={{ height: MENU_HEIGHT, my: 20, justifyContent: 'center' }}
    >
      <Row sx={{ px: '$3' }}>
        {WalletRoutes &&
          WalletRoutes.map((r) => {
            const isActive = currentTab.includes(r.base ?? r.route)

            return (
              <TabBarItem
                key={r.key}
                isActive={isActive}
                onPress={() => {
                  setCurrentTab(r.route)
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
