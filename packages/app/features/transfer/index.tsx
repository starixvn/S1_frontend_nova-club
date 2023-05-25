import CustomTabBar from 'app/components/layouts/CustomTabBar'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { createParam } from 'solito'
import IdTransfer from './IdTransfer'
import QrTransfer from './QrTransfer'
import Receive from './Receive'
import Icon from 'app/components/Icon'
import { TRANSFER_NOTES } from 'app/utils/constant'
import { useModal } from 'react-native-modalfy'
import { Text } from 'dripsy'

const { useParam } = createParam<{ tab: string }>()
const TransferScreen = () => {
  const [tab = 0] = useParam('tab')
  const { openModal } = useModal()

  const { t } = useLocalization()

  const renderScene = SceneMap({
    first: Receive,
    second: IdTransfer,
    third: QrTransfer,
  })

  const getTab = tab && parseInt(tab)

  const [index, setIndex] = useState(getTab)
  const [routes] = useState([
    { key: 'first', title: 'receive', index: 0 },
    { key: 'second', title: 'id transfer', index: 1 },
    { key: 'third', title: 'qr transfer', index: 2 },
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
        title: 'Transfer',
        actions: (
          <Icon
            name="notice"
            onPress={() =>
              openModal('NoticeModal', {
                notice: [t(TRANSFER_NOTES)],
              })
            }
          />
        ),
      }}
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

export default TransferScreen
