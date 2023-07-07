import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  useResponsiveValue,
} from 'dripsy'
import RefreshButton from 'app/components/RefreshButton'
import HorizontalTransactionRowListHeader from '../component/HorizontalTransactionRowListHeader'
import RecentTransactionRow from '../component/RecentTransactionRow'
import EmptyResult from 'app/components/dataTable/EmptyResult'
import { usePlayerReportQuery } from 'services/playerApi'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { ReportDepositStatus, ReportTransactionType } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import useLocalization from 'app/provider/localization'
import DepositForm from '../component/DepositForm'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import { Platform } from 'react-native'
import PendingTransaction from '../component/PendingTransaction'

const OnlineBankingScreen = () => {
  const { t } = useLocalization()
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  const {
    data: transactionData,
    isFetching,
    isLoading: transactionIsLoading,
    refetch,
  } = usePlayerReportQuery(
    {
      limit: 5,
      offset: 0,
      status: ReportDepositStatus.PENDING,
      time_from: dayjsTz().subtract(2, 'month').startOf('date').toISOString(),
      time_to: dayjsTz().endOf('date').toISOString(),
      trans_type: ReportTransactionType.DEPOSIT,
      bank_category_id: DepositPaymentMethodCategoryId.ONLINE_BANK,
    },
    { refetchOnMountOrArgChange: true }
  )

  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{ title: t('deposit.momo') }}
    >
      <ScrollView>
        <DepositForm
          DepositCategoryId={DepositPaymentMethodCategoryId.ONLINE_BANK}
        />
        <PendingTransaction
          paymentMethod={DepositPaymentMethodCategoryId.ONLINE_BANK}
        />
      </ScrollView>
    </PageWithBackHeader>
  )
}

export default OnlineBankingScreen
