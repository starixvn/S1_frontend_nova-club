import { View } from 'dripsy'
import React, { useState } from 'react'
import useLocalization from 'app/provider/localization'
import Header from 'app/components/common/Header'
import { SceneMap, TabView } from 'react-native-tab-view'
import TransactionHistoryTab from './transaction-history'
import GameHistoryTab from './game-history'
import { useWindowDimensions } from 'react-native'
import useContainerDimension from 'app/hooks/useContainerDimension'
import CustomTabBar from 'app/components/CustomTabBar'

const HistoryScreen = () => {
  const { t } = useLocalization()

  const renderScene = SceneMap({
    first: TransactionHistoryTab,
    second: GameHistoryTab,
  })

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: t('menu.tab.transaction'), index: 0 },
    { key: 'second', title: t('menu.tab.game'), index: 1 },
  ])
  const layout = useWindowDimensions()
  const { width } = useContainerDimension()

  const renderTabBar = (props) => {
    return <CustomTabBar {...props} />
  }

  return (
    // <PageWithBackHeader header={{ title: 'menu.history' }}>
    <View style={{ flex: 1 }}>
      <Header
        title={
          index === 0 ? t('menu.transactionHistory') : t('menu.gameHistory')
        }
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
    // </PageWithBackHeader>
  )
}

export default HistoryScreen
