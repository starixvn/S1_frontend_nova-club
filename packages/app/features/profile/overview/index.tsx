import Header from 'app/components/common/Header'
import DatePicker from 'app/components/form/DatePicker/DatePicker'
import { DripsyGradient } from 'app/components/Gradient'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { ScrollView, Text, View } from 'dripsy'
import OverviewDateRange from './OverviewDateRange'
import SummarySection from './SummarySection'

const OverviewScreen = () => {
  const { t } = useLocalization()

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
            amountWL={0}
            amountTO={0}
            amountRB={0}
          />
          <SummarySection
            title={t('profile.overview.circle')}
            amountWL={0}
            amountTO={0}
            amountDirect={9}
            amountRB={0}
          />
        </ScrollView>
      </PageWithBackHeader>
    </DripsyGradient>
  )
}

export default OverviewScreen
