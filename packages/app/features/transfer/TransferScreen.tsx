import IconButton from 'app/components/IconButton'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import useLocalization from 'app/provider/localization'
import { TRANSFER_NOTES } from 'app/utils/constant'
import { useResponsiveValue } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { SceneMap, TabView } from 'react-native-tab-view'
import { createParam } from 'solito'
import IdTransfer from './Id'
import QrTransfer from './Qr'
import QrReceive from './QrReceive'

enum SCREEN_TAB {
  RECEIVE = 'receive',
  ID_TRANSFER = 'id',
  QR_TRANSFER = 'qr',
}

const { useParam } = createParam<{ tab: string }>()
const TransferScreen = () => {
  const [tab, setTab] = useParam('tab', {
    initial: undefined,
    parse: (templateFromUrl) => {
      if (
        Object.values(SCREEN_TAB).includes(templateFromUrl?.[0] as SCREEN_TAB)
      ) {
        return templateFromUrl?.[0]
      }
      return SCREEN_TAB.RECEIVE
    },
  })

  const { openModal } = useModal()
  const { t } = useLocalization()
  const desktop = useResponsiveValue([false, false, false, true])

  const renderScene = SceneMap({
    first: QrReceive,
    second: () => <IdTransfer isIDTransfer />,
    third: () => <QrTransfer isActive={index === routes[2]?.index} />,
  })
  // isActive={index === routes[2]?.index}
  const getIndexFromTab = (value) => {
    switch (value) {
      case SCREEN_TAB.RECEIVE:
        return 0
      case SCREEN_TAB.ID_TRANSFER:
        return 1
      case SCREEN_TAB.QR_TRANSFER:
        return 2

      default:
        return 0
    }
  }

  const [index, setIndex] = useState<number>(getIndexFromTab(tab))
  const [routes] = useState([
    { key: 'first', title: t('transfer.receive'), index: 0 },
    { key: 'second', title: t('transfer.idTransfer'), index: 1 },
    { key: 'third', title: t('transfer.qrTransfer'), index: 2 },
  ])
  const layout = useWindowDimensions()

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
        setTab(SCREEN_TAB.RECEIVE)
        break
      case 1:
        setTab(SCREEN_TAB.ID_TRANSFER)
        break
      case 2:
        setTab(SCREEN_TAB.QR_TRANSFER)
        break

      default:
        setTab(SCREEN_TAB.RECEIVE)
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
      header={{
        title: t('transfer.transferTitle'),
        actions: (
          <IconButton
            name="notice"
            onPress={() =>
              openModal('NoticeModal', {
                notice: TRANSFER_NOTES,
              })
            }
          />
        ),
      }}
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

export default TransferScreen
