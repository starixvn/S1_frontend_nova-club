import Icon from 'agent/components/Icon'
import { AgentRoute } from 'agent/navigation/NavigationType'
import { useAgentLocalization } from 'app/provider/localization'
import React from 'react'
import AgentNestedTabBar from './AgentNestedTabBar'
import AgentNestedTabBarItem from './AgentNestedTabBarItem'
import { useRouter } from 'solito/router'
import usePathname from 'app/hooks/usePathname'

export default function AgentNestedTabs({
  routes,
}: {
  routes: Readonly<AgentRoute[]>
}) {
  const { push } = useRouter()
  const { t } = useAgentLocalization()

  const pathname = usePathname()

  return (
    <AgentNestedTabBar>
      {routes &&
        routes.map((r) => {
          const isActive = pathname.includes(r.route)

          return (
            <AgentNestedTabBarItem
              key={r.key}
              isActive={isActive}
              onPress={() => {
                push(r.route)
              }}
              label={t(r.title)}
              renderIcon={({ color, size }) =>
                r.icon ? <Icon name={r.icon} color={color} size={size} /> : null
              }
            />
          )
        })}
    </AgentNestedTabBar>
  )
}
