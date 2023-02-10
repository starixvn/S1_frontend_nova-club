import Page from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ScrollView, Text, View } from 'dripsy'
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

  const { data, isFetching, isLoading, isCreditMember, refetch } =
    usePlayerProfileQuery()

  useEffect(() => {
    !isLoading && setRefreshing(isFetching)
  }, [data, dispatch, isFetching, isLoading])

  const inset = useSafeArea()

  return (
    <Page
      sx={{
        flex: 1,
        ...Platform.select({
          web: {
            maxHeight: '100vh',
          },
          default: { paddingTop: inset.top },
        }),
      }}
    >
      <ProfileUser username={data?.username} referral={data?.referral_code} />
      <ScrollView
        bounces={false}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          sx={{
            width: 500,
            maxWidth: '95%',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
        >
          <ProfileBalance />
          <Text variant="xs" sx={{ textAlign: 'center' }}>
            {t('profile.timeline')}
          </Text>
          {data && <ProfileAction isCreditMember={isCreditMember} />}
        </View>
        <View
          sx={{
            borderBottomWidth: 2,
            borderColor: '$lightNavyBlue',
          }}
        />

        {!isCreditMember && <ProfileOverview />}
        <View sx={{ borderTopWidth: 1, borderColor: '$lightNavyBlue' }} />
        <ProfileOptions isCreditMember={isCreditMember} />
        <ProfileLanguage />
      </ScrollView>
    </Page>
  )
}

export default ProfileScreen
