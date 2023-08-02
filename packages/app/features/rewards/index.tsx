import { PageWithBackHeader } from 'app/components/layouts/Page'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import useLocalization from 'app/provider/localization'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { SceneMap, TabView } from 'react-native-tab-view'
import { createParam } from 'solito'
import Rules from './Rules'
import Redeem from './Redeem'
import How from './How'
import History from './History'

const { useParam } = createParam<{ tab: string }>()
const RewardsHubScreen = () => {
  const [tab = 0] = useParam('tab')

  const { t } = useLocalization()

  const renderScene = SceneMap({
    first: Redeem,
    second: How,
    third: History,
    fourth: Rules,
  })

  const getTab = tab && parseInt(tab)

  const [index, setIndex] = useState(getTab)
  const [routes] = useState([
    { key: 'first', title: t('menu.tab.redeem'), index: 0 },
    { key: 'second', title: t('menu.tab.how'), index: 1 },
    { key: 'third', title: t('common.history'), index: 2 },
    { key: 'fourth', title: t('menu.tab.rules'), index: 3 },
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
      header={{
        title: t('menu.myRewards'),
        actions: <></>,
      }}
      disableScrollView
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

export default RewardsHubScreen
