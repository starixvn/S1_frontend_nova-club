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
import { PageWithBackHeader } from 'app/components/layout/Page'

const renderScene = SceneMap({
  first: TransactionHistoryTab,
  second: GameHistoryTab,
})

const HistoryScreen = () => {
  const { t } = useLocalization()
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: t('menu.tab.transaction'), index: 0 },
    { key: 'second', title: t('menu.tab.game'), index: 1 },
  ])

  const renderTabBar = (props) => {
    return <CustomTabBar {...props} />
  }

  return (
    <PageWithBackHeader
      header={{
        title:
          index === 0 ? t('menu.transactionHistory') : t('menu.gameHistory'),
      }}
      disableScrollView
    >
      <View style={{ flex: 1 }}>
        <TabView
          lazy
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default HistoryScreen
