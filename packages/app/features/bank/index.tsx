import { PageWithBackHeader } from 'app/components/layouts/Page'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import useLocalization from 'app/provider/localization'
import React, { useMemo, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { createParam } from 'solito'
import BankAccountScreen from './BankAccountScreen'
import CryptoWalletScreen from './CryptoWalletScreen'
import isDesktop from 'app/utils/isDesktop'
import DesktopPage from 'desktop-ext/components/layout/DesktopPage'
import { View } from 'dripsy'
import DesktopPageContainer from 'desktop-ext/components/layout/DesktopPage'

const { useParam } = createParam<{ tab: string }>()

const BankScreen = () => {
  const [tab = 0] = useParam('tab')
  const desktop = isDesktop()

  const { t } = useLocalization()

  const renderScene = SceneMap({
    first: () => (
      <DesktopPageContainer>
        <BankAccountScreen />
      </DesktopPageContainer>
    ),
    second: () => (
      <DesktopPageContainer>
        <CryptoWalletScreen />
      </DesktopPageContainer>
    ),
  })

  const getTab = tab ? parseInt(tab) : 0

  const [index, setIndex] = useState(getTab)
  const [routes] = useState([
    { key: 'first', title: t('bank.bankAcc'), index: 0 },
    { key: 'second', title: t('wallet.cryptoWallet'), index: 1 },
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
      header={{ title: t('bank.bankAcc') }}
      disableScrollView
      hideHeader={desktop}
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
