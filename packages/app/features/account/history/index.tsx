import { PageWithBackHeader } from 'app/components/layouts/Page'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import useLocalization from 'app/provider/localization'
import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { createParam } from 'solito'
import GameHistory from './game'
import TransactionHistory from './transaction'
import isDesktop from 'app/utils/isDesktop'
import RedeemHistory from './redeem'
import { useRouter } from 'solito/router'

enum SCREEN_TAB {
  TRANSACTION = 'transaction',
  GAME = 'game',
  REDEEM = 'redeem',
}

const { useParam } = createParam<{ tab: string }>()
const History = () => {
  const [tab, setTab] = useParam('tab', {
    initial: undefined,
    parse: (templateFromUrl) => {
      if (
        Object.values(SCREEN_TAB).includes(templateFromUrl?.[0] as SCREEN_TAB)
      ) {
        return templateFromUrl?.[0]
      }
      return undefined
    },
  })

  const { t } = useLocalization()
  const desktop = isDesktop()
  const { back, replace } = useRouter()

  const renderScene = SceneMap({
    first: TransactionHistory,
    second: GameHistory,
    third: RedeemHistory,
  })

  const getIndexFromTab = (value) => {
    switch (value) {
      case SCREEN_TAB.TRANSACTION:
        return 0
      case SCREEN_TAB.GAME:
        return 1
      case SCREEN_TAB.REDEEM:
        return 2

      default:
        return 0
    }
  }

  const [index, setIndex] = useState<number>(getIndexFromTab(tab))
  const [routes, setRoutes] = useState([
    { key: 'first', title: t('common.transaction'), index: 0 },
    { key: 'second', title: t('common.game'), index: 1 },
  ])
  const layout = useWindowDimensions()

  useEffect(() => {
    desktop
      ? setRoutes([...routes, { key: 'third', title: t('Redeem'), index: 2 }])
      : setRoutes([...routes])
  }, [desktop])

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
      case 0:
        setTab(SCREEN_TAB.TRANSACTION)
        break
      case 1:
        setTab(SCREEN_TAB.GAME)
        break
      case 2:
        setTab(SCREEN_TAB.REDEEM)
        break

      default:
        // setTab(SCREEN_TAB.TRANSACTION)
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
      header={{ title: t('menu.tab.transactionHistory') }}
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

export default History
