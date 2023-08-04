import { PageWithBackHeader } from 'app/components/layouts/Page'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import CreatePinScreen from 'app/features/pin/CreatePinScreen'
import ChangePinScreen from 'app/features/pin/change-pin'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import React, { useCallback, useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { usePlayerProfileQuery } from 'services/playerApi'
import { createParam } from 'solito'
import ChangePasswordPage from './change-password'

enum SCREEN_TAB {
  CHANGE_PASSWORD = 'change-password',
  CHANGE_PIN = 'change-pin',
}

const changePwRoute = {
  key: 'first',
  title: 'manageCredentials.pw.changePw',
  index: 0,
}
const changePinRoute = {
  key: 'second',
  title: 'manageCredentials.pin.changePin',
  index: 1,
}
const createPinRoute = {
  key: 'second',
  title: 'manageCredentials.pin.createPin',
  index: 1,
}

const { useParam } = createParam<{ tab: string }>()
const ManageCredentialsPage = () => {
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
  const layout = useWindowDimensions()

  const { data: playerData } = usePlayerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const isPinExist = playerData?.pin_exist

  const getIndexFromTab = (value) => {
    switch (value) {
      case SCREEN_TAB.CHANGE_PASSWORD:
        return 0
      case SCREEN_TAB.CHANGE_PIN:
        return 1

      default:
        return 0
    }
  }

  const [index, setIndex] = useState<number>(getIndexFromTab(tab))
  const [routes, setRoutes] = useState([
    changePwRoute,
    isPinExist ? changePinRoute : createPinRoute,
  ])

  const renderCreatePinScreen = useCallback(() => {
    return <CreatePinScreen isTab />
  }, [])

  const renderScene = SceneMap({
    first: ChangePasswordPage,
    second: isPinExist ? ChangePinScreen : renderCreatePinScreen,
  })

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
        setTab(SCREEN_TAB.CHANGE_PASSWORD)
        break
      case 1:
        setTab(SCREEN_TAB.CHANGE_PIN)
        break

      default:
        setTab(SCREEN_TAB.CHANGE_PASSWORD)
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
  useEffect(() => {
    setRoutes([changePwRoute, isPinExist ? changePinRoute : createPinRoute])
  }, [isPinExist])

  return (
    <PageWithBackHeader
      header={{ title: t('manageCredentials.title') }}
      disableScrollView
      hideHeader={isDesktop()}
    >
      <TabView
        swipeEnabled={false}
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </PageWithBackHeader>
  )
}

export default ManageCredentialsPage
