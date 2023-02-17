import CustomTabBar from 'app/components/CustomTabBar'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { createParam } from 'solito'
import BankAccountScreen from './BankAccountScreen'
import CryptoWalletScreen from './CryptoWalletScreen'

const { useParam } = createParam<{ tab: string }>()
const BankScreen = () => {
  const [tab] = useParam('tab')
  const { t } = useLocalization()

  const renderScene = SceneMap({
    first: BankAccountScreen,
    second: CryptoWalletScreen,
  })

  const getTab = tab && parseInt(tab)

  const [index, setIndex] = useState(getTab || 0)
  const [routes] = useState([
    { key: 'first', title: t('menu.bankAccount'), index: 0 },
    { key: 'second', title: t('menu.tab.cryptoWallet'), index: 1 },
  ])
  const layout = useWindowDimensions()

  const renderTabBar = (props) => {
    return <CustomTabBar {...props} />
  }

  return (
    <PageWithBackHeader
      header={{ title: t('menu.bankAccount') }}
      disableScrollView
    >
      <View style={{ flex: 1 }}>
        <TabView
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

export default BankScreen
