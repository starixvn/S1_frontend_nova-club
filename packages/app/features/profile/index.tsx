import Page from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ScrollView, Text, useSx, View } from 'dripsy'
import React, { useEffect } from 'react'
import { Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import { usePlayerProfileQuery } from 'services/playerApi'
import ProfileAction from './ProfileAction'
import ProfileBalance from './ProfileBalance'
import ProfileLanguage from './ProfileLanguage'
import ProfileOptions from './ProfileOptions'
import ProfileOverview from './ProfileOverview'
import ProfileUser from './ProfileUser'

const ProfileScreen = () => {
  const { t } = useLocalization()
  const [refreshing, setRefreshing] = React.useState(false)
  const dispatch = useDispatch()

  const { data, isFetching, isLoading, refetch } = usePlayerProfileQuery()

  useEffect(() => {
    !isLoading && setRefreshing(isFetching)
  }, [data, dispatch, isFetching, isLoading])

  const inset = useSafeArea()

  return (
    <Page sx={{ paddingTop: inset.top, flex: 1 }}>
      <ProfileUser username={data?.data?.username || ''} />

      <ScrollView
        // scrollEnabled={false}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
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

        <ProfileOverview />
        <View sx={{ borderTopWidth: 1, borderColor: '$lightNavyBlue' }} />
        <ProfileOptions />
        <ProfileLanguage />
      </ScrollView>
    </Page>
  )
}

export default ProfileScreen
