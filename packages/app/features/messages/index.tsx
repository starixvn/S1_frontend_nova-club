import CustomTabBar from 'app/components/layouts/CustomTabBar'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { createParam } from 'solito'

const PersonalMessagePage = () => (
  <View sx={{ bg: 'red', flex: 1 }}>
    <Text>PersonalMessage</Text>
  </View>
)
const AnnouncementPage = () => (
  <View sx={{ bg: 'blue', flex: 1 }}>
    <Text>Annnouncement</Text>
  </View>
)

const { useParam } = createParam<{ tab: string }>()
const MessagesScreen = () => {
  const [tab = 0] = useParam('tab')

  const { t } = useLocalization()

  const renderScene = SceneMap({
    first: PersonalMessagePage,
    second: AnnouncementPage,
    third: PersonalMessagePage,
    fourth: AnnouncementPage,
    fifth: PersonalMessagePage,
    sixth: AnnouncementPage,
  })

  const getTab = tab && parseInt(tab)

  const [index, setIndex] = useState(getTab)
  const [routes] = useState([
    { key: 'first', title: t('message.personalMessage'), index: 0 },
    { key: 'second', title: t('message.announcement'), index: 1 },
    { key: 'third', title: t('message.announcement'), index: 2 },
    { key: 'fourth', title: t('message.announcement'), index: 3 },
    { key: 'fifth', title: t('message.announcement'), index: 4 },
    { key: 'sixth', title: t('message.announcement'), index: 5 },
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
    <PageWithBackHeader header={{ title: 'Messages' }} disableScrollView>
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
