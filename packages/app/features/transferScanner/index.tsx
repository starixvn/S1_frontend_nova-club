import { View } from 'dripsy'
import React, { useState } from 'react'
import useLocalization from 'app/provider/localization'
import { SceneMap, TabView } from 'react-native-tab-view'
import { Platform, useWindowDimensions } from 'react-native'
import CustomTabBar from 'app/components/CustomTabBar'
import { PageWithBackHeader } from 'app/components/layout/Page'
import QrcodeScannerTab from './send'
import QrReceiveTab from './receive'
import TransferScreen from './transfer'

const TransferScannerScreen = () => {
  const { t } = useLocalization()
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: t('menu.tab.receive'), index: 0 },
    { key: 'second', title: t('menu.tab.idTransfer'), index: 1 },
    { key: 'third', title: t('menu.tab.qrTransfer'), index: 2 },
  ])

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <QrReceiveTab />
      case 'second':
        return <TransferScreen isIDTransfer />
      case 'third':
        return <QrcodeScannerTab isActive={index === routes[2]?.index} />
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
