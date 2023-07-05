import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  useResponsiveValue,
} from 'dripsy'
import DepositForm from '../component/DepositForm'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useLocalization from 'app/provider/localization'
import { usePlayerReportQuery } from 'services/playerApi'
import { ReportDepositStatus, ReportTransactionType } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import RefreshButton from 'app/components/RefreshButton'
import HorizontalTransactionRowListHeader from '../component/HorizontalTransactionRowListHeader'
import RecentTransactionRow from '../component/RecentTransactionRow'
import EmptyResult from 'app/components/dataTable/EmptyResult'

const CryptoPayScreen = () => {
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
      bank_category_id: DepositPaymentMethodCategoryId.LOCAL_BANK,
    },
    { refetchOnMountOrArgChange: true }
  )
  return (
    <ScrollView>
      <DepositForm DepositCategoryId={DepositPaymentMethodCategoryId.CRYPTO} />
    </ScrollView>
  )
}

export default CryptoPayScreen
