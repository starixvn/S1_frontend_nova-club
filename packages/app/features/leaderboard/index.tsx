import { PageWithBackHeader } from 'app/components/layouts/Page'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { createParam } from 'solito'
import EventScreen from './Event'
import HistoryScreen from './History'
import RankingScreen from './Ranking'

enum LEADERBOARD_TAB {
  // EVENT = 'event',
  RANKING = 'ranking',
  // HISTORY = 'history',
}

const { useParam } = createParam<{ tab?: LEADERBOARD_TAB }>()

const LeaderboardScreen = () => {
  const [tab, setTab] = useParam('tab', {
    initial: undefined,
    parse: (templateFromUrl) => {
      if (
        Object.values(LEADERBOARD_TAB).includes(
          templateFromUrl?.[0] as LEADERBOARD_TAB
        )
      ) {
        return templateFromUrl?.[0]
      }
      return undefined
    },
  })

  const { t } = useLocalization()
  const desktop = isDesktop()

  const renderScene = SceneMap({
    // first: EventScreen,
    first: RankingScreen,
    // third: HistoryScreen,
  })

  const getIndexFromTab = (value) => {
    switch (value) {
      // case LEADERBOARD_TAB.EVENT:
      //   return 0
      case LEADERBOARD_TAB.RANKING:
        return 0
      // case LEADERBOARD_TAB.HISTORY:
      //   return 2

      default:
        return 0
    }
  }

  const [index, setIndex] = useState<number>(getIndexFromTab(tab))
  const [routes] = useState([
    // { key: 'first', title: t('menu.tab.event'), index: 0 },
    { key: 'first', title: t('menu.tab.ranking'), index: 0 },
    // { key: 'third', title: t('common.history'), index: 2 },
  ])
  const layout = useWindowDimensions()

  useEffect(() => {
    setIndex(getIndexFromTab(tab))
  }, [tab])

  useEffect(() => {
    getTabFromIndex(index)
  }, [index])

  const handlePress = (value) => {
    getTabFromIndex(value)
  }

  const getTabFromIndex = (value) => {
    switch (value) {
      // case 0:
      //   setTab(LEADERBOARD_TAB.EVENT)
      //   break
      case 0:
        setTab(LEADERBOARD_TAB.RANKING)
        break
      // case 2:
      //   setTab(LEADERBOARD_TAB.HISTORY)
      //   break

      default:
        setTab(LEADERBOARD_TAB.RANKING)
        break
    }
  }

  const renderTabBar = (props) => {
    return desktop ? null : (
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
      hideHeader={desktop}
    >
      <TabView
        swipeEnabled={false}
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
