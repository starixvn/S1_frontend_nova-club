import { DripsyGradient } from 'app/components/Gradient'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import dayjs from 'dayjs'
import { ActivityIndicator, ScrollView, useDripsyTheme } from 'dripsy'
import { useState } from 'react'
import { Platform, RefreshControl } from 'react-native'
import { usePlayerOverviewQuery } from 'services/playerApi'
import OverviewDateRange from './OverviewDateRange'
import SummarySection from './SummarySection'

const OverviewScreen = () => {
  const { t } = useLocalization()
  const [endDate, setEndDate] = useState(dayjs().startOf('date').toDate())
  const [startDate, setStartDate] = useState(dayjs().startOf('date').toDate())

  const { theme } = useDripsyTheme()

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
    <DripsyGradient colors={['#133351', '#0D2035']} sx={{ flex: 1 }}>
      <PageWithBackHeader
        disableScrollView={Platform.OS === 'ios'}
        header={{ title: t('profile.overview.title') }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={refreshPlayerOverview}
            />
          }
        >
          {isFetching && Platform.OS === 'web' && (
            <ActivityIndicator
              sx={{
                mt: '$3',
                position: 'absolute',
                left: '50%',
                // @ts-expect-error: In web, translateX should be accept percentage
                transform: [{ translateX: '-50%' }],
              }}
              color={'$lightCyan'}
            />
          )}

          <OverviewDateRange
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <SummarySection
            title={t('profile.overview.self')}
            amountWL={data?.self_winloss ?? 0}
            amountTO={data?.self_turnover ?? 0}
            amountRB={data?.self_realbet ?? 0}
          />
          <SummarySection
            title={t('profile.overview.circle')}
            amountWL={data?.circle_winloss ?? 0}
            amountTO={data?.circle_turnover ?? 0}
            amountDirect={data?.circle_direct ?? 0}
            amountRB={data?.circle_realbet ?? 0}
          />
        </ScrollView>
      </PageWithBackHeader>
    </DripsyGradient>
  )
}

export default OverviewScreen
