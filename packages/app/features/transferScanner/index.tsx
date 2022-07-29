import { View } from 'dripsy'
import React, { useState } from 'react'
import useLocalization from 'app/provider/localization'
import { SceneMap, TabView } from 'react-native-tab-view'
import { Platform, useWindowDimensions } from 'react-native'
import CustomTabBar from 'app/components/CustomTabBar'
import { PageWithBackHeader } from 'app/components/layout/Page'
import QrcodeScannerTab from './send'
import QrReceiveTab from './receive'

// const renderScene = SceneMap({
//   first: QrcodeScannerTab,
//   second: QrReceiveTab,
// })

const TransferScannerScreen = () => {
  const { t } = useLocalization()
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: t('menu.tab.send'), index: 0 },
    { key: 'second', title: t('menu.tab.receive'), index: 1 },
  ])

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <QrcodeScannerTab isActive={index === routes[0]?.index} />
      case 'second':
        return <QrReceiveTab />
      default:
        return null
    }
  }

  const renderTabBar = (props) => {
    return <CustomTabBar {...props} />
  }

  return (
    <PageWithBackHeader
      header={{
        title: t('menu.transfer'),
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

export default TransferScannerScreen
