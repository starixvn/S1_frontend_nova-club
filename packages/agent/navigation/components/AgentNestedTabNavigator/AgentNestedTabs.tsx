import Icon from 'agent/components/Icon'
import { AgentRoute } from 'agent/navigation/NavigationType'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useCurrentPath from 'app/hooks/useCurrentPath'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import React from 'react'
import { Platform } from 'react-native'
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

  const currentRoute = useCurrentPath()
  return (
    <AgentNestedTabBar>
      {routes &&
        routes.map((r) => {
          const isActive = Platform.select({
            web: currentRoute.path === r.route,
            default: r.key === currentRoute.name,
          })

          return (
            <AgentNestedTabBarItem
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
    </AgentNestedTabBar>
  )
}
