import { View, Text, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import { usePlayerProfileQuery } from 'services/playerApi'
import useLocalization from 'app/provider/localization'
import ChangePasswordPage from './change-password'
import ChangePinScreen from '../pin/change-pin'
import CreatePinScreen from '../pin/CreatePinScreen'
import { SceneMap, TabView } from 'react-native-tab-view'
import { createParam } from 'solito'
import CustomTabBar from 'app/components/navigation/CustomTabBar'

const { useParam } = createParam<{ tab: string }>()
const ManageCredentialsPage = () => {
  const { t } = useLocalization()
  const layout = useWindowDimensions()
  const [tab = 0] = useParam('tab')
  const getTab = tab && parseInt(tab)

  const { data: playerData } = usePlayerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const isPinExist = playerData?.pin_exist

  const [index, setIndex] = useState(getTab)
  const [routes] = useState([
    { key: 'first', title: t('manageCredentials.pw.changePw'), index: 0 },
    isPinExist
      ? { key: 'second', title: t('manageCredentials.pin.changePin'), index: 1 }
      : {
          key: 'second',
          title: t('manageCredentials.pin.createPin'),
          index: 1,
        },
  ])

  const renderScene = SceneMap({
    first: ChangePasswordPage,
    second: isPinExist ? ChangePinScreen : CreatePinScreen,
  })

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
      header={{ title: 'manageCredentials.title' }}
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
