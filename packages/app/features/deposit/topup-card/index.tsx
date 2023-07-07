import { ScrollView, Text, View, useResponsiveValue } from 'dripsy'
import TopupCardForm from './TopupCardForm'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import { Platform } from 'react-native'
import useLocalization from 'app/provider/localization'
import PendingTransaction from '../component/PendingTransaction'
import { usePlayerReportQuery } from 'services/playerApi'
import { ReportDepositStatus, ReportTransactionType } from 'app/utils/constant'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import dayjsTz from 'app/utils/dayjs'

const TopUpCardScreen = () => {
  const { t } = useLocalization()
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{ title: t('deposit.topupCard') }}
    >
      <ScrollView>
        <View>
          <TopupCardForm />
        </View>
        {horizontalMode && (
          <PendingTransaction
            paymentMethod={DepositPaymentMethodCategoryId.TOP_UP}
          />
        )}
      </ScrollView>
    </PageWithBackHeader>
  )
}

export default TopUpCardScreen
