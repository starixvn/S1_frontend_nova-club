import { View } from 'dripsy'
import React, { useState } from 'react'
import useLocalization from 'app/provider/localization'
import { SceneMap, TabView } from 'react-native-tab-view'
import { Platform, useWindowDimensions } from 'react-native'
import CustomTabBar from 'app/components/CustomTabBar'
import { PageWithBackHeader } from 'app/components/layout/Page'
import ChangePasswordScreen from './change-password'
import ChangePinScreen from 'app/features/pin/change-pin'

const ManageCredentialsPage = () => {
  const { t } = useLocalization()
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: t('menu.changePassword'), index: 0 },
    { key: 'second', title: t('menu.changePin'), index: 1 },
  ])

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <ChangePasswordScreen />
      case 'second':
        return <ChangePinScreen />
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
        title: t('menu.manageCredentials'),
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

export default ManageCredentialsPage
