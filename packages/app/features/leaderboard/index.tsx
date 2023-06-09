import CustomTabBar from 'app/components/navigation/CustomTabBar'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { createParam } from 'solito'
import EventScreen from './Event'
import RankingScreen from './Ranking'
import HistoryScreen from './History'

const { useParam } = createParam<{ tab: string }>()
const LeaderboardScreen = () => {
  const [tab = 0] = useParam('tab')

  const { t } = useLocalization()

  const renderScene = SceneMap({
    first: EventScreen,
    second: RankingScreen,
    third: HistoryScreen,
  })

  const getTab = tab ? parseInt(tab) : 0

  const [index, setIndex] = useState<number>(getTab)
  const [routes] = useState([
    { key: 'first', title: t('menu.tab.event'), index: 0 },
    { key: 'second', title: t('menu.tab.ranking'), index: 1 },
    { key: 'third', title: t('menu.history'), index: 2 },
  ])
  const layout = useWindowDimensions()

  const handlePress = (value) => {
    setIndex(value)
  }

  const renderTabBar = (props) => {
    return (
      <CustomTabBar
        routes={props.navigationState.routes}
        currentIndex={index}
        onPress={handlePress}
        {...props}
      />
    )
  }
  return (
    <PageWithBackHeader
      header={{ title: t('menu.leaderboard') }}
      disableScrollView
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </PageWithBackHeader>
  )
}

export default LeaderboardScreen
