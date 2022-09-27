import Header from 'app/components/common/Header'
import CustomTabBar from 'app/components/CustomTabBar'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { createParam } from 'solito'
import AnnouncementPage from './AnnouncementPage'
import PersonalMessagePage from './PersonalMessagePage'

const { useParam } = createParam<{ tab: string }>()
const Messages = () => {
  const [tab] = useParam('tab')
  const { t } = useLocalization()

  const renderScene = SceneMap({
    first: PersonalMessagePage,
    second: AnnouncementPage,
  })

  const getTab = tab && parseInt(tab)

  const [index, setIndex] = useState(getTab)
  const [routes] = useState([
    { key: 'first', title: t('message.personalMessage'), index: 0 },
    { key: 'second', title: t('message.announcement'), index: 1 },
  ])
  const layout = useWindowDimensions()
  const { width } = useContainerDimension()

  const renderTabBar = (props) => {
    return <CustomTabBar {...props} />
  }

  return (
    <PageWithBackHeader
      header={{ title: t('menu.message/announcement') }}
      disableScrollView
    >
      <View style={{ flex: 1 }}>
        <TabView
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

export default Messages
