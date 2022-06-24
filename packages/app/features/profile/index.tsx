import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { usePlayerProfileQuery } from 'app/services/playerApi'
import { PlayerActions } from 'app/store/authReducer'
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

  const state = useAppSelector((state) => state.auth.info || {})

  const { data: playerProfile } = usePlayerProfileQuery()

  const { data, isFetching, isLoading, isSuccess, refetch } =
    usePlayerProfileQuery({
      username: state?.playerName,
    })

  useEffect(() => {
    !isLoading && setRefreshing(isFetching)
    if (data?.data) {
      // dispatch(PlayerActions.setUser(data?.data))
    }
  }, [data, dispatch, isFetching, isLoading])

  return (
    <ScrollView
      sx={{ bg: '$background', flex: 1, pt: 2 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refetch} />
      }
    >
      <ProfileUser username={playerProfile?.data?.username || ''} />
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

export default withContextualNav(ProfileScreen, ContextualModuleKey.Profile)
