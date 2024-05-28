import Icon from 'agent/components/Icon'
import AgentRoutes from 'agent/navigation/routes/AgentRoutes'
import PartnerRoutes from 'agent/navigation/routes/PartnerRoutes'
import ShareholderRoutes from 'agent/navigation/routes/ShareholderRoutes'
import { useUserInfoQuery } from 'agent/services/userApi'
import { ROLE } from 'agent/utils/helper'
import usePathname from 'app/hooks/usePathname'
import { useAgentLocalization } from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import React, { useMemo } from 'react'
import { useRouter } from 'solito/router'
import AgentTabBar from './AgentTabBar'
import AgentTabBarItem from './AgentTabBarItem'

export default function AgentShareholderTabBar({}) {
  const token = useAppSelector((s) => s.agent.access_token)
  const { role } = useUserInfoQuery(undefined, {
    selectFromResult: (s) => ({ ...s, role: s.data?.role }),
    skip: !token,
  })

  const { push } = useRouter()
  const { t } = useAgentLocalization()

  const pathname = usePathname()

  const routes = useMemo(() => {
    switch (role) {
      case ROLE.AGENT:
        return AgentRoutes
      case ROLE.SHAREHOLDER:
        return ShareholderRoutes
      // case ROLE.PARTNER:
      //   return PartnerRoutes

      default:
        return ShareholderRoutes
    }
  }, [role])

  return (
    <AgentTabBar>
      {routes &&
        routes.map((r) => {
          const isActive = pathname.includes(r.base ?? r.route)

          return (
            <AgentTabBarItem
              key={r.key}
              isActive={isActive}
              onPress={() => {
                push(r.route)
              }}
              label={t(r.title)}
              renderIcon={({ color, size }) => (
                <Icon name={r.icon} color={color} size={size} />
              )}
            />
          )
        })}
    </AgentTabBar>
  )
}
