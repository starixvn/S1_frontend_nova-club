import useLocalization from 'app/provider/localization'
import { usePlayerProfileQuery } from 'services/playerApi'
import { ScrollView, Text } from 'dripsy'
import React, { useEffect } from 'react'
import { RefreshControl } from 'react-native'
import { useDispatch } from 'react-redux'
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

  return (
    <ScrollView
      sx={{ bg: '$background', flex: 1, pt: 2 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refetch} />
      }
    >
      <ProfileUser username={data?.data?.username || ''} />
      <ProfileBalance />
      <Text variant="xs" sx={{ textAlign: 'center' }}>
        {t('profile.timeline')}
      </Text>
      <ProfileAction />
      <ProfileOverview />
      <ProfileOptions />
      <ProfileLanguage />
    </ScrollView>
  )
}

export default ProfileScreen
