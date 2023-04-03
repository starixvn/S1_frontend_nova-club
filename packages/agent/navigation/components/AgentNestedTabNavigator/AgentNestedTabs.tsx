import Icon from 'agent/components/Icon'
import { AgentRoute } from 'agent/navigation/NavigationType'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import React from 'react'
import AgentNestedTabBar from './AgentNestedTabBar'
import AgentNestedTabBarItem from './AgentNestedTabBarItem'

export default function AgentNestedTabs({
  routes,
}: {
  routes: Readonly<AgentRoute[]>
}) {
  const { push } = useContextualRouter()
  const { returnHref } = useContextualRouting()
  const { t } = useLocalization()

  return (
    <AgentNestedTabBar>
      {routes &&
        routes.map((r) => {
          const isActive = returnHref.includes(r.route)

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
