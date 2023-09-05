import Icon from 'app/components/Icon'
import TopTabBar from 'app/components/navigation/topTab/TopTabBar'
import TopTabBarItem from 'app/components/navigation/topTab/TopTabBarItem'
import usePathname from 'app/hooks/usePathname'
import { Route } from 'app/navigation/type'
import useLocalization from 'app/provider/localization'
import rewardRoutes from 'app/routes/rewardRoutes'
import { MotiPressable } from 'moti/interactions'
import React from 'react'
import { useRouter } from 'solito/router'

type Props = {}

export default function RewardsTabBar({}: Props) {
  const { t } = useLocalization()
  const { push } = useRouter()
  const pathname = usePathname()

  function onTab(r: Route) {
    push(r.route)
  }

  return (
    <TopTabBar>
      <MotiPressable
        style={{ marginHorizontal: 4 }}
        onPress={() => {
          push('/rewards/daily')
        }}
        from={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 500,
        }}
      >
        <Icon size={24} name="daily" />
      </MotiPressable>

      {rewardRoutes.map((r, i) => {
        const isActive = pathname.startsWith(r.route)
        return (
          <TopTabBarItem
            labelProps={{ numberOfLines: 1 }}
            isActive={isActive}
            key={r.key}
            label={t(r.shortTitle)}
            onPress={() => {
              onTab(r)
            }}
          />
        )
      })}
    </TopTabBar>
  )
}
