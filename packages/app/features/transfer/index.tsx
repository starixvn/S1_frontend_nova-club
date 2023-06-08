import { PageWithBackHeader } from 'app/components/layouts/Page'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import useLocalization from 'app/provider/localization'
import { TRANSFER_NOTES } from 'app/utils/constant'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { SceneMap, TabView } from 'react-native-tab-view'
import { createParam } from 'solito'
import IconButton from 'app/components/IconButton'
import QrTransfer from './qr-transfer'
import QrReceive from './qr-receive'
import IdTransfer from './id-transfer'

const { useParam } = createParam<{ tab: string }>()
const TransferScreen = () => {
  const [tab = 0] = useParam('tab')
  const { openModal } = useModal()

  const { t } = useLocalization()

  const renderScene = SceneMap({
    first: QrReceive,
    second: IdTransfer,
    third: QrTransfer,
  })

  const getTab = tab && parseInt(tab)

  const [index, setIndex] = useState(getTab)
  const [routes] = useState([
    { key: 'first', title: t('transfer.receive'), index: 0 },
    { key: 'second', title: t('transfer.idTransfer'), index: 1 },
    { key: 'third', title: t('transfer.qrTransfer'), index: 2 },
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
        title: 'transfer.transferTitle',
        actions: (
          <IconButton
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
