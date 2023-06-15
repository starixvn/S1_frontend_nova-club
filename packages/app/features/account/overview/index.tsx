import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import dayjs from 'dayjs'
import { ActivityIndicator, ScrollView } from 'dripsy'
import { useState } from 'react'
import { Platform, RefreshControl } from 'react-native'
import { usePlayerOverviewQuery } from 'services/playerApi'
import OverviewDateRange from './OverviewDateRange'
import SummarySection from './SummarySection'
import isDesktop from 'app/utils/isDesktop'

const ProfileOverview = () => {
  const { t } = useLocalization()
  const [endDate, setEndDate] = useState(dayjs().startOf('date').toDate())
  const [startDate, setStartDate] = useState(dayjs().startOf('date').toDate())
  const desktop = isDesktop()

  const formatDate = (date: Date) => {
    return dayjs(date).format('YYYY-MM-DD')
  }

  const {
    data,
    isFetching,
    refetch: refreshPlayerOverview,
  } = usePlayerOverviewQuery({
    date_from: formatDate(startDate),
    date_to: formatDate(endDate),
  })

  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{ title: t('common.overview') }}
      hideHeader={desktop}
    >
      <ScrollView
        contentContainerSx={
          isDesktop()
            ? {
                px: '$6',
                py: '$4',
                borderRadius: 5,
              }
            : {}
        }
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refreshPlayerOverview}
            tintColor={'white'}
          />
        }
      >
        {isFetching && Platform.OS === 'web' && (
          <ActivityIndicator
            sx={{
              mt: '$2',
              position: 'absolute',
              left: '50%',
              // @ts-expect-error: In web, translateX should be accept percentage
              transform: [{ translateX: '-50%' }],
            }}
            color={'white'}
          />
        )}

        <OverviewDateRange
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <SummarySection
          title={t('profile.self')}
          amountWL={data?.self_winloss ?? 0}
          amountTO={data?.self_turnover ?? 0}
          amountRB={data?.self_realbet ?? 0}
        />
        <SummarySection
          title={t('profile.circle')}
          amountWL={data?.circle_winloss ?? 0}
          amountTO={data?.circle_turnover ?? 0}
          amountDirect={data?.circle_direct ?? 0}
          amountRB={data?.circle_realbet ?? 0}
        />
      </ScrollView>
    </PageWithBackHeader>
  )
}

export default ProfileOverview
