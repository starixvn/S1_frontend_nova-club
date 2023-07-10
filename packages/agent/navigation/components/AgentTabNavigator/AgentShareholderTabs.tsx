import Icon from 'agent/components/Icon'
import AgentRoutes from 'agent/navigation/routes/AgentRoutes'
import ShareholderRoutes from 'agent/navigation/routes/ShareholderRoutes'
import { useUserInfoQuery } from 'agent/services/userApi'
import { ROLE } from 'agent/utils/helper'
import { useAgentLocalization } from 'app/provider/localization'
import React, { useMemo } from 'react'
import AgentTabBar from './AgentTabBar'
import AgentTabBarItem from './AgentTabBarItem'
import { useRouter } from 'solito/router'

export default function AgentShareholderTabBar({}) {
  const { isAgent } = useUserInfoQuery(undefined, {
    selectFromResult: (s) => ({ ...s, isAgent: s.data?.role === ROLE.AGENT }),
  })

  const { push } = useRouter()
  const { t } = useAgentLocalization()

  const currentPath = window?.location?.pathname

  const routes = useMemo(() => {
    return isAgent ? AgentRoutes : ShareholderRoutes
  }, [isAgent])

  return (
    <AgentTabBar>
      {routes &&
        routes.map((r) => {
          const isActive = currentPath.includes(r.base ?? r.route)

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
