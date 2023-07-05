import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import DepositForm from '../component/DepositForm'
import { ScrollView, Text, View, useResponsiveValue } from 'dripsy'
import useLocalization from 'app/provider/localization'
import RefreshButton from 'app/components/RefreshButton'
import HorizontalTransactionRowListHeader from '../component/HorizontalTransactionRowListHeader'
import { ReportDepositStatus, ReportTransactionType } from 'app/utils/constant'
import { usePlayerReportQuery } from 'services/playerApi'
import dayjsTz from 'app/utils/dayjs'
import RecentTransactionRow from '../component/RecentTransactionRow'
import { ActivityIndicator } from 'dripsy'
import EmptyResult from 'app/components/dataTable/EmptyResult'

const MomoPayScreen = () => {
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
      bank_category_id: DepositPaymentMethodCategoryId.MOMO,
    },
    { refetchOnMountOrArgChange: true }
  )

  return (
    <ScrollView>
      <DepositForm DepositCategoryId={DepositPaymentMethodCategoryId.MOMO} />
    </ScrollView>
  )
}

export default MomoPayScreen
