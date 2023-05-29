import { PageWithBackHeader } from 'app/components/layouts/Page'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import useLocalization from 'app/provider/localization'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { createParam } from 'solito'
import BankAccountScreen from './BankAccountScreen'
import CryptoWalletScreen from './CryptoWalletScreen'

const { useParam } = createParam<{ tab: string }>()
const BankScreen = () => {
  const [tab = 0] = useParam('tab')

  const { t } = useLocalization()

  const renderScene = SceneMap({
    first: BankAccountScreen,
    second: CryptoWalletScreen,
  })

  const getTab = tab ? parseInt(tab) : 0

  const [index, setIndex] = useState(getTab)
  const [routes] = useState([
    { key: 'first', title: t('menu.bankAccount'), index: 0 },
    { key: 'second', title: t('menu.cryptoWallet'), index: 1 },
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
      header={{ title: t('menu.bankAccount') }}
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

export default BankScreen
