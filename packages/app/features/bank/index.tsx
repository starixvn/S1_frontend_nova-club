import { PageWithBackHeader } from 'app/components/layouts/Page'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import useIsDesktop from 'app/hooks/useIsDesktop'
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
  const desktop = useIsDesktop()

  const { t } = useLocalization()

  const renderScene = SceneMap({
    first: BankAccountScreen,
    second: CryptoWalletScreen,
  })

  const getTab = tab ? parseInt(tab) : 0

  const [index, setIndex] = useState(getTab)
  const [routes] = useState([
    { key: 'first', title: 'bank.bankAccount', index: 0 },
    { key: 'second', title: 'wallet.cryptoWallet', index: 1 },
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
      header={{ title: t('bank.bankAccount') }}
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

export default BankScreen
