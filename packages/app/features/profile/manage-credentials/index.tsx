import { PageWithBackHeader } from 'app/components/layouts/Page'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import CreatePinScreen from 'app/features/pin/CreatePinScreen'
import ChangePinScreen from 'app/features/pin/change-pin'
import useLocalization from 'app/provider/localization'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { usePlayerProfileQuery } from 'services/playerApi'
import { createParam } from 'solito'
import ChangePasswordPage from './change-password'
import { View } from 'dripsy'

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
      header={{ title: t('manageCredentials.title') }}
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
