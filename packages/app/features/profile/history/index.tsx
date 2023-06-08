import { PageWithBackHeader } from 'app/components/layouts/Page'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import useLocalization from 'app/provider/localization'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { createParam } from 'solito'
import GameHistory from './game'
import TransactionHistory from './transaction'

const { useParam } = createParam<{ tab: string }>()
const History = () => {
  const [tab = 0] = useParam('tab')

  const { t } = useLocalization()

  const renderScene = SceneMap({
    first: TransactionHistory,
    second: GameHistory,
  })

  const getTab = tab && parseInt(tab)

  const [index, setIndex] = useState(getTab)
  const [routes] = useState([
    { key: 'first', title: t('common.transaction'), index: 0 },
    { key: 'second', title: t('common.game'), index: 1 },
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
      header={{ title: 'common.historyTitle' }}
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

export default History
