import Header from 'app/components/common/Header'
import CustomTabBar from 'app/components/CustomTabBar'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import AnnouncementPage from './AnnoucementPage'
import PersonalMessagePage from './PersonalMessagePage'

const Messages = () => {
  const { t } = useLocalization()

  const renderScene = SceneMap({
    first: PersonalMessagePage,
    second: AnnouncementPage,
  })

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: t('message.personalMessage'), index: 0 },
    { key: 'second', title: t('message.annoucement'), index: 1 },
  ])
  const layout = useWindowDimensions()
  const { width } = useContainerDimension()

  const renderTabBar = (props) => {
    return <CustomTabBar {...props} />
  }

  return (
    // <PageWithBackHeader header={{ title: t('menu.message/announcement') }}>
    <View style={{ flex: 1 }}>
      <Header title={t('menu.message/announcement')} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
    // </PageWithBackHeader>
  )
}

export default Messages
