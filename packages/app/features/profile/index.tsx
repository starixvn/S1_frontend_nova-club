import useLocalization from 'app/provider/localization'
import { usePlayerProfileQuery } from 'services/playerApi'
import { ScrollView, Text, useSx, View } from 'dripsy'
import React, { useEffect } from 'react'
import { RefreshControl } from 'react-native'
import { useDispatch } from 'react-redux'
import ProfileAction from './ProfileAction'
import ProfileBalance from './ProfileBalance'
import ProfileLanguage from './ProfileLanguage'
import ProfileOptions from './ProfileOptions'
import ProfileOverview from './ProfileOverview'
import ProfileUser from './ProfileUser'
import Page, { PageSafeArea } from 'app/components/layout/Page'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'

const ProfileScreen = () => {
  const { t } = useLocalization()
  const [refreshing, setRefreshing] = React.useState(false)
  const dispatch = useDispatch()

  const { data, isFetching, isLoading, refetch } = usePlayerProfileQuery()

  useEffect(() => {
    !isLoading && setRefreshing(isFetching)
  }, [data, dispatch, isFetching, isLoading])

  const inset = useSafeArea()
  const sx = useSx()
  return (
    // <ScrollView
    //   sx={{ bg: '$background', flex: 1, pt: 2 }}
    //   showsVerticalScrollIndicator={false}
    //   refreshControl={
    //     <RefreshControl refreshing={refreshing} onRefresh={refetch} />
    //   }
    // >
    <Page sx={{ paddingTop: inset.top, flex: 1 }}>
      <ProfileUser username={data?.data?.username || ''} />

      <View
        sx={{
          width: 500,
          maxWidth: '90%',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
      >
        <ProfileBalance />
        <Text variant="xs" sx={{ textAlign: 'center' }}>
          {t('profile.timeline')}
        </Text>
        <ProfileAction />
      </View>
      <View
        sx={{
          borderBottomWidth: 2,
          borderColor: '$lightNavyBlue',
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <ProfileOverview />
        <View sx={{ borderTopWidth: 1, borderColor: '$lightNavyBlue' }} />
        <ProfileOptions />
        <ProfileLanguage />
      </ScrollView>
      {/* </ScrollView> */}
    </Page>
  )
}

export default ProfileScreen
