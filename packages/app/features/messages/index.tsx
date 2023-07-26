import { PageWithBackHeader } from 'app/components/layouts/Page'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { createParam } from 'solito'
import AnnouncementScreen from './Announcement'
import PersonalMessage from './PersonalMessage'

enum SCREEN_TAB {
  MESSAGE = 'message',
  ANNOUNCEMENT = 'announcement',
}

const { useParam } = createParam<{ tab: string }>()
const MessagesScreen = () => {
  const [tab, setTab] = useParam('tab', {
    initial: undefined,
    parse: (templateFromUrl) => {
      if (
        Object.values(SCREEN_TAB).includes(templateFromUrl?.[0] as SCREEN_TAB)
      ) {
        return templateFromUrl?.[0]
      }
      return undefined
    },
  })

  const { t } = useLocalization()
  const desktop = isDesktop()

  const renderScene = SceneMap({
    first: PersonalMessage,
    second: AnnouncementScreen,
  })

  const getIndexFromTab = (value) => {
    switch (value) {
      case SCREEN_TAB.MESSAGE:
        return 0
      case SCREEN_TAB.ANNOUNCEMENT:
        return 1

      default:
        return 0
    }
  }

  const [index, setIndex] = useState<number>(getIndexFromTab(tab))
  const [routes] = useState([
    { key: 'first', title: 'message.personalMessage', index: 0 },
    { key: 'second', title: 'message.announcement', index: 1 },
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
        setTab(SCREEN_TAB.MESSAGE)
        break
      case 1:
        setTab(SCREEN_TAB.ANNOUNCEMENT)
        break

      default:
        setTab(SCREEN_TAB.MESSAGE)
        break
    }
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
      header={{ title: t('menu.msgAnnouncement') }}
      disableScrollView
      hideHeader={desktop}
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
