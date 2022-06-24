import Header from 'app/components/common/Header'
import DatePicker from 'app/components/form/DatePicker/DatePicker'
import { DripsyGradient } from 'app/components/Gradient'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { usePlayerOverviewQuery } from 'app/services/playerApi'
import { ScrollView, Text, View } from 'dripsy'
import OverviewDateRange from './OverviewDateRange'
import SummarySection from './SummarySection'

const OverviewScreen = () => {
  const { t } = useLocalization()
  const state = useAppSelector((state) => state.auth.info || {})
  const { data } = usePlayerOverviewQuery({
    username: state?.playerName,
  })

  return (
    <DripsyGradient colors={['#133351', '#0D2035']} sx={{ flex: 1 }}>
      <PageWithBackHeader header={{ title: t('profile.overview.title') }}>
        <ScrollView>
          <OverviewDateRange
            onSearch={(startDate, endDate) => {
              console.log({ startDate, endDate })
            }}
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
