import React, { useState } from 'react'
import { DripsyGradient } from 'app/components/Gradient'
import WalletRoutes from 'desktop-ext/routes/walletRoutes'
import useLocalization from 'app/provider/localization'
import Icon from 'app/components/Icon'
import { Row, View } from 'dripsy'
import { useRouter } from 'next/router'
import TabBarItem from '../tab/TabBarItem'
import Divider from 'app/components/Divider'

export const MENU_HEIGHT = 72

export default function WalletMenu({ currentTab }) {
  const { t } = useLocalization()
  const { push } = useRouter()

  return (
    <View
      sx={{
        my: '$layoutSpace',
      }}
    >
      <Divider />
      <DripsyGradient
        gradient="surface"
        sx={{
          height: MENU_HEIGHT,
          justifyContent: 'center',
        }}
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
                    push(r.route)
                  }}
                  label={t(r.title)}
                  renderIcon={() => <Icon name={r.icon} />}
                />
              )
            })}
        </Row>
      </DripsyGradient>
    </View>
  )
}
