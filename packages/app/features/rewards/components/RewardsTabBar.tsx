import Icon from 'app/components/Icon'
import TopTabBar from 'app/components/navigation/topTab/TopTabBar'
import TopTabBarItem from 'app/components/navigation/topTab/TopTabBarItem'
import usePathname from 'app/hooks/usePathname'
import { Route } from 'app/navigation/type'
import useLocalization from 'app/provider/localization'
import rewardRoutes from 'app/routes/rewardRoutes'
import { View } from 'dripsy'
import { MotiPressable } from 'moti/interactions'
import React from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import { useRouter } from 'solito/router'

type Props = {}

export default function RewardsTabBar({}: Props) {
  const { t } = useLocalization()
  const { push } = useRouter()
  const pathname = usePathname()

  const { data: profileData } = usePlayerProfileQuery()
  const enableCheckIn = !profileData?.disabled_event ?? false

  function onTab(r: Route) {
    push(r.route)
  }

  return (
    <TopTabBar>
      <View>
        <MotiPressable
          style={{ marginHorizontal: 4 }}
          onPress={() => {
            push('/rewards/daily')
          }}
          from={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{
            loop: enableCheckIn ? true : false,
            type: 'timing',
            duration: 500,
          }}
          disabled={!enableCheckIn}
        >
          <Icon
            size={24}
            name="daily"
            sx={{ opacity: enableCheckIn ? 1 : 0.2 }}
          />
        </MotiPressable>
      </View>

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
