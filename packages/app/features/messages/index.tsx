import CustomTabBar from 'app/components/layouts/CustomTabBar'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { createParam } from 'solito'
import PersonalMessage from './PersonalMessage'
import AnnouncementScreen from './Announcement'

const { useParam } = createParam<{ tab: string }>()
const MessagesScreen = () => {
  const [tab = 0] = useParam('tab')

  const { t } = useLocalization()

  const renderScene = SceneMap({
    first: PersonalMessage,
    second: AnnouncementScreen,
  })

  const getTab = tab && parseInt(tab)

  const [index, setIndex] = useState(getTab)
  const [routes] = useState([
    { key: 'first', title: t('message.personalMessage'), index: 0 },
    { key: 'second', title: t('message.announcement'), index: 1 },
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
      header={{ title: t('menu.message/announcement') }}
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

export default MessagesScreen
